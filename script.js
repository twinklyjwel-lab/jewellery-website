let cart = [];

const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
};

const filterProducts = (category) => {
    const products = document.querySelectorAll('.product-card.product');
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            product.style.display = product.classList.contains(category) ? 'block' : 'none';
        }
    });

    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
};

const addToCart = (productId) => {
    cart.push(productId);
    alert('Product added to cart!');
};

const validateContactForm = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return false;
    }
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
};

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateContactForm()) {
                alert('Thank you! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterProducts(button.dataset.category);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.productId);
        });
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            if (email.value.trim()) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }
});