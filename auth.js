import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Fonction de création de compte
document.getElementById('signupButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('signupIdentifier').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Envoi de l'e-mail de vérification
        await sendEmailVerification(user);
        alert("Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte de réception.");

        // Sauvegarde des infos utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
            identifier: identifier,
            email: email,
            role: "user",
            clickLeft: 5,
            resetTime: null
        });

        // Redirection vers la page de connexion après l'inscription
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erreur de création de compte:', error.message);
        alert('Création de compte échouée: ' + error.message);
    }
});

// Fonction de connexion
document.getElementById('loginButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    try {
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('identifier', '==', identifier));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            throw new Error('Identifiant incorrect.');
        }

        const userDoc = userSnapshot.docs[0].data();
        const email = userDoc.email;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Vérifie si l'email est vérifié
        if (user.emailVerified) {
            window.location.href = 'index.html';
        } else {
            alert("Veuillez vérifier votre adresse e-mail pour vous connecter.");
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erreur de connexion:', error.message);
        alert('Connexion échouée: ' + error.message);
    }
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

// Fonction de réinitialisation du mot de passe
document.getElementById('resetButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;

    try {
        await sendPasswordResetEmail(auth, email);
        alert('Email de réinitialisation envoyé !');
    } catch (error) {
        console.error('Erreur d\'envoi de l\'email de réinitialisation:', error.message);
        alert('Erreur d\'envoi de l\'email de réinitialisation: ' + error.message);
    }
});

// Fonction pour afficher ou cacher le mot de passe (connexion)
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePasswordIcon.textContent = '🐵'; // Changer l'icône
    } else {
        passwordField.type = 'password';
        togglePasswordIcon.textContent = '🙈'; // Revenir à l'icône de départ
    }
}

// Fonction pour afficher ou cacher le mot de passe (création de compte)
function toggleSignupPasswordVisibility() {
    const passwordField = document.getElementById('signupPassword');
    const togglePasswordIcon = document.getElementById('toggleSignupPassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePasswordIcon.textContent = '🐵'; // Changer l'icône
    } else {
        passwordField.type = 'password';
        togglePasswordIcon.textContent = '🙈'; // Revenir à l'icône de départ
    }
}

// Écouteurs pour les événements de clic sur les icônes
document.getElementById('togglePassword')?.addEventListener('click', togglePasswordVisibility);
document.getElementById('toggleSignupPassword')?.addEventListener('click', toggleSignupPasswordVisibility);

// Vérification de l'état de connexion pour gérer les redirections
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            const isEmailVerified = user.emailVerified;

            // Contrôle d'accès pour index.html
            if (window.location.pathname === '/index.html') {
                if (!isEmailVerified) {
                    // Redirection vers la page de connexion si l'email n'est pas vérifié
                    window.location.href = 'login.html';
                }
            
