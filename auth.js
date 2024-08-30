import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

// Vérifier l'état de connexion
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData.role === "administrateur") {
                document.getElementById('adminContent').style.display = 'block';
                document.getElementById('userContent').style.display = 'none';
            } else {
                document.getElementById('userContent').style.display = 'block';
                document.getElementById('adminContent').style.display = 'none';
            }
        }
    } else {
        document.getElementById('loginPage').style.display = 'block';
    }
});

// Connexion
document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie, redirection vers la page principale
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erreur de connexion:', error.message);
            document.getElementById('loginError').textContent = 'Erreur de connexion : ' + error.message;
        });
});

// Création de compte
document.getElementById('signUpButton').addEventListener('click', () => {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Création réussie, définir le rôle de l'utilisateur dans Firestore
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), { role: "utilisateur" });
            // Redirection vers la page principale
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erreur lors de la création du compte:', error.message);
            document.getElementById('loginError').textContent = 'Erreur lors de la création du compte : ' + error.message;
        });
});

// Déconnexion
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // Déconnexion réussie, redirection vers la page de connexion
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Erreur de déconnexion:', error.message);
        });
});

// Afficher / cacher les formulaires de connexion et de création de compte
document.getElementById('showSignUp').addEventListener('click', () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signUpPage').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('signUpPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
});
