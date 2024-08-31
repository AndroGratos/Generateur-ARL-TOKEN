import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const firestore = getFirestore(app);

// Vérification de l'état de connexion
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('welcomeMessage').textContent = 'Bienvenue, ' + user.email;
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('signupPage').style.display = 'none';
    } else {
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('signupPage').style.display = 'none';
    }
});

// Connexion
document.getElementById('loginButton')?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error('Erreur de connexion:', error.message);
        });
});

// Création de compte
document.getElementById('signupButton')?.addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error('Erreur de création de compte:', error.message);
        });
});

// Déconnexion
document.getElementById('logoutButton')?.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html'; // Redirection vers la page de connexion
        })
        .catch((error) => {
            console.error('Erreur de déconnexion:', error.message);
        });
});
