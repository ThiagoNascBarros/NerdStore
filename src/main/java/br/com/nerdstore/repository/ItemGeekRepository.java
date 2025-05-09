package br.com.nerdstore.repository;

import br.com.nerdstore.model.ItemGeek;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemGeekRepository extends MongoRepository<ItemGeek, String> {
    
    ItemGeek findByNome(String nome);

}
