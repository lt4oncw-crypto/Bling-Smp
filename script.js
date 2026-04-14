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
