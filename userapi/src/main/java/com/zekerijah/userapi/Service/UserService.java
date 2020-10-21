package com.zekerijah.userapi.Service;

import com.zekerijah.userapi.Model.User;
import com.zekerijah.userapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
    }

    public void addNewUser(User user) {
        repository.save(user);
    }

    public void updateUser(User user) {
        repository.save(user);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
