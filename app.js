// Configurazione Login
function checkLogin() {
    const pass = document.getElementById('login-pass').value;
    if(pass === 'frcolor') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        alert("Accesso negato.");
    }
}

// Spettrometro Irina
async function openSection(section) {
    if(section === 'irina') {
        document.getElementById('modal-irina').style.display = 'flex';
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment", width: { ideal: 3840 }, height: { ideal: 2160 } } 
            });
            document.getElementById('video').srcObject = stream;
        } catch (err) {
            alert("Errore fotocamera: " + err);
        }
    }
}

function captureColor() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const pixel = ctx.getImageData(canvas.width/2, canvas.height/2, 1, 1).data;
    const rgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
    const hex = "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);

    // Simulazione Algoritmo RAL (In attesa del tuo ZIP per il DB completo)
    let results = `
        <strong>ANALISI CROMATICA:</strong><br>
        Codice HEX: ${hex.toUpperCase()}<br><br>
        1. RAL 7016 (Match 98%)<br>
        2. RAL 7021 (Match 86%)<br>
        3. RAL 7015 (Match 74%)
    `;
    
    document.getElementById('color-preview').style.backgroundColor = hex;
    document.getElementById('color-results').innerHTML = results;
}

function closeModal() {
    const stream = document.getElementById('video').srcObject;
    if(stream) stream.getTracks().forEach(track => track.stop());
    document.getElementById('modal-irina').style.display = 'none';
}

function askAI(tipo) {
    const name = tipo === 'irina' ? "Irina (Gemini)" : "Carla (ChatGPT)";
    alert("Collegamento a " + name + " in corso...");
}
