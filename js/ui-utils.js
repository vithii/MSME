// Shared UI Utilities for MSMEgrowth

// 1. Toast Notification System
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    
    container.appendChild(toast);

    // Remove toast after animation finishes (3.5s total)
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// Override default window.alert to use Toast
window.alert = function(message) {
    showToast(message, 'success');
};

// 2. Mobile Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const layout = document.querySelector('.dashboard-layout');
    const sidebar = document.querySelector('.sidebar');
    
    if (layout && sidebar) {
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-btn';
        hamburgerBtn.innerHTML = '☰';
        
        // Insert into DOM
        layout.insertBefore(hamburgerBtn, layout.firstChild);
        
        // Toggle Sidebar
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && e.target !== hamburgerBtn) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
});

// 3. Auth Loader Spinner Setup (REMOVED to prevent annoying overlay)

// Function to hide the loader when auth resolves
function hideAuthLoader() {
    const loader = document.getElementById('auth-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}
