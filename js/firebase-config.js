// Your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzDxZFJYI7ZQQrPAveyySugGEHmruZKrs",
    authDomain: "msmegrowth-9d35d.firebaseapp.com",
    projectId: "msmegrowth-9d35d",
    storageBucket: "msmegrowth-9d35d.firebasestorage.app",
    messagingSenderId: "107316785547",
    appId: "1:107316785547:web:057e0687937b4a830a3f8e",
    measurementId: "G-22MZ1YDGSF"
};

// Initialize Firebase using the Compat libraries
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
