document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleDesc = document.getElementById('toggle-desc');
    const authTitle = document.getElementById('auth-title');
    const submitBtn = document.getElementById('submit-btn');
    const nameGroup = document.getElementById('name-group');
    const errorMsg = document.getElementById('error-msg');
    const googleBtn = document.getElementById('google-btn');
    
    // Check if already logged in
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const teamQuery = await db.collection('team').where('email', '==', user.email).get();
                if (!teamQuery.empty) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (e) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Hide the global auth loader if the user is not logged in, so they can see the login form
            if (typeof hideAuthLoader === 'function') {
                hideAuthLoader();
            }
        }
    });

    let isLogin = true;

    if(toggleBtn) {
        // Toggle between Login and Sign Up modes
        toggleBtn.addEventListener('click', () => {
            isLogin = !isLogin;
            errorMsg.style.display = 'none';
            
            if(isLogin) {
                authTitle.innerText = "Access Portal";
                submitBtn.innerText = "Authenticate";
                toggleDesc.innerText = "Don't have an account?";
                toggleBtn.innerText = "Create one";
                nameGroup.style.display = "none";
            } else {
                authTitle.innerText = "Initialize Account";
                submitBtn.innerText = "Create Account";
                toggleDesc.innerText = "Already have an account?";
                toggleBtn.innerText = "Sign in";
                nameGroup.style.display = "block";
            }
        });
    }

    if(authForm) {
        // Handle Email/Password Auth
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                submitBtn.disabled = true;
                submitBtn.innerText = "Processing...";
                errorMsg.style.display = 'none';

                if(isLogin) {
                    // Log in existing user
                    await auth.signInWithEmailAndPassword(email, password);
                    // The onAuthStateChanged listener will handle the redirect based on role
                } else {
                    // Create new user
                    const name = document.getElementById('name').value;
                    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                    const user = userCredential.user;
                    
                    // Save user role and data to Firestore
                    await db.collection("users").doc(user.uid).set({
                        name: name,
                        email: email,
                        role: "customer",
                        createdAt: new Date().toISOString()
                    });
                    
                    // The onAuthStateChanged listener will handle the redirect
                }
            } catch (error) {
                errorMsg.innerText = error.message;
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerText = isLogin ? "Authenticate" : "Create Account";
            }
        });
    }

    if(googleBtn) {
        // Handle Google Auth
        googleBtn.addEventListener('click', async () => {
            try {
                const result = await auth.signInWithPopup(googleProvider);
                const user = result.user;
                
                // Check if user exists in Firestore, if not create them
                const userDoc = await db.collection("users").doc(user.uid).get();
                if (!userDoc.exists) {
                    await db.collection("users").doc(user.uid).set({
                        name: user.displayName,
                        email: user.email,
                        role: "customer",
                        createdAt: new Date().toISOString()
                    });
                }
                // The onAuthStateChanged listener will handle the redirect
            } catch (error) {
                errorMsg.innerText = error.message;
                errorMsg.style.display = 'block';
            }
        });
    }
});
