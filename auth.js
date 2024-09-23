import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyD2MzAcFOGELXdRwdK-C1Mczm2quyV-HZs",
    authDomain: "generateurtoken-e282f.firebaseapp.com",
    projectId: "generateurtoken-e282f",
    storageBucket: "generateurtoken-e282f.appspot.com",
    messagingSenderId: "485438236563",
    appId: "1:485438236563:web:a587b79c5d4bb26edeea66"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


document.getElementById('signupButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('signupIdentifier').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        
        await sendEmailVerification(user);
        alert("Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte de réception.");

        
        await setDoc(doc(db, "users", user.uid), {
            identifier: identifier,
            email: email,
            role: "user",
            clickLeft: 5,
            resetTime: null
        });

        
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erreur de création de compte:', error.message);
        alert('Création de compte échouée: ' + error.message);
    }
});


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


document.getElementById('logoutButton')?.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Erreur de déconnexion:', error.message);
        });
});


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


document.getElementById('togglePassword')?.addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash'); 
    } else {
        passwordField.type = 'password';
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye'); 
    }
});

document.getElementById('toggleSignupPassword')?.addEventListener('click', () => {
    const signupPasswordField = document.getElementById('signupPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    if (signupPasswordField.type === 'password') {
        signupPasswordField.type = 'text';
        toggleSignupPassword.classList.remove('fa-eye');
        toggleSignupPassword.classList.add('fa-eye-slash'); 
    } else {
        signupPasswordField.type = 'password';
        toggleSignupPassword.classList.remove('fa-eye-slash');
        toggleSignupPassword.classList.add('fa-eye'); 
    }
});


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            const isEmailVerified = user.emailVerified;

            
            if (window.location.pathname === '/index.html') {
                if (!isEmailVerified) {
                    window.location.href = 'login.html';
                }
            } else if (window.location.pathname === '/login.html' || window.location.pathname === '/signup.html' || window.location.pathname === '/password-reset.html') {
                if (isEmailVerified) {
                    window.location.href = 'index.html';
                }
            }
        }
    } else {
        if (window.location.pathname === '/index.html') {
            window.location.href = 'login.html';
        }
    }
});
