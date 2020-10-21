package com.zekerijah.userapi.Controller;

import com.zekerijah.userapi.Model.User;
import com.zekerijah.userapi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/user")
    public List<User> getAllUser(){
        return service.findAll();
    }

    @PostMapping("/user/addnew")
    public void addUser(@RequestBody User user){
        service.addNewUser(user);
    }

    @PutMapping("/user/{id}/edit")
    public void editUser(@PathVariable ("id") Integer id, @RequestBody User user){
        service.updateUser(user);
    }

    @DeleteMapping("/user/{id}/delete")
    public void delteUser(@PathVariable ("id") Integer id){
        service.delete(id);
    }
}
