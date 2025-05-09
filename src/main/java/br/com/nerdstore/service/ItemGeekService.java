package br.com.nerdstore.service;

import br.com.nerdstore.exception.ItemNotFoundException;
import br.com.nerdstore.model.dto.ItemGeekRequestDTO;
import br.com.nerdstore.model.dto.ItemGeekResponseDTO;
import br.com.nerdstore.model.mapper.ItemGeekMapper;
import br.com.nerdstore.model.ItemGeek;
import br.com.nerdstore.repository.ItemGeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemGeekService {

    @Autowired
    private ItemGeekRepository repoItem;
    
    @Autowired
    private ItemGeekMapper mapper;

    public ItemGeekResponseDTO adicionarItem(ItemGeekRequestDTO itemDTO) {
        ItemGeek item = mapper.toEntity(itemDTO);
        ItemGeek savedItem = repoItem.save(item);
        return mapper.toDTO(savedItem);
    }

    public List<ItemGeekResponseDTO> buscarTodosOsItens() {
        return repoItem.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public ItemGeekResponseDTO buscarPorNome(String nome) {
        ItemGeek item = repoItem.findByNome(nome);
        return mapper.toDTO(item);
    }

    public ItemGeekResponseDTO buscarItem(String id) {
        return mapper.toDTO(repoItem.findById(id).orElseThrow(() -> new ItemNotFoundException("Item não encontrado")));
    }

    public ItemGeekResponseDTO atualizarItem(String id, ItemGeekRequestDTO itemDTO) {
        ItemGeek existingItem = repoItem.findById(id).orElseThrow(() -> new ItemNotFoundException("Item não encontrado"));
        // Converte o DTO recebido para entidade, mantendo os novos dados
        ItemGeek updatedItem = mapper.toEntity(itemDTO);
        // Mantém o ID original do item
        updatedItem.setId(existingItem.getId());
        // Salva o item atualizado no banco e converte para DTO para retornar
        return mapper.toDTO(repoItem.save(updatedItem));
    }
    
    public ItemGeekResponseDTO removerItem(String id) {
        ItemGeek item = repoItem.findById(id).orElseThrow(() -> new ItemNotFoundException("Item não encontrado"));
        repoItem.delete(item);
        return mapper.toDTO(item);
    }

}