// Function to open the form for adding a new phone
function openPhoneForm() {
    // Display the form for adding a new phone
    document.getElementById("phoneFormContainer").style.display = "block";
    // Display the overlay to darken the background
    document.getElementById("overlay").style.display = "block";
}

// Function to open the form for editing a phone
function openEditPhoneForm(phoneId, brand, name, price) {
    // Populate the form fields with the phone's details
    document.getElementById("editPhoneId").value = phoneId;
    document.getElementById("editBrand").value = brand;
    document.getElementById("editName").value = name;
    document.getElementById("editPrice").value = price;
    // Display the form for editing the phone
    document.getElementById("editPhoneFormContainer").style.display = "block";
    // Display the overlay to darken the background
    document.getElementById("overlay").style.display = "block";
}

// Function to delete a phone
function deletePhone(phoneId) {
    // Ask for confirmation before deleting the phone
    if (confirm("Are you sure you want to delete this phone?")) {
        // Send a DELETE request to the server to delete the phone
        fetch('/phone/' + phoneId, {
            method: 'DELETE'
        })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                // Display a success message
                alert("Phone deleted successfully!");
                // Refresh the phone table
                fetchPhoneData();
            } else {
                // Display an error message if the request failed
                alert("Failed to delete phone. Please try again.");
            }
        })
        .catch(error => {
            // Log and display an error message if there was an issue with the request
            console.error('Error deleting phone:', error);
            alert("Failed to delete phone. Please try again.");
        });
    }
}

// Function to submit the form for adding a new phone
function submitPhoneForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract values from the form
    const brand = document.getElementById("brand").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);

    // Create a new phone object
    const newPhone = {
        brand: brand,
        name: name,
        price: price
    };

    // Send a POST request to add the new phone
    fetch('/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPhone)
    })
    .then(response => {
        // Check if the request was successful
        if (response.ok) {
            // Display a success message
            alert("Phone added successfully!");
            // Clear form fields
            document.getElementById("brand").value = "";
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            // Hide the form for adding a new phone
            document.getElementById("phoneFormContainer").style.display = "none";
            // Hide the overlay
            document.getElementById("overlay").style.display = "none";
            // Refresh the phone table
            fetchPhoneData();
        } else {
            // Display an error message if the request failed
            alert("Failed to add phone. Please try again.");
        }
    })
    .catch(error => {
        // Log and display an error message if there was an issue with the request
        console.error('Error adding phone:', error);
        alert("Failed to add phone. Please try again.");
    });
}

// Function to submit the form for editing a phone
function submitEditPhoneForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract values from the form
    const id = document.getElementById("editPhoneId").value;
    const brand = document.getElementById("editBrand").value;
    const name = document.getElementById("editName").value;
    const price = parseFloat(document.getElementById("editPrice").value);

    // Create an updated phone object
    const updatedPhone = {
        id: id,
        brand: brand,
        name: name,
        price: price
    };

    // Send a PUT request to update the phone
    fetch('/phone/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPhone)
    })
    .then(response => {
        // Check if the request was successful
        if (response.ok) {
            // Display a success message
            alert("Phone updated successfully!");
            // Clear form fields
            document.getElementById("editPhoneId").value = "";
            document.getElementById("editBrand").value = "";
            document.getElementById("editName").value = "";
            document.getElementById("editPrice").value = "";
            // Hide the form for editing a phone
            document.getElementById("editPhoneFormContainer").style.display = "none";
            // Hide the overlay
            document.getElementById("overlay").style.display = "none";
            // Refresh the phone table
            fetchPhoneData();
        } else {
            // Display an error message if the request failed
            alert("Failed to update phone. Please try again.");
        }
    })
    .catch(error => {
        // Log and display an error message if there was an issue with the request
        console.error('Error updating phone:', error);
        alert("Failed to update phone. Please try again.");
    });
}

// Function to fetch phone data and populate the table
function fetchPhoneData() {
    // Fetch phone data from the server
    fetch('/phones')
    .then(response => response.json())
    .then(data => {
        const phoneTableBody = document.getElementById('phoneTableBody');
        // Clear existing table data
        phoneTableBody.innerHTML = "";

        // Populate table with fetched data
        data.forEach(phone => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${phone.phoneId}</td>
                <td>${phone.brand}</td>
                <td>${phone.name}</td>
                <td>${phone.price}</td>
                <td><button class="edit-button" onclick="openEditPhoneForm('${phone.phoneId}', '${phone.brand}', '${phone.name}', '${phone.price}')">Edit</button></td>
                <td><button class="delete-button" onclick="deletePhone('${phone.phoneId}')">Delete</button></td>
            `;
            phoneTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching phone data:', error));
}

// Fetch phone data when the page loads
fetchPhoneData();
