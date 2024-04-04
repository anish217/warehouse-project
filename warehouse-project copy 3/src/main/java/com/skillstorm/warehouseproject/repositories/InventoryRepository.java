package com.skillstorm.warehouseproject.repositories;

import com.skillstorm.warehouseproject.models.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
