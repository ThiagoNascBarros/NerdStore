package br.com.nerdstore.controller;

import br.com.nerdstore.model.dto.ItemGeekRequestDTO;
import br.com.nerdstore.service.ItemGeekService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
@Tag(name = "Item Geek", description = "Endpoints para gerenciamento de itens geek")
class ItemGeekController {

    @Autowired
    private ItemGeekService itemService;

    @Operation(summary = "Busca todos os itens cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Itens encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public ResponseEntity<?> getAllItems() {
        try {
            return ResponseEntity.ok(itemService.buscarTodosOsItens());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Operation(summary = "Busca um item pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item encontrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(itemService.buscarItem(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Operation(summary = "Posta um item à coleção")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item criado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PostMapping
    public ResponseEntity<?> postItem(@Valid @RequestBody ItemGeekRequestDTO itemDTO) {
        try {
            return ResponseEntity.ok(itemService.adicionarItem(itemDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Operation(summary = "Atualiza um item")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item atualizado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("{id}")
    public ResponseEntity<?> putItem(@PathVariable String id,@Valid @RequestBody ItemGeekRequestDTO itemDTO) {
        try {
            return ResponseEntity.ok(itemService.atualizarItem(id, itemDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Operation(summary = "Remove um item")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item removido com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        try {
            return ResponseEntity.ok(itemService.removerItem(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
