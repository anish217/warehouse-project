// Function to open the form for adding a new warehouse
function openWarehouseForm() {
    document.getElementById("warehouseFormContainer").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Function to open the form for editing a warehouse
function openEditWarehouseForm(id, name, location, capacity) {
    document.getElementById("editWarehouseId").value = id;
    document.getElementById("editWarehouseName").value = name;
    document.getElementById("editWarehouseLocation").value = location;
    document.getElementById("editWarehouseCapacity").value = capacity;
    document.getElementById("editWarehouseFormContainer").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Function to delete a warehouse
function deleteWarehouse(id) {
    if (confirm("Are you sure you want to delete this warehouse?")) {
        fetch('/warehouse/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Warehouse deleted successfully!");
                fetchWarehouseData(); // Refresh warehouse table
            } else {
                alert("Failed to delete warehouse. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error deleting warehouse:', error);
            alert("Failed to delete warehouse. Please try again.");
        });
    }
}

// Function to submit the form for adding a new warehouse
function submitWarehouseForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const name = document.getElementById("warehouseName").value;
    const location = document.getElementById("warehouseLocation").value;
    const capacity = parseInt(document.getElementById("warehouseCapacity").value);

    // Create a new warehouse object
    const newWarehouse = {
        name: name,
        location: location,
        capacity: capacity
    };

    // Send a POST request to add the new warehouse
    fetch('/warehouse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWarehouse)
    })
    .then(response => {
        if (response.ok) {
            alert("Warehouse added successfully!");
            // Clear form fields
            document.getElementById("warehouseName").value = "";
            document.getElementById("warehouseLocation").value = "";
            document.getElementById("warehouseCapacity").value = "";
            // Hide form
            document.getElementById("warehouseFormContainer").style.display = "none";
            document.getElementById("overlay").style.display = "none";
            // Reload warehouse table
            fetchWarehouseData();
        } else {
            alert("Failed to add warehouse. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error adding warehouse:', error);
        alert("Failed to add warehouse. Please try again.");
    });
}

// Function to submit the form for editing a warehouse
function submitEditWarehouseForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const id = document.getElementById("editWarehouseId").value;
    const name = document.getElementById("editWarehouseName").value;
    const location = document.getElementById("editWarehouseLocation").value;
    const capacity = parseInt(document.getElementById("editWarehouseCapacity").value);

    // Create an updated warehouse object
    const updatedWarehouse = {
        id: id,
        name: name,
        location: location,
        capacity: capacity
    };

    // Send a PUT request to update the warehouse
    fetch('/warehouse/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedWarehouse)
    })
    .then(response => {
        if (response.ok) {
            alert("Warehouse updated successfully!");
            // Clear form fields
            document.getElementById("editWarehouseId").value = "";
            document.getElementById("editWarehouseName").value = "";
            document.getElementById("editWarehouseLocation").value = "";
            document.getElementById("editWarehouseCapacity").value = "";
            // Hide form
            document.getElementById("editWarehouseFormContainer").style.display = "none";
            document.getElementById("overlay").style.display = "none";
            // Reload warehouse table
            fetchWarehouseData();
        } else {
            alert("Failed to update warehouse. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error updating warehouse:', error);
        alert("Failed to update warehouse. Please try again.");
    });
}

// Function to fetch warehouse data and populate the table
function fetchWarehouseData() {
    fetch('/warehouses')
    .then(response => response.json())
    .then(data => {
        const warehouseTableBody = document.getElementById('warehouseTableBody');
        // Clear existing table data
        warehouseTableBody.innerHTML = "";

        // Populate table with fetched data
        data.forEach(warehouse => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${warehouse.id}</td>
                <td>${warehouse.name}</td>
                <td>${warehouse.location}</td>
                <td>${warehouse.capacity}</td>
                <td><button class="edit-button" onclick="openEditWarehouseForm('${warehouse.id}', '${warehouse.name}', '${warehouse.location}', '${warehouse.capacity}')">Edit</button></td>
                <td><button class="delete-button" onclick="deleteWarehouse('${warehouse.id}')">Delete</button></td>
            `;
            warehouseTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching warehouse data:', error));
}

// Fetch warehouse data when the page loads
fetchWarehouseData();
