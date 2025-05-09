package br.com.nerdstore.controller;

import br.com.nerdstore.model.dto.ItemGeekRequestDTO;
import br.com.nerdstore.model.dto.ItemGeekResponseDTO;
import br.com.nerdstore.service.ItemGeekService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
class ItemGeekController {

    @Autowired
    private ItemGeekService itemService;

    @Operation(summary = "Listar todos os itens")
    @GetMapping
    public ResponseEntity<List<ItemGeekResponseDTO>> getAllItems() {
        try {
            return ResponseEntity.ok(itemService.buscarTodosOsItens());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Buscar item pelo ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(itemService.buscarItem(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Operation(summary = "Postar um item")
    @PostMapping
    public ResponseEntity<ItemGeekResponseDTO> postItem(@RequestBody ItemGeekRequestDTO itemDTO) {
        try {
            return ResponseEntity.ok(itemService.adicionarItem(itemDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Alterar um item")
    @PutMapping("{id}")
    public ResponseEntity<ItemGeekResponseDTO> putItem(@PathVariable String id, @RequestBody ItemGeekRequestDTO itemDTO) {
        try {
            return ResponseEntity.ok(itemService.atualizarItem(id, itemDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Deletar um item")
    @DeleteMapping("{id}")
    public ResponseEntity<ItemGeekResponseDTO> deleteItem(@PathVariable String id) {
        try {
            return ResponseEntity.ok(itemService.removerItem(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
