package br.com.nerdstore.model.mapper;

import br.com.nerdstore.model.dto.ItemGeekRequestDTO;
import br.com.nerdstore.model.dto.ItemGeekResponseDTO;
import br.com.nerdstore.model.ItemGeek;
import org.springframework.stereotype.Component;

@Component
public class ItemGeekMapper {

    public ItemGeek toEntity(ItemGeekRequestDTO dto) {
        ItemGeek entity = new ItemGeek();
        entity.setNome(dto.getNome());
        entity.setClassificacao(dto.getClassificacao());
        entity.setDescricao(dto.getDescricao());
        entity.setCategoria(dto.getCategoria());
        entity.setPreco(dto.getPreco());
        entity.setImagemUrl(dto.getImagemUrl());
        return entity;
    }

    public ItemGeekResponseDTO toDTO(ItemGeek entity) {
        return new ItemGeekResponseDTO(
                entity.getId(),
                entity.getNome(),
                entity.getClassificacao(),
                entity.getDescricao(),
                entity.getCategoria(),
                entity.getPreco(),
                entity.getImagemUrl()
        );
    }
}