// Function to generate random number within a range
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a particle
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Randomize size, position, and animation duration
    const size = getRandomNumber(2, 6);
    const left = getRandomNumber(0, window.innerWidth);
    const top = getRandomNumber(0, window.innerHeight);
    const duration = getRandomNumber(4, 8);

    // Set size and position
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}px`;
    particle.style.top = `${top}px`;

    // Set animation duration
    particle.style.animationDuration = `${duration}s`;

    // Append to the particle container
    document.querySelector('.particle-container').appendChild(particle);

    // Remove particle after animation ends
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case 'phoneBtn':
            window.location.href = 'phone.html';
            break;
        case 'inventoryBtn':
            window.location.href = 'inventory.html';
            break;
        case 'warehouseBtn':
            window.location.href = 'warehouse.html';
            break;
        default:
            break;
    }
}

// Function to create multiple particles
function createParticles() {
    setInterval(createParticle, 200); // Generate particles every 0.2 seconds
}

// Call the function to create particles when the window loads
window.onload = () => {
    // Add event listeners to the buttons
    const phoneBtn = document.getElementById('phoneBtn');
    const inventoryBtn = document.getElementById('inventoryBtn');
    const warehouseBtn = document.getElementById('warehouseBtn');

    phoneBtn.addEventListener('click', handleButtonClick);
    inventoryBtn.addEventListener('click', handleButtonClick);
    warehouseBtn.addEventListener('click', handleButtonClick);

    // Create particles
    createParticles();
};
