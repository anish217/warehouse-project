package com.skillstorm.warehouseproject.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.warehouseproject.models.Warehouse;
import com.skillstorm.warehouseproject.repositories.WarehouseRepository;

@RestController
public class WarehouseController {
    

    @Autowired
    private WarehouseRepository warehouseRepository;

    //post
    @PostMapping("/warehouse")
    Warehouse newWarehuose(@RequestBody Warehouse newWarehouse){
        return warehouseRepository.save(newWarehouse);
    }

    // GET
    @GetMapping("/warehouses")
    List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @GetMapping("/warehouse/{id}")
    Warehouse getWarehouseById(@PathVariable Long id) {
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(id);
        return warehouseOptional.orElse(null);
    }

    // PUT
    @PutMapping("/warehouse/{id}")
    Warehouse updateWarehouse(@PathVariable Long id, @RequestBody Warehouse updatedWarehouse) {
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(id);
        if (warehouseOptional.isPresent()) {
            Warehouse warehouse = warehouseOptional.get();
            warehouse.setName(updatedWarehouse.getName());
            warehouse.setLocation(updatedWarehouse.getLocation());
            warehouse.setCapacity(updatedWarehouse.getCapacity());
            return warehouseRepository.save(warehouse);
        } else {
            throw new IllegalArgumentException("Warehouse with ID " + id + " not found");
        }
    }

    // DELETE
    @DeleteMapping("/warehouse/{id}")
    void deleteWarehouse(@PathVariable Long id) {
        warehouseRepository.deleteById(id);
    }


}
