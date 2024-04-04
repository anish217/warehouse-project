package com.skillstorm.warehouseproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.warehouseproject.models.Phone;

public interface PhoneRepository extends JpaRepository<Phone, Long>{
    
}
