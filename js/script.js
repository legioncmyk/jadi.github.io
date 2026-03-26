// Navbar navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = getCurrentPage();
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
        
        // Set active nav item
        if (item.getAttribute('data-page') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Placeholder - bisa diarahkan ke detail produk
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path.replace('.html', '');
}

function navigateToPage(page) {
    const pages = {
        'index': 'index.html',
        'produk': 'produk.html',
        'informasi': 'informasi.html',
        'menu': 'menu.html',
        'jasa': 'jasa.html',
        'media': 'media.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent body scroll when touching navbar on mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    
    // Check if swipe was vertical and prevent scroll if on navbar area
    const navbar = document.querySelector('.navbar');
    const navbarRect = navbar.getBoundingClientRect();
    
    if (touchStartY - touchEndY > 30 && window.innerHeight - navbarRect.top < 100) {
        e.preventDefault();
    }
}, { passive: false });

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// PWA-like behavior - add to home screen prompt prevention
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
});
