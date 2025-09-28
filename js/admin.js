// Admin Dashboard JavaScript

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            if (mobileNav.classList.contains('active')) {
                mobileNav.style.display = 'flex';
            } else {
                setTimeout(() => {
                    mobileNav.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            setTimeout(() => {
                mobileNav.style.display = 'none';
            }, 300);
        }
    });
});