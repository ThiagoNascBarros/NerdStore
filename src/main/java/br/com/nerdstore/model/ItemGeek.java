package br.com.nerdstore.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 100, message = "O nome do item deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotNull(message = "A classificação é obrigatória")
    @Positive(message = "A classificação deve ser maior que zero")
    private Integer classificacao;

    @NotBlank(message = "A descrição do item é obrigatória")
    @Size(min = 10, max = 250, message = "A descrição deve ter entre 10 e 250 caracteres")
    private String descricao;

    @NotNull(message = "A categoria do item é obrigatória")
    private String categoria;

    @NotNull(message = "O preço do item é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    private Double preco;

    @NotBlank(message = "A URL da imagem do item é obrigatória")
    private String imagemUrl;
}