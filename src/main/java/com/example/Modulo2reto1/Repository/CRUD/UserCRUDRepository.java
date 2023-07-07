package com.example.Modulo2reto1.Repository.CRUD;

import com.example.Modulo2reto1.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserCRUDRepository extends CrudRepository<User,Integer> {
    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email, String password);

}
