import codes from './codes.json'; // Assurez-vous que le fichier JSON est à la racine du projet

document.getElementById('generateButton')?.addEventListener('click', generateCode);
document.getElementById('copyButton')?.addEventListener('click', copyCode);
document.getElementById('errorButton')?.addEventListener('click', showError);
document.getElementById('telegramButton')?.addEventListener('click', () => {
    window.location.href = "https://t.me/androgratos"; // Remplacer par l'URL de redirection
});

function generateCode() {
    const randomIndex = Math.floor(Math.random() * codes.length);
    const code = codes[randomIndex];
    document.getElementById('code').textContent = code;
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('errorButton').style.display = 'inline-block';
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
