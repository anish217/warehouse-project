package com.skillstorm.warehouseproject.repositories;

import com.skillstorm.warehouseproject.models.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {


    //This query allows us to aggregate all the current products from a warehouse
    @Query("SELECT COALESCE (SUM(i.quantity), 0) FROM Inventory i WHERE i.warehouseId = :warehouseId")
    int sumQuantityByWarehouseId(Long warehouseId);

}
