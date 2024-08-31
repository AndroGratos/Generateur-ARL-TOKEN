import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2MzAcFOGELXdRwdK-C1Mczm2quyV-HZs",
    authDomain: "generateurtoken-e282f.firebaseapp.com",
    projectId: "generateurtoken-e282f",
    storageBucket: "generateurtoken-e282f.appspot.com",
    messagingSenderId: "485438236563",
    appId: "1:485438236563:web:a587b79c5d4bb26edeea66"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Vérification de l'état de connexion
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'index.html';
    } else {
        if (window.location.pathname.includes('index.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Fonction de connexion
document.getElementById('loginButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erreur de connexion:', error.message);
            alert('Connexion échouée: ' + error.message);
        });
});

// Fonction de création de compte
document.getElementById('signupButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erreur de création de compte:', error.message);
            alert('Création de compte échouée: ' + error.message);
        });
});

// Fonction de déconnexion
document.getElementById('logoutButton')?.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Erreur de déconnexion:', error.message);
        });
});
