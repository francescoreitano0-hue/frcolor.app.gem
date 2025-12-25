
 
/**
 * ============================================================
 * FR COLOR - SISTEMA GESTIONALE INTEGRALE (Versione 2025)
 * Sviluppato per: Irina (Segretaria Virtuale & Spettrometro)
 * Funzioni: Spettrometro HD, Archivio Cantieri, Magazzino, PDF
 * ============================================================
 */

// --- 1. CONFIGURAZIONE DATABASE E STATO ---
let db = JSON.parse(localStorage.getItem('FR_COLOR_ULTIMATE_DB')) || {
    cantieri: [],
    materiali: [],
    attrezzature: [],
    settings: { user: "FR Color", irinaActive: true }
};

let currentMagazzinoTab = 'materiali';
let streamAttivo = null;

// --- 2. DATABASE RAL INTEGRATO (I più usati nel settore) ---
// Questo database permette a Irina di identificare il colore
const DATABASE_RAL = [
    {ral: '1013', nome: 'Bianco Perla', r: 227, g: 217, b: 198},
    {ral: '1015', nome: 'Avorio Chiaro', r: 230, g: 210, b: 181},
    {ral: '3000', nome: 'Rosso Fuoco', r: 175, g: 43, b: 30},
    {ral: '5010', nome: 'Blu Genziana', r: 14, g: 67, b: 121},
    {ral: '6005', nome: 'Verde Muschio', r: 46, g: 58, b: 52},
    {ral: '7016', nome: 'Antracite', r: 56, g: 62, b: 66},
    {ral: '7035', nome: 'Grigio Luce', r: 197, g: 199, b: 196},
    {ral: '7040', nome: 'Grigio Finestra', r: 151, g: 161, b: 161},
    {ral: '8017', nome: 'Marrone Cioccolato', r: 69, g: 50, b: 46},
    {ral: '9005', nome: 'Nero Profondo', r: 14, g: 14, b: 16},
    {ral: '9010', nome: 'Bianco Puro', r: 241, g: 240, b: 234},
    {ral: '9016', nome: 'Bianco Traffico', r: 241, g: 245, b: 242}
];

// --- 3. GESTIONE NAVIGAZIONE (MODALI) ---
function openMod(id) {
    const modal = document.getElementById('mod-' + id);
    if (modal) {
        modal.style.display = 'flex';
        // Inizializzazione specifica per modulo
        if (id === 'irina') startIrinaCamera();
        if (id === 'cantieri') renderCantieri();
        if (id === 'magazzino') renderMagazzino();
    }
}

function closeMod(id) {
    const modal = document.getElementById('mod-' + id);
    if (modal) {
        modal.style.display = 'none';
        if (id === 'irina') stopIrinaCamera();
    }
}

// --- 4. MODULO IRINA: SPETTROMETRO & CAMERA HD ---
async function startIrinaCamera() {
    const video = document.getElementById('v');
    const constraints = {
        video: { 
            facingMode: "environment", 
            width: { ideal: 3840 }, // Ultra HD
            height: { ideal: 2160 }
        }
    };

    try {
        streamAttivo = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = streamAttivo;
    } catch (err) {
        console.error("Errore Camera:", err);
        alert("Irina non può accedere alla fotocamera. Controlla i permessi.");
    }
}

function stopIrinaCamera() {
    if (streamAttivo) {
        streamAttivo.getTracks().forEach(track => track.stop());
        streamAttivo = null;
    }
}

function applyZoom(val) {
    const video = document.getElementById('v');
    video.style.transform = `scale(${val})`;
}

// Analisi Colore dal vivo
function takeReading() {
    const video = document.getElementById('v');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Cattura frame attuale
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Legge il pixel al centro (mirino)
    const pixel = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];

    // Calcolo RAL più vicino
    let match = DATABASE_RAL.map(c => {
        const d = Math.sqrt(Math.pow(r-c.r, 2) + Math.pow(g-c.g, 2) + Math.pow(b-c.b, 2));
        return { ...c, diff: d };
    }).sort((a,b) => a.diff - b.diff)[0];

    // Risultato HEX
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    
    // Aggiorna interfaccia (se presente) o mostra alert
    const display = document.getElementById('color-info');
    if (display) {
        display.innerHTML = `<strong>HEX:</strong> ${hex}<br><strong>RAL:</strong> ${match.ral} (${match.nome})`;
        document.getElementById('color-prev').style.backgroundColor = hex;
    } else {
        alert(`IRINA ANALISI:\nHEX: ${hex}\nRAL: ${match.ral}\nNome: ${match.nome}`);
    }
}

// --- 5. MODULO CANTIERI: ARCHIVIO & PDF ---
function addCantiere() {
    const input = document.getElementById('c-nome');
    const nome = input.value.trim();
    if (!nome) return;

    db.cantieri.push({
        id: Date.now(),
        nome: nome,
        data: new Date().toLocaleDateString('it-IT'),
        note: ""
    });

    saveData();
    renderCantieri();
    input.value = "";
}

function renderCantieri() {
    const container = document.getElementById('c-list');
    if (!container) return;

    container.innerHTML = db.cantieri.slice().reverse().map((c, i) => `
        <div class="folder-card">
            <div class="folder-title">📁 ${c.nome}</div>
            <div class="folder-date">Aperto il: ${c.data}</div>
            <div class="folder-actions">
                <button class="btn-gray" onclick="alert('Camera Foto HD attiva')">FOTO</button>
                <button class="btn-gray" onclick="alert('Registrazione Video HD')">VIDEO</button>
                <button class="btn-red" onclick="exportPDF('${c.nome}')">PDF</button>
            </div>
            <button class="btn-delete" onclick="deleteCantiere(${db.cantieri.length - 1 - i})">Elimina</button>
        </div>
    `).join('');
}

function deleteCantiere(index) {
    if (confirm("Sei sicuro di voler eliminare questa cartella?")) {
        db.cantieri.splice(index, 1);
        saveData();
        renderCantieri();
    }
}

function exportPDF(nomeCantiere) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("FR COLOR - DOCUMENTAZIONE TECNICA", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Cantiere: ${nomeCantiere}`, 20, 35);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text("Analisi eseguita da Irina Assistant.", 20, 55);
    doc.save(`Cantiere_${nomeCantiere}.pdf`);
}

// --- 6. MODULO MAGAZZINO: MATERIALI & ATTREZZATURE ---
function switchTab(tab) {
    currentMagazzinoTab = (tab === 'mat') ? 'materiali' : 'attrezzature';
    renderMagazzino();
}

function updateStock(azione) {
    const nome = document.getElementById('m-nome').value.trim();
    const qta = parseInt(document.getElementById('m-qta').value);
    if (!nome || isNaN(qta)) return;

    let target = db[currentMagazzinoTab];
    let index = target.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());

    if (index > -1) {
        if (azione === 'IN') target[index].qta += qta;
        else target[index].qta -= qta;
    } else {
        if (azione === 'IN') target.push({ nome, qta });
    }

    saveData();
    renderMagazzino();
    document.getElementById('m-nome').value = "";
    document.getElementById('m-qta').value = "";
}

function renderMagazzino() {
    const list = document.getElementById('m-list');
    if (!list) return;
    const target = db[currentMagazzinoTab];

    list.innerHTML = target.map(item => `
        <div class="card" style="margin-bottom:10px; padding:15px;">
            <strong>${item.nome}</strong>
            <span style="float:right; font-weight:bold;">Q.tà: ${item.qta}</span>
        </div>
    `).join('');
}

// --- 7. SALVATAGGIO UNIVERSALE ---
function saveData() {
    localStorage.setItem('FR_COLOR_ULTIMATE_DB', JSON.stringify(db));
}

// --- 8. AVVIO SISTEMA ---
window.onload = () => {
    console.log("Sistema Irina FR Color - Operativo.");
};
