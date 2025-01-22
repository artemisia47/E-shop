document.addEventListener('DOMContentLoaded', () => {
  // Selectors
  const products = document.querySelectorAll('.product');
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  const proceedToPaymentButton = document.getElementById('proceed-to-payment');
  
  let cart = []; // Array to store cart items
  let total = 0; // Variable to store total price

  // Add event listeners to "Add to Cart" buttons
  products.forEach(product => {
      const button = product.querySelector('.add-to-cart');
      button.addEventListener('click', () => addToCart(product));
  });

  // Function to add product to cart
  function addToCart(product) {
      const id = product.getAttribute('data-id');
      const price = parseFloat(product.getAttribute('data-price'));
      const name = product.querySelector('h3').innerText;
      const image = product.querySelector('img').src;

      // Check if item is already in cart
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ id, name, price, image, quantity: 1 });
      }

      updateCart();
  }

  // Function to update cart display
  function updateCart() {
      cartItems.innerHTML = ''; // Clear cart display
      total = 0;

      cart.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
              <img src="${item.image}" alt="${item.name}" width="50">
              <span>${item.name} x ${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="remove-item" data-id="${item.id}">Remove</button>
          `;
          cartItems.appendChild(li);
          total += item.price * item.quantity;
      });

      totalDisplay.innerText = `Total: $${total.toFixed(2)}`;

      // Add event listeners to "Remove" buttons
      const removeButtons = cartItems.querySelectorAll('.remove-item');
      removeButtons.forEach(button => {
          button.addEventListener('click', () => removeFromCart(button.getAttribute('data-id')));
      });
  }

  // Function to remove product from cart
  function removeFromCart(id) {
      const itemIndex = cart.findIndex(item => item.id === id);
      if (itemIndex > -1) {
          cart[itemIndex].quantity--;
          if (cart[itemIndex].quantity === 0) {
              cart.splice(itemIndex, 1);
          }
      }
      updateCart();
  }

  // Placeholder for "Proceed to Payment" button
  proceedToPaymentButton.addEventListener('click', () => {
      alert('This feature is not implemented yet.');
  });
});
