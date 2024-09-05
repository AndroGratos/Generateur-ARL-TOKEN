import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Vérification de l'état de connexion
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            const data = userSnap.data();
            if (window.location.pathname === '/login.html' || window.location.pathname === '/signup.html') {
                window.location.href = 'index.html';
            }
        }
    } else {
        if (window.location.pathname === '/index.html') {
            window.location.href = 'login.html';
        }
    }
});

// Fonction de connexion
document.getElementById('loginButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    try {
        // Trouver l'utilisateur par identifiant
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('identifier', '==', identifier));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            throw new Error('Identifiant incorrect.');
        }

        const userDoc = userSnapshot.docs[0].data();
        const email = userDoc.email; // Obtenir l'email à partir des données utilisateur

        // Connexion avec l'email et le mot de passe
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erreur de connexion:', error.message);
        alert('Connexion échouée: ' + error.message);
    }
});

// Fonction de création de compte
document.getElementById('signupButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('signupIdentifier').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ajouter l'utilisateur à la collection "users" avec les paramètres clickLeft et resetTime
        await setDoc(doc(db, "users", user.uid), {
            identifier: identifier,   // Ajouter l'identifiant
            email: email,
            role: "user",
            clickLeft: 5,          // Nombre de clics restants
            resetTime: null        // Temps de réinitialisation
        });

        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erreur de création de compte:', error.message);
        alert('Création de compte échouée: ' + error.message);
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
