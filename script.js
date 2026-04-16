// IP Copy Functionality
function copyIP() {
    const ipText = document.getElementById('server-ip').innerText;
    const toast = document.getElementById('copy-toast');
    
    navigator.clipboard.writeText(ipText).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Simulated Live Player Count
function updatePlayerCount() {
    const pCountElement = document.getElementById('p-count');
    let currentCount = parseInt(pCountElement.innerText);
    
    // Add/Remove a random number of players to simulate activity
    const change = Math.floor(Math.random() * 5) - 2;
    currentCount = Math.max(50, currentCount + change);
    
    pCountElement.innerText = currentCount;
}

setInterval(updatePlayerCount, 5000);

// Luxury Sparkle Effect
function createSparkle() {
    const container = document.getElementById('sparkles-container');
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `-10px`;
    sparkle.style.animationDuration = `${duration}s`;
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.backgroundColor = Math.random() > 0.5 ? '#FFD700' : '#FFFFFF';
    sparkle.style.boxShadow = `0 0 ${size * 2}px ${sparkle.style.backgroundColor}`;

    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, (duration + delay) * 1000);
}

// Sparkle CSS logic
const style = document.createElement('style');
style.innerHTML = `
    .sparkle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: fall linear forwards;
    }
    @keyframes fall {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        20% { opacity: 1; transform: translateY(20vh) scale(1); }
        100% { transform: translateY(110vh) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start sparkles
for(let i = 0; i < 20; i++) {
    setTimeout(createSparkle, i * 200);
}
setInterval(createSparkle, 300);

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-glass');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

// Cart Logic
let cart = JSON.parse(localStorage.getItem('bling-cart')) || [];

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('open');
}

function addToCart(name, price) {
    const item = { id: Date.now(), name, price };
    cart.push(item);
    updateCartUI();
    saveCart();
    
    // Open cart drawer to show the item was added
    const drawer = document.getElementById('cart-drawer');
    if (!drawer.classList.contains('open')) {
        drawer.classList.add('open');
    }

    // Optional: Add a small bounce animation to the floating cart
    const floatingCart = document.querySelector('.floating-cart');
    floatingCart.style.transform = 'scale(1.2)';
    setTimeout(() => {
        floatingCart.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    if (!cartItemsElement || !cartCountElement || !totalPriceElement) return;

    // Update count
    cartCountElement.innerText = cart.length;
    
    // Update items list
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartItemsElement.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('bling-cart', JSON.stringify(cart));
}

// Initialize Cart on Page Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const drawer = document.getElementById('cart-drawer');
    const floatingCart = document.querySelector('.floating-cart');
    
    if (drawer && drawer.classList.contains('open') && 
        !drawer.contains(e.target) && 
        !floatingCart.contains(e.target) &&
        !e.target.classList.contains('btn-outline-gold')) {
        drawer.classList.remove('open');
    }
});

// Custom Cursor Logic
const cursorFollow = document.querySelector('.cursor-follow');
const cursorGem = document.querySelector('.cursor-gem');
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Gem moves instantly
    if (cursorGem) {
        cursorGem.style.left = `${mouseX}px`;
        cursorGem.style.top = `${mouseY}px`;
    }
});

// Smooth trail for the follow circle
function animateCursor() {
    const lerp = 0.15;
    followX += (mouseX - followX) * lerp;
    followY += (mouseY - followY) * lerp;
    
    if (cursorFollow) {
        cursorFollow.style.left = `${followX}px`;
        cursorFollow.style.top = `${followY}px`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects
const interactiveElements = document.querySelectorAll('a, button, .ip-container, .btn-gold, .btn-outline-gold, .glass-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollow) cursorFollow.classList.add('custom-cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorFollow) cursorFollow.classList.remove('custom-cursor-hover');
    });
});
