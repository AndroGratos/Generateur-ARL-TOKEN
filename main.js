import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";



import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";





let codes = []; // Stockera les codes récupérés depuis Firestore



document.getElementById('generateButton')?.addEventListener('click', generateCode);

document.getElementById('copyButton')?.addEventListener('click', copyCode);

document.getElementById('errorButton')?.addEventListener('click', showError);

document.getElementById('emailButton')?.addEventListener('click', sendEmail);



document.getElementById('countdown').style.display = 'none'; // Masquer au début



async function loadCodes() {

    const firestore = getFirestore();

    const codesCollectionRef = collection(firestore, 'codes');

    const querySnapshot = await getDocs(codesCollectionRef);



    codes = querySnapshot.docs.map(doc => doc.id); // Extraire les IDs des documents comme codes

}



async function generateCode() {

    await loadCodes(); // Charger les codes avant de générer un code



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



    let { clickLeft, resetTime } = userSnap.data();

    const now = Date.now();



    // L'utilisateur est bloqué

    if (clickLeft <= 0 && resetTime && now < resetTime) {

        const remainingTime = Math.ceil((resetTime - now) / (1000 * 60)); // Temps restant en minutes

        const hours = Math.floor(remainingTime / 60);

        const minutes = remainingTime % 60;



        // Afficher la notification

        alert(`Vous devez attendre encore ${hours} heure(s) et ${minutes} minute(s) avant de pouvoir générer un nouveau code.`);



        // Afficher le décompte après la notification

        document.getElementById('countdown').style.display = 'block'; // Afficher le texte



        // Mettre à jour l'affichage du compte à rebours

        updateCountdownDisplay(Math.ceil((resetTime - now) / 1000));

        return;

    }



    if (clickLeft <= 0) {

        clickLeft = 5;

        resetTime = now + 5 * 60 * 60 * 1000; // Réinitialiser le temps après 5 heures

    }



    if (codes.length === 0) {

        alert("Aucun code disponible pour générer.");

        return;

    }



    const randomIndex = Math.floor(Math.random() * codes.length);

    const code = codes[randomIndex];

    document.getElementById('code').textContent = code;

    document.getElementById('copyButton').style.display = 'inline-block';

    document.getElementById('errorButton').style.display = 'inline-block';



    // Mettre à jour le compteur de clics et le temps de réinitialisation

    await updateDoc(userDocRef, {

        clickLeft: clickLeft - 1,

        resetTime: resetTime

    });



    // Si le temps de réinitialisation est dans le futur, commencer le décompte

    if (resetTime > now) {

        updateCountdownDisplay(Math.ceil((resetTime - now) / 1000));

    }

}



function copyCode() {

    const code = document.getElementById('code').textContent;

    navigator.clipboard.writeText(code).then(() => {

        document.getElementById('notification').style.display = 'block';

        setTimeout(() => {

            document.getElementById('notification').style.display = 'none';

        }, 2000);

    }).catch((error) => {

        console.error('Erreur lors de la copie:', error);

    });

}



function showError() {

    document.getElementById('error').style.display = 'block';

    document.getElementById('copyButton').style.display = 'none';

    document.getElementById('errorButton').style.display = 'none';

}



function sendEmail() {

    const code = document.getElementById('code').textContent;

    const emailAddress = "generateurarltoken@gmail.com"; // Remplacez par votre adresse email

    const subject = "Code Erroné Signalé";

    const body = `Bonjour,\n\nLe code suivant a été signalé comme erroné :\n${code}\n\nMerci de le vérifier.`;



    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

}



function updateCountdownDisplay(remainingSeconds) {

    const countdownElement = document.getElementById('countdown');



    // Mettre à jour le compte à rebours toutes les secondes

    const interval = setInterval(() => {

        if (remainingSeconds <= 0) {

            clearInterval(interval);

            countdownElement.textContent = ''; // Vider le texte une fois le temps écoulé

            document.getElementById('countdown').style.display = 'none'; // Masquer l'élément

        } else {

            const hours = Math.floor(remainingSeconds / 3600);

            const minutes = Math.floor((remainingSeconds % 3600) / 60);

            const seconds = remainingSeconds % 60;



            countdownElement.textContent = `Temps restant: ${hours}h ${minutes}m ${seconds}s`;



            remainingSeconds--;

        }

    }, 1000);

}
