import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

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

document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData.role === "administrateur") {
                document.getElementById('adminContent').style.display = 'block';
                document.getElementById('loginPage').style.display = 'none';
            } else {
                document.getElementById('userContent').style.display = 'block';
                document.getElementById('loginPage').style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Erreur de connexion:', error.message);
        document.getElementById('loginError').style.display = 'block';
    }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        await signOut(auth);
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('adminContent').style.display = 'none';
        document.getElementById('userContent').style.display = 'none';
    } catch (error) {
        console.error('Erreur de déconnexion:', error.message);
    }
});
