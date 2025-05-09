package br.com.nerdstore.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemGeek {

    @Id
    private String id;

    @NotBlank(message = "O nome do item é obrigatório")
    private String nome;

    @NotBlank(message = "A classificação é obrigatória")
    private Integer classificacao;

    @NotBlank(message = "A descrição do item é obrigatória")
    private String descricao;

    @NotBlank(message = "A categoria do item é obrigatória")
    private String categoria;

    @NotBlank(message = "O preço do item é obrigatório")
    private Double preco;

    @NotBlank(message = "A URL da imagem do item é obrigatória")
    private String imagemUrl;

}
