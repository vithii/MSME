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

// 4. Google Drive URL Embed Helper
function getGoogleDriveEmbedUrl(url) {
    if (!url) return '';
    // Look for /file/d/FILE_ID/
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    // Look for id=FILE_ID
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url; // fallback to original url if not drive
}

// 5. Google Drive Thumbnail Helper
function getGoogleDriveThumbnailUrl(url, width = 600) {
    if (!url) return '';
    let fileId = '';
    // Look for /file/d/FILE_ID/
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        fileId = match[1];
    } else {
        // Look for id=FILE_ID
        match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            fileId = match[1];
        }
    }
    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
    }
    return '';
}

// 6. Shared Sidebar Renderer
function renderSharedSidebar(activePage) {
    const sidebarEl = document.getElementById('shared-sidebar') || document.querySelector('aside.sidebar');
    if (!sidebarEl) return;
    
    sidebarEl.innerHTML = `
        <a href="index.html" class="nav-logo" style="margin-bottom: 24px; display: block; text-decoration: none;">MSME<span style="color: var(--primary);">growth</span></a>
        
        <nav style="flex-grow: 1;">
            <a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; flex-shrink: 0;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Active Dashboard
            </a>
            <a href="services.html" class="nav-item ${activePage === 'services' ? 'active' : ''}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; flex-shrink: 0;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Service Catalog
            </a>
            <a href="courses.html" class="nav-item ${activePage === 'courses' ? 'active' : ''}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; flex-shrink: 0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg> My Masterclasses
            </a>
            <a href="messages.html" class="nav-item ${activePage === 'messages' ? 'active' : ''}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; flex-shrink: 0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Messages 
            </a>
        </nav>

        <a href="#" class="nav-item" style="margin-bottom: 0;" onclick="firebase.auth().signOut().then(() => window.location.href='login.html')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; flex-shrink: 0;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Sign Out
        </a>
    `;
}

// 7. Shared Topbar Renderer
function renderSharedTopBar(pageSubtitle) {
    const topBarEl = document.getElementById('shared-topbar') || document.querySelector('.top-bar');
    if (!topBarEl) return;
    
    topBarEl.innerHTML = `
        <div>
            <h1 style="font-size: 2rem; margin-bottom: 4px; font-weight: 800;" id="welcome-title">Welcome back 👋</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">${pageSubtitle}</p>
        </div>
        
        <div style="display: flex; gap: 16px; align-items: center;">
            <div style="display: flex; gap: 24px;">
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff;" id="active-orders-count">0</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Active Orders</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--secondary);" id="courses-count">0</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Courses</div>
                </div>
            </div>
            
            <div style="width: 1px; height: 32px; background: rgba(255,255,255,0.1);"></div>

            <div class="user-profile">
                <div style="text-align: right;">
                    <div style="font-weight: 600; font-size: 0.9rem;" id="profile-name">Client Name</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Customer</div>
                </div>
                <div class="avatar" id="profile-avatar">C</div>
            </div>
        </div>
    `;
}

// 8. Shared Layout Init
function initSharedLayout(activePage, pageSubtitle) {
    renderSharedSidebar(activePage);
    renderSharedTopBar(pageSubtitle);
    
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            if (activePage === 'services' || activePage === 'courses') {
                const layout = document.getElementById('dashboard-layout');
                if (layout) layout.classList.remove('auth-loading');
                if (typeof hideAuthLoader === 'function') hideAuthLoader();
                
                const profileContainer = document.querySelector('.top-bar .user-profile');
                if (profileContainer) {
                    profileContainer.innerHTML = `
                        <a href="login.html?redirect=${encodeURIComponent(window.location.href)}" class="btn" style="background: var(--gradient-brand); color: #fff; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; text-decoration: none; border: none; box-shadow: 0 4px 10px rgba(0,163,255,0.25);">Sign In</a>
                    `;
                }
                return;
            }
            window.location.href = 'login.html';
            return;
        }
        
        const layout = document.getElementById('dashboard-layout');
        if (layout) layout.classList.remove('auth-loading');
        if (typeof hideAuthLoader === 'function') hideAuthLoader();

        const profileName = document.getElementById('profile-name');
        const profileAvatar = document.getElementById('profile-avatar');
        const welcomeTitle = document.getElementById('welcome-title');
        
        try {
            const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.name) {
                    const firstName = userData.name.split(' ')[0];
                    if (welcomeTitle) welcomeTitle.innerHTML = `Welcome back, <span style="color: var(--primary);">${firstName}</span> 👋`;
                    if (profileName) profileName.innerText = userData.name;
                    if (profileAvatar) profileAvatar.innerText = firstName.charAt(0).toUpperCase();
                }
            }

            // Calculate active orders and enrolled courses dynamically from Firestore
            firebase.firestore().collection('orders').where('clientId', '==', user.uid).get().then(snapshot => {
                let activeOrders = 0;
                let courses = 0;
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.itemType === 'course') {
                        courses++;
                    } else {
                        if (data.status !== 'Completed') {
                            activeOrders++;
                        }
                    }
                });
                const activeOrdersEl = document.getElementById('active-orders-count');
                const coursesEl = document.getElementById('courses-count');
                if (activeOrdersEl) activeOrdersEl.innerText = activeOrders;
                if (coursesEl) coursesEl.innerText = courses;
            }).catch(err => console.error("Error counting orders:", err));

        } catch (error) {
            console.error("Error fetching user data in shared layout:", error);
        }
    });
}


