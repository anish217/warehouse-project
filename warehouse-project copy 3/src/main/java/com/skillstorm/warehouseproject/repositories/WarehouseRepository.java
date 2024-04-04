package com.skillstorm.warehouseproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.warehouseproject.models.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long>{
    
}
