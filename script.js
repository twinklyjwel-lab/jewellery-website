// script.js for Jewellery Website

// Smooth scrolling navigation
const smoothScroll = (target) => {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
};

// Product filtering
const filterProducts = (category) => {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = product.classList.contains(category) ? 'block' : 'none';
    });
};

// Add to cart functionality
let cart = [];
const addToCart = (productId) => {
    cart.push(productId);
    alert('Product added to cart!');
};

// Contact form validation
const validateContactForm = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!name || !email) {
        alert('Please fill in both fields.');
        return false;
    }
    return true;
};

// Mobile menu toggle
const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
};

// Event Listeners
document.getElementById('nav-button').addEventListener('click', () => smoothScroll('#nav-section'));
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => filterProducts(button.dataset.category));
});
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => addToCart(button.dataset.productId));
});
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateContactForm()) {
        alert('Form submitted!');
    }
});
document.getElementById('menu-toggle').addEventListener('click', toggleMobileMenu);