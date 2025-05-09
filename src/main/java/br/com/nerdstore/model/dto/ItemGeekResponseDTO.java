package br.com.nerdstore.model.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemGeekResponseDTO {
    private String id;
    private String nome;
    private Integer classificacao;
    private String descricao;
    private String categoria;
    private Double preco;
    private String imagemUrl;
}