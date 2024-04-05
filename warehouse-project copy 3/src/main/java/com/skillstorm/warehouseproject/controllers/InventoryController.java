package com.skillstorm.warehouseproject.controllers;

import com.skillstorm.warehouseproject.models.Inventory;
import com.skillstorm.warehouseproject.models.Phone;
import com.skillstorm.warehouseproject.models.Warehouse;
import com.skillstorm.warehouseproject.repositories.InventoryRepository;
import com.skillstorm.warehouseproject.repositories.PhoneRepository;
import com.skillstorm.warehouseproject.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private PhoneRepository phoneRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    // POST
    @PostMapping("/inventory")
    Inventory newInventory(@RequestBody Inventory newInventory) {
        // Check if the Phone ID exists
        Optional<Phone> phoneOptional = phoneRepository.findById(newInventory.getPhoneId());
        if (!phoneOptional.isPresent()) {
            throw new IllegalArgumentException("Phone ID " + newInventory.getPhoneId() + " not found");
        }

        // Check if the Warehouse ID exists
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(newInventory.getWarehouseId());
        if (!warehouseOptional.isPresent()) {
            throw new IllegalArgumentException("Warehouse ID " + newInventory.getWarehouseId() + " not found");
        }else{
            Warehouse warehouse = warehouseOptional.get();
            int capacity = warehouse.getCapacity();
            int quantity = inventoryRepository.sumQuantityByWarehouseId(newInventory.getWarehouseId());
            System.out.println("Capacity Left After Upcoming Insertion: " + (capacity - (quantity + newInventory.getQuantity())));
            if((capacity - (quantity + newInventory.getQuantity())) < 0 ){
                throw new IllegalArgumentException("Capacity Full!");
            }
            


        }

        return inventoryRepository.save(newInventory);
    }

    // GET
    @GetMapping("/inventory")
    List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    Inventory getInventoryById(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    // PUT
    @PutMapping("/inventory/{id}")
    Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
        updatedInventory.setInventoryId(id);
        return inventoryRepository.save(updatedInventory);
    }

    // DELETE
    @DeleteMapping("/inventory/{id}")
    void deleteInventory(@PathVariable Long id) {
        inventoryRepository.deleteById(id);
    }
}
