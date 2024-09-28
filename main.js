import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let codes = [];

document.getElementById('generateButton')?.addEventListener('click', generateCode);
document.getElementById('copyButton')?.addEventListener('click', copyCode);
document.getElementById('errorButton')?.addEventListener('click', showError);
document.getElementById('emailButton')?.addEventListener('click', sendEmail);
document.getElementById('settingsButton')?.addEventListener('click', openSettings);
document.getElementById('saveButton')?.addEventListener('click', saveSettings);
document.getElementById('countdown').style.display = 'none';

// Nouveau gestionnaire pour le texte cliquable
document.getElementById('toggleColorSettings')?.addEventListener('click', toggleColorSettings);

async function loadCodes() {
    const firestore = getFirestore();
    const codesCollectionRef = collection(firestore, 'codes');
    const querySnapshot = await getDocs(codesCollectionRef);
    codes = querySnapshot.docs.map(doc => doc.id);
}

async function generateCode() {
    await loadCodes();
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (!user) {
        alert("Vous devez être connecté pour générer un code.");
        return;
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
        alert("Utilisateur non trouvé.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * codes.length);
    const code = codes[randomIndex];

    document.getElementById('code').textContent = code;
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('errorButton').style.display = 'inline-block';

    // On n'a plus besoin de mettre à jour clickLeft et resetTime
    // Si tu veux garder la logique de clickLeft et resetTime, fais-le ici.
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

function updateCountdownDisplay(remainingSeconds) {
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(interval);
            countdownElement.textContent = '';
            countdownElement.style.display = 'none';
        } else {
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;
            countdownElement.textContent = `Temps restant: ${hours}h ${minutes}m ${seconds}s`;
            remainingSeconds--;
        }
    }, 1000);
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
