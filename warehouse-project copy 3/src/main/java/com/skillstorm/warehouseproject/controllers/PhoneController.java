package com.skillstorm.warehouseproject.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.skillstorm.warehouseproject.models.Phone;
import com.skillstorm.warehouseproject.repositories.PhoneRepository;




@RestController
public class PhoneController {

    @Autowired
    private PhoneRepository phoneRepository;

    //post
    @PostMapping("/phone")
    Phone newPhone(@RequestBody Phone newPhone){
        return phoneRepository.save(newPhone);
    }

    //get
    @GetMapping("/phones")
    List<Phone> getAllPhones(){
        return phoneRepository.findAll();
    }
    
    // PUT
    @PutMapping("/phone/{id}")
    Phone updatePhone(@PathVariable Long id, @RequestBody Phone updatedPhone) {
        Optional<Phone> phoneOptional = phoneRepository.findById(id);
        if (phoneOptional.isPresent()) {
            Phone phone = phoneOptional.get();
            phone.setName(updatedPhone.getName());
            phone.setBrand(updatedPhone.getBrand());
            phone.setPrice(updatedPhone.getPrice());
            return phoneRepository.save(phone);
        } else {
            throw new IllegalArgumentException("Phone with ID " + id + " not found");
        }
    }

    // DELETE
    @DeleteMapping("/phone/{id}")
    void deletePhone(@PathVariable Long id) {
        phoneRepository.deleteById(id);
    }
   
}

    



    
