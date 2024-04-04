// Function to open the form for adding a new inventory item
function openInventoryForm() {
    document.getElementById("inventoryFormContainer").style.display = "block";
}

// Function to open the form for editing an inventory item
function openEditInventoryForm(inventoryId, phoneId, warehouseId, quantity) {
    document.getElementById("editInventoryId").value = inventoryId;
    document.getElementById("editPhoneId").value = phoneId;
    document.getElementById("editWarehouseId").value = warehouseId;
    document.getElementById("editQuantity").value = quantity;
    document.getElementById("editInventoryFormContainer").style.display = "block";
}

// Function to delete an inventory item
function deleteInventory(inventoryId) {
    if (confirm("Are you sure you want to delete this inventory item?")) {
        fetch('/inventory/' + inventoryId, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Inventory item deleted successfully!");
                fetchInventoryData(); // Refresh inventory table
            } else {
                alert("Failed to delete inventory item. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error deleting inventory item:', error);
            alert("Failed to delete inventory item. Please try again.");
        });
    }
}

// Function to submit the form for adding a new inventory item
function submitInventoryForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const phoneId = parseInt(document.getElementById("phoneId").value);
    const warehouseId = parseInt(document.getElementById("warehouseId").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    // Create a new inventory object
    const newInventoryItem = {
        phoneId: phoneId,
        warehouseId: warehouseId,
        quantity: quantity
    };

    // Send a POST request to add the new inventory item
    fetch('/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInventoryItem)
    })
    .then(response => {
        if (response.ok) {
            alert("Inventory item added successfully!");
            // Clear form fields
            document.getElementById("phoneId").value = "";
            document.getElementById("warehouseId").value = "";
            document.getElementById("quantity").value = "";
            // Hide form
            document.getElementById("inventoryFormContainer").style.display = "none";
            // Reload inventory table
            fetchInventoryData();
        } else {
            alert("Failed to add inventory item. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error adding inventory item:', error);
        alert("Failed to add inventory item. Please try again.");
    });
}

// Function to submit the form for editing an inventory item
function submitEditInventoryForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const inventoryId = document.getElementById("editInventoryId").value;
    const phoneId = parseInt(document.getElementById("editPhoneId").value);
    const warehouseId = parseInt(document.getElementById("editWarehouseId").value);
    const quantity = parseInt(document.getElementById("editQuantity").value);

    // Create an updated inventory object
    const updatedInventoryItem = {
        inventoryId: inventoryId,
        phoneId: phoneId,
        warehouseId: warehouseId,
        quantity: quantity
    };

    // Send a PUT request to update the inventory item
    fetch('/inventory/' + inventoryId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInventoryItem)
    })
    .then(response => {
        if (response.ok) {
            alert("Inventory item updated successfully!");
            // Clear form fields
            document.getElementById("editInventoryId").value = "";
            document.getElementById("editPhoneId").value = "";
            document.getElementById("editWarehouseId").value = "";
            document.getElementById("editQuantity").value = "";
            // Hide form
            document.getElementById("editInventoryFormContainer").style.display = "none";
            // Reload inventory table
            fetchInventoryData();
        } else {
            alert("Failed to update inventory item. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error updating inventory item:', error);
        alert("Failed to update inventory item. Please try again.");
    });
}

// Function to fetch inventory data and populate the table
function fetchInventoryData() {
    fetch('/inventory')
    .then(response => response.json())
    .then(data => {
        const inventoryTableBody = document.getElementById('inventoryTableBody');
        // Clear existing table data
        inventoryTableBody.innerHTML = "";

        // Populate table with fetched data
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.inventoryId}</td>
                <td>${item.phoneId}</td>
                <td>${item.warehouseId}</td>
                <td>${item.quantity}</td>
                <td><button onclick="openEditInventoryForm('${item.inventoryId}', '${item.phoneId}', '${item.warehouseId}', '${item.quantity}')">Edit</button></td>
                <td><button onclick="deleteInventory('${item.inventoryId}')">Delete</button></td>
            `;
            inventoryTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching inventory data:', error));
}

// Fetch inventory data when the page loads
fetchInventoryData();
