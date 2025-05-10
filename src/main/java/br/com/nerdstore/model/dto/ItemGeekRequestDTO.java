package br.com.nerdstore.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemGeekRequestDTO {

    @NotBlank(message = "O nome do item é obrigatório")
    private String nome;

    @NotNull(message = "A classificação é obrigatória")
    @Max(5)
    private Integer classificacao;

    @NotBlank(message = "A descrição do item é obrigatória")
    private String descricao;

    @NotNull(message = "A categoria do item é obrigatória")
    private String categoria;

    @NotNull(message = "O preço do item é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    private Double preco;

    @NotBlank(message = "A URL da imagem do item é obrigatória")
    private String imagemUrl;
    
}