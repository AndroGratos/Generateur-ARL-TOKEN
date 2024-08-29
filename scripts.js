const codes = [
    'b237ae95d1e0c40b96077f5f18ce5b9ec3bfb249f45174d483c2b93aa03ac28933974b916e3e672d3a1f5861751590a5ece1304d773f98618c50da1a2a257cafa55a76dca10c62bedeebc35b79c3adfc387cd56bb6b387b2de1e367c0b253c1f',
    'c4de4d2e125541bb71d85ce0542843973bc6e080ef94ffe96612eb2337df1805338a2f6f452920ea16fbe01f507c4ad64c917481dca15638ff96d3c8911d4eb1208169a5c0a8dd631699fa19798e5030d338d6ebcb4db765537d053689d173f1',
    '0ed12f74302dafdba1ae8bc54dd32c196853eea11f002059725213c9cdfa3854e5f77862c6a9a0b431032be9cf05f36f72729ed58548014dc8416a7a0fe5935382444804ed71b2fbc2e09904da00e8a035d7d18853a2f63af3b844fde4e1c4c0',
    '67d195e4e4df8b5fe4c8f0f790cad84e69734479a2945c8d855598e241c1949991778142b36ad9a7941ed8794445a3d9f51489964581813b2d11cdb956bf26815bb758fdd7f7c17323781dea2350037175af4361c42f66102bf901042c17455d',
    '50e5cd98672415e0293312fb376fef604e6c6009fe374b7b544ab367b90f0529b36056838ac03d723d92bcd0ce461d84f000f05aa3fc864fbb025f090ae58ca1dbef4161a586bba65ba81caedb8a14864875c80a59892a91d6cd9be8ad0eb6ad',
    '8bc66d0ceeb0f6cad2c52f89cd4223caeca6962719d4e0813e8e2213b46c831d94f8167cb84f78343258a3a402894c4bc9b1244ecd1e16d82c36f145ea7f16ed8151f1ab6c6121e2b2c9490cd51c1f00f56a45ecdf21a116a2c2172ea2bb8532',
    'e6ac45bf958860c2f2232f81f550077721bac85172b5312625f0f8a625b6a43dc41b10bd93a6655cb2e2f7165440169f3e3f0dac79a0e5369f2da8d4b900748827878621eda4e8064d4db7fcd48e1ea978e6c618fde4d09e728fd3357180467c',
    '84ca750c5f1bc2a5c7eaaad8266a25b4932cfc3a7f86703039709531b05a6f6888e9e549974d750628b55ea4f34790d12e41bd958e71d529255f09bfce031b8f582d0b5e75bf860a45a22f5500eea9ef91b02b0d43b86b91f22d1876a6658edb'
];

let clickCount = 0;
const maxClicksBeforeBlock = 5;
const adDisplayCounts = [1, 3]; // Afficher des annonces au 1er et 3ème clic
const adSlotId = "8318450749";

// Fonction pour afficher une annonce
function showAd() {
    const adContainer = document.getElementById('adContainer');
    adContainer.innerHTML = `
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-3822521115846697"
            data-ad-slot="${adSlotId}"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
}

// Fonction pour générer un code
function generateCode() {
    clickCount++;
    const randomIndex = Math.floor(Math.random() * codes.length);
    const code = codes[randomIndex];
    document.getElementById('code').textContent = code;
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('errorButton').style.display = 'inline-block';

    if (adDisplayCounts.includes(clickCount)) {
        showAd();
    }

    if (clickCount >= maxClicksBeforeBlock) {
        const currentDate = new Date();
        const blockedUntil = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        localStorage.setItem('blockedUntil', blockedUntil);
        document.getElementById('countdown').style.display = 'block';
        updateCountdown();
        document.getElementById('code').textContent = 'Vous avez atteint la limite de clics. Veuillez réessayer plus tard.';
        document.getElementById('copyButton').style.display = 'none';
        document.getElementById('errorButton').style.display = 'none';
    }
}

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    const countdownTimer = document.getElementById('countdownTimer');
    const blockedUntil = new Date(localStorage.getItem('blockedUntil'));
    const interval = setInterval(() => {
        const now = new Date();
        const remainingTime = blockedUntil - now;
        if (remainingTime <= 0) {
            clearInterval(interval);
            document.getElementById('countdown').style.display = 'none';
            localStorage.removeItem('blockedUntil');
            clickCount = 0; // Réinitialiser le compteur après le blocage
        } else {
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            countdownTimer.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Fonction pour copier le code
function copyCode() {
    const codeElement = document.getElementById('code');
    const code = codeElement.textContent;
    navigator.clipboard.writeText(code).then(() => {
        document.getElementById('notification').style.display = 'block';
        setTimeout(() => document.getElementById('notification').style.display = 'none', 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie du code :', err);
    });
}

// Fonction pour signaler une erreur
function reportError() {
    const code = document.getElementById('code').textContent;
    if (code && code !== 'Cliquez sur le bouton pour générer un code.') {
        const telegramUrl = `https://t.me/androgratos?text=Code%20erroné:%20${encodeURIComponent(code)}`;
        document.getElementById('error').style.display = 'block';
        let countdown = 10;
        const countdownElem = document.getElementById('errorCountdown');
        const interval = setInterval(() => {
            countdownElem.textContent = `${countdown}s`;
            countdown--;

            if (countdown < 0) {
                clearInterval(interval);
                window.open(telegramUrl, '_blank');
                document.getElementById('error').style.display = 'none';
                clickCount = 0; // Réinitialiser le compteur après l'erreur
            }
        }, 1000);

        document.getElementById('openTelegram').onclick = () => {
            clearInterval(interval);
            window.open(telegramUrl, '_blank');
            document.getElementById('error').style.display = 'none';
            clickCount = 0; // Réinitialiser le compteur après l'erreur
        };
    }
}

// Événements
document.getElementById('generateButton').addEventListener('click', generateCode);
document.getElementById('copyButton').addEventListener('click', copyCode);
document.getElementById('errorButton').addEventListener('click', reportError);

// Vérifier si l'utilisateur est bloqué
document.addEventListener('DOMContentLoaded', () => {
    const blockedUntil = localStorage.getItem('blockedUntil');
    if (blockedUntil) {
        const currentDate = new Date();
        const blockedDate = new Date(blockedUntil);
        if (currentDate < blockedDate) {
            document.getElementById('countdown').style.display = 'block';
            updateCountdown();
        } else {
            localStorage.removeItem('blockedUntil');
        }
    }
});
