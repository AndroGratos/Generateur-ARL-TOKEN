import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let codes = [];
let clickCount = 3; // Compteur initial pour le nombre de codes générés

// Vérification de l'état du compteur à chaque chargement de la page
if (localStorage.getItem('clickCount')) {
    clickCount = parseInt(localStorage.getItem('clickCount')); // Réinitialise le compteur à partir du localStorage
} else {
    localStorage.setItem('clickCount', clickCount); // Définit la valeur initiale
}

// Gestion des événements des boutons
document.getElementById('generateButton')?.addEventListener('click', async () => {
    const userCanGenerate = await checkUserStatus();
    if (!userCanGenerate) return;

    await loadCodes();
    
    const randomIndex = Math.floor(Math.random() * codes.length);
    const code = codes[randomIndex];

    document.getElementById('code').textContent = code;
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('errorButton').style.display = 'inline-block';
    
    clickCount--; // Décrémente le compteur de codes générés
    localStorage.setItem('clickCount', clickCount); // Met à jour le localStorage
});

document.getElementById('copyButton')?.addEventListener('click', copyCode);
document.getElementById('errorButton')?.addEventListener('click', showError);
document.getElementById('emailButton')?.addEventListener('click', sendEmail);
document.getElementById('settingsButton')?.addEventListener('click', openSettings);
document.getElementById('saveButton')?.addEventListener('click', saveSettings);
document.getElementById('countdown').style.display = 'none';

// Chargement des codes depuis Firestore
async function loadCodes() {
    const firestore = getFirestore();
    const codesCollectionRef = collection(firestore, 'codes');
    const querySnapshot = await getDocs(codesCollectionRef);
    codes = querySnapshot.docs.map(doc => doc.id);
}

// Vérification de l'état de l'utilisateur
async function checkUserStatus() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert("Vous devez être connecté pour accéder à cette page.");
        window.location.href = 'login.html'; // Redirige vers une page de connexion
        return false;
    }

    // Vérifie si l'utilisateur a atteint la limite de génération de codes
    if (clickCount <= 0) {
        window.location.href = 'publicite.html'; // Redirection vers la page de publicité uniquement si clickCount est à 0
        return false;
    }
    return true;
}

function copyCode() {
    const code = document.getElementById('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        document.getElementById('notification').style.display = 'block';
        setTimeout(() => document.getElementById('notification').style.display = 'none', 2000);
    }).catch(error => console.error('Erreur lors de la copie:', error));
}

function showError() {
    document.getElementById('error').style.display = 'block';
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('errorButton').style.display = 'none';
}

function sendEmail() {
    const code = document.getElementById('code').textContent;
    const emailAddress = "generateurarltoken@gmail.com";
    const subject = "Code Erroné Signalé";
    const body = `Bonjour,\n\nLe code suivant a été signalé comme erroné :\n${code}\n\nMerci de le vérifier.`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openSettings() {
    document.getElementById('settingsModal').style.display = 'block';
}

function saveSettings() {
    // Fonctionnalité pour enregistrer les paramètres
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('settingsModal').style.display = 'none';
});
