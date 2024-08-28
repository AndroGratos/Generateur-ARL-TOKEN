const codes = [
    'b237ae95d1e0c40b96077f5f18ce5b9ec3bfb249f45174d483c2b93aa03ac28933974b916e3e672d3a1f5861751590a5ece1304d773f98618c50da1a2a257cafa55a76dca10c62bedeebc35b79c3adfc387cd56bb6b387b2de1e367c0b253c1f',
    'c4de4d2e125541bb71d85ce0542843973bc6e080ef94ffe96612eb2337df1805338a2f6f452920ea16fbe01f507c4ad64c917481dca15638ff96d3c8911d4eb1208169a5c0a8dd631699fa19798e5030d338d6ebcb4db765537d053689d173f1',
    '0ed12f74302dafdba1ae8bc54dd32c196853eea11f002059725213c9cdfa3854e5f77862c6a9a0b431032be9cf05f36f72729ed58548014dc8416a7a0fe5935382444804ed71b2fbc2e09904da00e8a035d7d18853a2f63af3b844fde4e1c4c0',
    '67d195e4e4df8b5fe4c8f0f790cad84e69734479a2945c8d855598e241c1949991778142b36ad9a7941ed8794445a3d9f51489964581813b2d11cdb956bf26815bb758fdd7f7c17323781dea2350037175af4361c42f66102bf901042c17455d',
    '50e5cd98672415e0293312fb376fef604e6c6009fe374b7b544ab367b90f0529b36056838ac03d723d92bcd0ce461d84f000f05aa3fc864fbb025f090ae58ca1dbef4161a586bba65ba81caedb8a14864875c80a59892a91d6cd9be8ad0eb6ad',
    '8bc66d0ceeb0f6cad2c52f89cd4223caeca6962719d4e0813e8e2213b46c831d94f8167cb84f78343258a3a402894c4bc9b1244ecd1e16d82c36f145ea7f16ed8151f1ab6c6121e2b2c9490cd51c1f00f56a45ecdf21a116a2c2172ea2bb8532',
    'e6ac45bf958860c2f2232f81f550077721bac85172b5312625f0f8a625b6a43dc41b10bd93a6655cb2e2f7165440169f3e3f0dac79a0e5369f2da8d4b900748827878621eda4e8064d4db7fcd48e1ea978e6c618fde4d09e728fd3357180467c',
    'f5b021c7a2b7b9c2d48cdd58d4f2d8f7586e007e3e1eec544a756b5c4e6b0d2dbef2e3d244ec5193784e5c78c5897d05c6d84c032b527a5c64b83f3a0ef0d287227e6a4c3d7d0eb306d085c9d59f727ba914897a1a20e06d13a84d97f5b45a38',
    '1dbd3943c067c989b807a9167e02135b4c50c843de8f28b4cb9f08c04d64f0669e4db06802dbda2a2727e6821a46c07e220b5e7546c9f766e7b7954cb6e425407fd280c3ea8bb0404ab42b6b6dca0fa473dc7e84f8fd868f7a05a34dd1a5f4f4b7',
    '4d67a03558965b6c4e5a33507e8e98fef1c9a83525e9fbb09a227bba47c5183b4ad58444b4a0d5ed782ab8f48f929f5d8276c0dd15c7baf4accc1fd1867c075d7349b1796720a6d02d94f378572013c754373dd96d7047ef9d7f5e7b24c74bfc3b'
];

let clickCount = 0;
const adInterval = 2; // Afficher une pub tous les 2 clics
const blockClicksAfter = 5; // Bloquer après 5 clics
const blockDuration = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

function generateCode() {
    clickCount++;
    const randomIndex = Math.floor(Math.random() * codes.length);
    const code = codes[randomIndex];
    
    document.getElementById('code').textContent = code;
    document.getElementById('code').style.display = 'block';
    document.getElementById('copyButton').style.display = 'inline-block';

    if (clickCount % adInterval === 1) { // Affiche une pub sur le 1er clic, le 3ème clic, etc.
        document.getElementById('ad').style.display = 'block';
    } else {
        document.getElementById('ad').style.display = 'none';
    }

    if (clickCount >= blockClicksAfter) {
        const lastClickTime = localStorage.getItem('lastClickTime');
        if (lastClickTime && (Date.now() - lastClickTime < blockDuration)) {
            document.getElementById('code').textContent = "Vous avez atteint le nombre de clics autorisé. Veuillez revenir dans 24 heures.";
            document.getElementById('code').style.display = 'block';
            document.getElementById('generateButton').disabled = true;
            return;
        } else {
            localStorage.setItem('lastClickTime', Date.now());
            clickCount = 0; // Réinitialise le compteur de clics après le blocage
        }
    }
}

document.getElementById('generateButton').addEventListener('click', generateCode);

document.getElementById('copyButton').addEventListener('click', function() {
    const codeText = document.getElementById('code').textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        document.getElementById('notification').style.display = 'block';
        setTimeout(() => {
            document.getElementById('notification').style.display = 'none';
        }, 2000);
    });
});
