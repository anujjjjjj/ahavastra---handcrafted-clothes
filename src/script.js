
// Product Data
const products = {
  kurtis: [
    {
      id: 'k1',
      name: 'Embroidered Cotton Kurti',
      price: 1299,
      image: 'images/image3.jpeg'
    },
    {
      id: 'k2',
      name: 'Floral Print Anarkali Kurti',
      price: 1499,
      image: 'images/image5.jpeg'
    },
    {
      id: 'k3',
      name: 'Elegant Maroon Kurti',
      price: 1199,
      image: 'images/image7.jpeg'
    },
    {
      id: 'k4',
      name: 'Blue Printed Cotton Kurti',
      price: 999,
      image: 'images/image1.jpeg'
    },
    {
      id: 'k5',
      name: 'Yellow Embroidered Kurti',
      price: 1599,
      image: 'images/image2.jpeg'
    },
    {
      id: 'k6',
      name: 'Green Straight Cut Kurti',
      price: 1399,
      image: 'images/image4.jpeg'
    },
    {
      id: 'k7',
      name: 'Designer Ethnic Kurti',
      price: 1899,
      image: 'images/image6.jpeg'
    }
  ],
  sarees: [
    {
      id: 's1',
      name: 'Silk Banarasi Saree',
      price: 3999,
      image: 'images/image1.jpeg'
    },
    {
      id: 's2',
      name: 'Cotton Handloom Saree',
      price: 2499,
      image: 'images/image2.jpeg'
    },
    {
      id: 's3',
      name: 'Georgette Printed Saree',
      price: 1899,
      image: 'images/image4.jpeg'
    },
    {
      id: 's4',
      name: 'Designer Silk Saree',
      price: 4999,
      image: 'images/image6.jpeg'
    },
    {
      id: 's5',
      name: 'Festive Embroidered Saree',
      price: 5999,
      image: 'images/image3.jpeg'
    },
    {
      id: 's6',
      name: 'Chiffon Lightweight Saree',
      price: 1699,
      image: 'images/image5.jpeg'
    },
    {
      id: 's7',
      name: 'Bridal Collection Saree',
      price: 8999,
      image: 'images/image7.jpeg'
    }
  ],
  accessories: [
    {
      id: 'a1',
      name: 'Traditional Earrings',
      price: 899,
      image: 'images/image3.jpeg'
    },
    {
      id: 'a2',
      name: 'Statement Necklace Set',
      price: 1499,
      image: 'images/image5.jpeg'
    },
    {
      id: 'a3',
      name: 'Embroidered Potli Bag',
      price: 1299,
      image: 'images/image7.jpeg'
    },
    {
      id: 'a4',
      name: 'Beaded Bangles Set',
      price: 699,
      image: 'images/image1.jpeg'
    },
    {
      id: 'a5',
      name: 'Designer Clutch',
      price: 1999,
      image: 'images/image2.jpeg'
    },
    {
      id: 'a6',
      name: 'Traditional Maang Tikka',
      price: 1199,
      image: 'images/image4.jpeg'
    },
    {
      id: 'a7',
      name: 'Ethnic Anklets',
      price: 799,
      image: 'images/image6.jpeg'
    }
  ]
};

// DOM Elements
const kurtisGrid = document.getElementById('kurtis-grid');
const sareesGrid = document.getElementById('sarees-grid');
const accessoriesGrid = document.getElementById('accessories-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
function init() {
  renderProducts('kurtis', kurtisGrid);
  renderProducts('sarees', sareesGrid);
  renderProducts('accessories', accessoriesGrid);
  renderCart();
  updateCartCount();
}

// Render Products
function renderProducts(category, container) {
  let html = '';
  products[category].forEach(product => {
    html += `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-price">₹${product.price}</div>
          <button class="add-to-cart" data-id="${product.id}" data-category="${category}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  // Add event listeners to add to cart buttons
  const addToCartButtons = container.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
}

// Handle Add to Cart
function handleAddToCart(e) {
  const productId = e.target.getAttribute('data-id');
  const category = e.target.getAttribute('data-category');
  
  // Find the product
  const product = products[category].find(item => item.id === productId);
  
  // Check if product already in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    // Increase quantity if already in cart
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: category
    });
  }
  
  // Save cart to localStorage
  saveCart();
  
  // Update UI
  renderCart();
  updateCartCount();
  
  // Show cart sidebar
  openCart();
}

// Render Cart
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }
  
  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
  });
  
  cartItems.innerHTML = html;
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total;
  
  // Add event listeners
  const decreaseButtons = cartItems.querySelectorAll('.decrease');
  const increaseButtons = cartItems.querySelectorAll('.increase');
  const removeButtons = cartItems.querySelectorAll('.remove-item');
  
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });
  
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
  
  removeButtons.forEach(button => {
    button.addEventListener('click', removeItem);
  });
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Decrease Quantity
function decreaseQuantity(e) {
  const productId = e.target.getAttribute('data-id');
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// Increase Quantity
function increaseQuantity(e) {
  const productId = e.target.getAttribute('data-id');
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// Remove Item
function removeItem(e) {
  const productId = e.target.getAttribute('data-id');
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Open Cart
function openCart() {
  cartSidebar.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close Cart
function closeCartSidebar() {
  cartSidebar.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Event Listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
overlay.addEventListener('click', closeCartSidebar);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    link.classList.add('active');
    
    const href = link.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop - 80;
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
