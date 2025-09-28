/**
 * Admin Common JavaScript
 * Shared functionality for all admin pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }

    // Initialize any notifications
    initNotifications();
    
    // Set active navigation based on current page
    setActiveNavigation();
});

/**
 * Set the active navigation item based on current URL
 */
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.desktop-nav .nav-item, .mobile-nav .nav-item');
    
    navItems.forEach(item => {
        // Remove active class from all items
        item.classList.remove('text-primary', 'font-medium');
        item.classList.add('text-gray-500', 'hover:text-primary');
        
        // Add active class to current page link
        if (item.getAttribute('href') && currentPath.includes(item.getAttribute('href'))) {
            item.classList.remove('text-gray-500', 'hover:text-primary');
            item.classList.add('text-primary', 'font-medium');
        }
    });
}

/**
 * Initialize notification system
 */
function initNotifications() {
    // Check for notification elements
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;
    
    // Close notification functionality
    const closeButtons = document.querySelectorAll('.notification-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notification = this.closest('.notification');
            if (notification) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        });
    });
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 * @param {number} duration - How long to show the notification in ms (0 for permanent)
 */
function showNotification(message, type = 'info', duration = 3000) {
    let container = document.getElementById('notification-container');
    
    // Create container if it doesn't exist
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed bottom-4 right-4 z-50 flex flex-col space-y-2';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification p-4 rounded-lg shadow-lg flex items-center justify-between max-w-md transition-all duration-300 ease-in-out`;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-100', 'text-green-800', 'border-l-4', 'border-green-500');
            break;
        case 'error':
            notification.classList.add('bg-red-100', 'text-red-800', 'border-l-4', 'border-red-500');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-100', 'text-yellow-800', 'border-l-4', 'border-yellow-500');
            break;
        default:
            notification.classList.add('bg-blue-100', 'text-blue-800', 'border-l-4', 'border-blue-500');
    }
    
    // Add content
    notification.innerHTML = `
        <div>${message}</div>
        <button class="notification-close ml-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after duration (if not permanent)
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
    
    return notification;
}