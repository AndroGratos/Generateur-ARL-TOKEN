import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "BUCKET",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Gestion de l'état de connexion
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'index.html'; // Redirection vers la page principale si connecté
    }
});

// Fonction de création de compte
document.getElementById('registerButton').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Compte créé avec succès !");
            window.location.href = 'index.html'; // Redirection vers la page principale après création de compte
        })
        .catch((error) => {
            console.error('Erreur de création de compte:', error.message);
        });
});

// Fonction de connexion
document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = 'index.html'; // Redirection vers la page principale après connexion
        })
        .catch((error) => {
            console.error('Erreur de connexion:', error.message);
        });
});

// Fonction de déconnexion
document.getElementById('logoutButton')?.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html'; // Redirection vers la page de connexion après déconnexion
        })
        .catch((error) => {
            console.error('Erreur de déconnexion:', error.message);
        });
});
