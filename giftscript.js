const addButtons = document.querySelectorAll('.add-button');
const selectedCards = [document.getElementById('selected-1'), document.getElementById('selected-2')];
const addToCartButton = document.getElementById('add-to-cart');
const totalCostElement = document.getElementById('total-cost');

let selectedCount = 0;
let totalCost = 0;

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (selectedCount < 2) {
            const product = button.parentElement;
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));
            const productImage = product.querySelector('img').src;

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                // Clear the selected card
                const card = selectedCards[selectedCount - 1];
                card.innerHTML = '';
                selectedCount--;

                // Update total cost
                totalCost -= productPrice;
                totalCostElement.innerHTML = `<strong>Total Cost: $${totalCost.toFixed(2)}</strong>`;

                // Re-enable the corresponding add button
                button.disabled = false;

                // Disable the "Add to Cart" button if fewer than two products are selected
                if (selectedCount < 2) {
                    addToCartButton.disabled = true;
                }
            });

            // Add product information to the selected card
            const card = selectedCards[selectedCount];
            card.innerHTML = `<img src="${productImage}" alt="${productName}" style="max-width: 50px;"><h4>${productName}</h4><p>Price: $${productPrice}</p>`;
            card.appendChild(deleteButton);

            // Update tracking
            selectedCount++;
            totalCost += productPrice; // Update total cost

            // Display total cost
            totalCostElement.innerHTML = `<strong>Total Cost: $${totalCost.toFixed(2)}</strong>`;

            // Enable the "Add to Cart" button if two products are selected
            if (selectedCount === 2) {
                addToCartButton.disabled = false;
            }

            // Disable the add button for this product
            button.disabled = true;
        } else {
            alert("You can only select up to 2 products.");
        }
    });
});

// Add event listener for "Add to Cart" button
addToCartButton.addEventListener('click', () => {
    // Prompt for packaging choice
    const packagingChoice = prompt("Choose packaging option:\n Enter number only !!\n1. Plastic (Cost: $20)\n2. Paper (Cost: $5)");

    let packagingCost = 0;
    if (packagingChoice === '1') {
        packagingCost = 20; // Plastic
    } else if (packagingChoice === '2') {
        packagingCost = 5; // Paper
    } else {
        alert("Invalid choice! Please select a valid packaging option.");
        return;
    }

    // Add packaging cost to total cost
    totalCost += packagingCost;

    // Display total cost with packaging
    totalCostElement.innerHTML = `<strong>Total Cost: $${totalCost.toFixed(2)}</strong>`;
    
    // Show payment button (for demonstration purpose)
    const paymentButton = document.createElement('button');
    paymentButton.textContent = 'Proceed to Payment';
    paymentButton.style.marginTop = '20px';
    document.querySelector('.selected-products').appendChild(paymentButton);

    paymentButton.addEventListener('click', () => {
        window.location.href = 'payment.html';

    });
});
