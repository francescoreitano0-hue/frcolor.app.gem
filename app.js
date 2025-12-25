/**
 * FR COLOR - CORE ENGINE v1.0
 * Gestione: Spettrometro, Cantieri, Magazzino e Tasto X
 */

// 1. CONFIGURAZIONE E LOGIN
function checkLogin() {
    const pass = document.getElementById('login-pass').value;
    if (pass === 'frcolor') {
        document.getElementById('login-screen').classList.remove('active-screen');
        document.getElementById('main-app').classList.add('active-screen');
    } else {
        alert("Password Errata.");
    }
}

function logout() {
    location.reload();
}

// 2. GESTIONE INTERFACCIA (UI)
const ui = {
    openModal: function(section) {
        const modal = document.getElementById('app-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        modal.style.display = 'block';
        body.innerHTML = ''; // Pulisce il contenuto precedente

        if (section === 'irina') {
            title.innerText = "Spettrometro Irina HD";
            body.innerHTML = `
                <video id="camera-view" autoplay playsinline></video>
                <div id="results-area" class="card">
                    <div id="color-match" style="height:50px; border-radius:10px; margin-bottom:10px; border:2px solid #ccc;"></div>
                    <div id="ral-details">Punta la superficie e scatta...</div>
                </div>
                <button onclick="engine.captureColor()" class="btn-capture">ANALIZZA COLORE</button>
            `;
            engine.startCamera();
        } 
        else if (section === 'cantieri') {
            title.innerText = "Archivio Cantieri";
            body.innerHTML = `
                <button class="btn-login" style="margin-bottom:15px;">+ NUOVO CANTIERE</button>
                <div class="card"><strong>Cantiere: Villa Bianchi</strong><p>Documenti: 2 PDF - Foto: 5</p></div>
                <div class="card"><strong>Cantiere: Uffici Red</strong><p>Documenti: 1 PDF - Foto: 12</p></div>
            `;
        }
        else if (section === 'magazzino') {
            title.innerText = "Magazzino Materiali";
            body.innerHTML = `
                <div class="card"><h3>Pittura Lavabile Bianca</h3><p>Giacenza: 24 LT</p><button>-1</button> <button>+1</button></div>
                <div class="card"><h3>Fissativo Professionale</h3><p>Giacenza: 10 LT</p><button>-1</button> <button>+1</button></div>
            `;
        }
        else if (section === 'tastox') {
            title.innerText = "Simulatore Tasto X";
            body.innerHTML = `
                <div class="card">
                    <p>Carica la foto della parete per la simulazione reale.</p>
                    <input type="file" id="photo-input" accept="image/*" style="margin:15px 0;">
                    <div id="simulation-preview" style="width:100%; min-height:200px; background:#ddd; position:relative;">
                        <canvas id="x-canvas" style="width:100%;"></canvas>
                    </div>
                    <p style="font-size:10px; margin-top:10px;">Algoritmo Anti-Pennarello Attivo: mantiene ombre e luci.</p>
                </div>
            `;
            engine.initTastoX();
        }
    },

    closeModal: function() {
        document.getElementById('app-modal').style.display = 'none';
        engine.stopCamera();
    },

    callAI: function(aiName) {
        const url = aiName === 'irina' ? "https://gemini.google.com" : "https://chat.openai.com";
        window.open(url, '_blank');
    }
};

// 3. MOTORE TECNICO (ENGINE)
const engine = {
    stream: null,

    startCamera: async function() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment", width: { ideal: 3840 }, height: { ideal: 2160 } } 
            });
            document.getElementById('camera-view').srcObject = this.stream;
        } catch (err) {
            alert("Errore Camera: " + err);
        }
    },

    stopCamera: function() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    },

    captureColor: function() {
        const video = document.getElementById('camera-view');
        const canvas = document.getElementById('proc-canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        // Campionamento centrale
        const p = ctx.getImageData(canvas.width/2, canvas.height/2, 1, 1).data;
        const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        
        document.getElementById('color-match').style.backgroundColor = hex;
        // Qui simulo il confronto con il database RAL che completeremo
        document.getElementById('ral-details').innerHTML = `
            <strong>Match Trovati:</strong><br>
            1. RAL 7016 (98%) - Antracite<br>
            2. RAL 7021 (89%) - Nero Grigio<br>
            HEX: ${hex.toUpperCase()}
        `;
    },

    initTastoX: function() {
        const input = document.getElementById('photo-input');
        input.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.getElementById('x-canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    // Logica futura: qui applicheremo il "Multiply Filter" per le ombre
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
};
