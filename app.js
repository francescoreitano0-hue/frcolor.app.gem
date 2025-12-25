// DATABASE RAL INTEGRATO (I più comuni nel settore verniciatura)
const RAL_DB = [
    {ral: "9010", r: 241, g: 240, b: 234, n: "Bianco Puro"},
    {ral: "9005", r: 14, g: 14, b: 16, n: "Nero Profondo"},
    {ral: "7016", r: 56, g: 62, b: 66, n: "Grigio Antracite"},
    {ral: "1013", r: 227, g: 217, b: 198, n: "Bianco Perla"},
    {ral: "7035", r: 197, g: 199, b: 196, n: "Grigio Luce"},
    {ral: "9003", r: 236, g: 236, b: 231, n: "Bianco Segnale"},
    {ral: "1015", r: 230, g: 210, b: 181, n: "Avorio Chiaro"},
    {ral: "3000", r: 175, g: 43, b: 30, n: "Rosso Fuoco"},
    {ral: "6005", r: 46, g: 58, b: 52, n: "Verde Muschio"},
    {ral: "5010", r: 30, g: 71, b: 111, n: "Blu Genziana"}
];

let appState = JSON.parse(localStorage.getItem('FR_COLOR_APP')) || { cantieri: [] };
let stream = null;

// GESTIONE MODALI
function openMod(id) {
    document.getElementById('mod-' + id).style.display = 'flex';
    if(id === 'irina') initIrina();
    if(id === 'cantieri') renderCantieri();
}

function closeMod(id) {
    document.getElementById('mod-' + id).style.display = 'none';
    if(id === 'irina' && stream) {
        stream.getTracks().forEach(t => t.stop());
    }
}

// --- LOGICA IRINA SPETTROMETRO HD ---
async function initIrina() {
    const video = document.getElementById('v');
    try {
        // Richiesta permessi Ultra HD e fotocamera posteriore
        stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: "environment", 
                width: { ideal: 3840 }, 
                height: { ideal: 2160 } 
            }
        });
        video.srcObject = stream;
    } catch (err) {
        alert("Errore fotocamera: Permesso negato o risoluzione non supportata.");
    }
}

function takeReading() {
    const v = document.getElementById('v');
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(v, 0, 0);
    
    // Analisi pixel centrale
    const pixel = ctx.getImageData(canvas.width/2, canvas.height/2, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];
    
    // Calcolo RAL più vicino (Algoritmo Euclideo)
    let closest = RAL_DB.map(color => {
        let distance = Math.sqrt((r-color.r)**2 + (g-color.g)**2 + (b-color.b)**2);
        return { ...color, dist: distance };
    }).sort((a,b) => a.dist - b.dist)[0];

    // Codici Schermo
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    
    // Aggiornamento UI
    document.getElementById('color-preview').style.backgroundColor = hex;
    document.getElementById('res-ral').innerText = `RAL: ${closest.ral} (${closest.n})`;
    document.getElementById('res-codes').innerText = `RGB: ${r},${g},${b} | HEX: ${hex}`;
}

// --- GESTIONE CANTIERI ---
function addCantiere() {
    const name = document.getElementById('c-nome').value.trim();
    if(!name) return;
    
    appState.cantieri.push({
        id: Date.now(),
        nome: name,
        data: new Date().toLocaleString('it-IT'),
        files: []
    });
    
    localStorage.setItem('FR_COLOR_APP', JSON.stringify(appState));
    document.getElementById('c-nome').value = "";
    renderCantieri();
}

function renderCantieri() {
    const list = document.getElementById('c-list');
    list.innerHTML = appState.cantieri.map(c => `
        <div class="cantiere-card" style="background:#f1f5f9; padding:15px; border-radius:18px; margin-bottom:12px; border:1px solid #e2e8f0;">
            <div style="font-weight:bold; font-size:16px;">📁 ${c.nome}</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:12px;">${c.data}</div>
            <div style="display:flex; gap:8px;">
                <button onclick="alert('Camera attivata')" style="flex:1; padding:10px; border:none; border-radius:10px; background:#cbd5e1; font-weight:bold; font-size:11px;">FOTO</button>
                <button onclick="alert('Video attivato')" style="flex:1; padding:10px; border:none; border-radius:10px; background:#cbd5e1; font-weight:bold; font-size:11px;">VIDEO</button>
                <button onclick="deleteCantiere(${c.id})" style="width:40px; border:none; border-radius:10px; background:#fee2e2; color:#ef4444;">🗑️</button>
            </div>
        </div>
    `).reverse().join('');
}

function deleteCantiere(id) {
    if(confirm("Eliminare definitivamente la cartella?")) {
        appState.cantieri = appState.cantieri.filter(c => c.id !== id);
        localStorage.setItem('FR_COLOR_APP', JSON.stringify(appState));
        renderCantieri();
    }
}
