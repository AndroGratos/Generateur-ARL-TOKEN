import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';

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

export function handleSignOut() {
    signOut(auth).then(() => {
        window.location.href = 'login.html'; // Redirection vers la page de connexion
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion :', error.message);
    });
}

export function checkUserStatus() {
    const user = auth.currentUser;
    if (user) {
        window.location.href = 'index.html'; // Redirection si déjà connecté
    }
}
