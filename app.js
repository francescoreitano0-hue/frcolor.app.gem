/** * FR COLOR - MOTORE INTEGRALE 
 * Gestione: Login, Spettrometro, Cantieri, Magazzino e Database Locale
 */

// 1. DATABASE INIZIALE E PERSISTENZA
// Recupera i dati salvati o crea una struttura vuota se è il primo avvio
let db = JSON.parse(localStorage.getItem('FR_COLOR_OFFICIAL_DB')) || {
    cantieri: [],
    materiali: [],
    attrezzature: []
};

let currentTab = 'materiali'; // Tab predefinita per il magazzino

// 2. DATABASE RAL ESTESO (Inseriti i codici più comuni del settore)
const RAL_DATABASE = [
    {ral: '7016', nome: 'Antracite', r: 56, g: 62, b: 66},
    {ral: '9010', nome: 'Bianco Puro', r: 241, g: 240, b: 234},
    {ral: '9016', nome: 'Bianco Traffico', r: 241, g: 245, b: 242},
    {ral: '7035', nome: 'Grigio Luce', r: 197, g: 199, b: 196},
    {ral: '6005', nome: 'Verde Muschio', r: 46, g: 58, b: 52},
    {ral: '3000', nome: 'Rosso Fuoco', r: 175, g: 43, b: 30},
    {ral: '1015', r: 230, g: 210, b: 181},
    {ral: '5010', r: 14, g: 67, b: 121},
    {ral: '8017', r: 69, g: 50, b: 46},
    {ral: '9005', r: 14, g: 14, b: 16},
    {ral: '7001', r: 143, g: 153, b: 159},
    {ral: '7040', r: 151, g: 161, b: 161}
];

// 3. SISTEMA DI LOGIN
function checkLogin() {
    const passwordInput = document.getElementById('pass').value;
    if (passwordInput === 'frcolor') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-app').classList.add('active');
    } else {
        alert("Password errata. Riprova.");
    }
}

// 4. NAVIGAZIONE MODULI (Apertura/Chiusura finestre)
function openMod(id) {
    const modal = document.getElementById('mod-' + id);
    modal.style.display = 'flex';
    
    // Inizializza funzioni specifiche al momento dell'apertura
    if (id === 'irina') startCamera();
    if (id === 'cantieri') renderCantieri();
    if (id === 'magazzino') renderMagazzino();
}

function closeMod(id) {
    document.getElementById('mod-' + id).style.display = 'none';
    if (id === 'irina') stopCamera();
}

// 5. MOTORE SPETTROMETRO IRINA (FOTOCAMERA E ANALISI)
let videoStream;

async function startCamera() {
    const videoElement = document.getElementById('v');
    try {
        // Tenta di avviare la camera in Ultra HD (se supportata dal telefono)
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: "environment", 
                width: { ideal: 3840 },
                height: { ideal: 2160 }
            }
        });
        videoElement.srcObject = videoStream;
    } catch (err) {
        console.error("Errore fotocamera: ", err);
        alert("Impossibile accedere alla fotocamera HD.");
    }
}

function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
}

function applyZoom(val) {
    const target = document.getElementById('v').style.display !== 'none' ? 'v' : 'img-v';
    document.getElementById(target).style.transform = `scale(${val})`;
}

// Caricamento foto da galleria
function loadF(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('img-v');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('v').style.display = 'none'; // Nasconde il video live
    };
    reader.readAsDataURL(file);
}

// Scatto e Analisi Colore
function snap() {
    const video = document.getElementById('v');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Disegna il frame video sul canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Preleva il colore dal centro esatto (dove c'è il mirino)
    const pixelData = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
    calculateRAL(pixelData[0], pixelData[1], pixelData[2]);
}

function calculateRAL(r, g, b) {
    // Converte RGB in HEX
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    
    // Cerca il RAL più vicino calcolando la distanza euclidea
    let closest = RAL_DATABASE.map(entry => {
        const distance = Math.sqrt(
            Math.pow(r - entry.r, 2) + 
            Math.pow(g - entry.g, 2) + 
            Math.pow(b - entry.b, 2)
        );
        return { ...entry, diff: distance };
    }).sort((a, b) => a.diff - b.diff)[0];

    // Accuratezza in percentuale
    const accuracy = (Math.max(0, 100 - (closest.diff / 5))).toFixed(1);

    // Mostra i risultati
    document.getElementById('color-sample').style.backgroundColor = hex;
    document.getElementById('color-data').innerHTML = `
        <strong>HEX:</strong> ${hex}<br>
        <strong>RAL:</strong> ${closest.ral} (${accuracy}%)
    `;
}

// 6. GESTIONE CANTIERI (Cartelle e PDF)
function addCantiere() {
    const nome = document.getElementById('c-nome').value;
    if (!nome) { alert("Inserisci un nome per il cantiere"); return; }

    db.cantieri.push({
        id: Date.now(),
        nome: nome,
        dataCreazione: new Date().toLocaleDateString()
    });

    saveData();
    renderCantieri();
    document.getElementById('c-nome').value = "";
}

function renderCantieri() {
    const container = document.getElementById('c-list');
    container.innerHTML = db.cantieri.map(c => `
        <div class="folder-card">
            <strong>📁 ${c.nome}</strong><br>
            <small>Aperto il: ${c.dataCreazione}</small>
            <div class="btn-group" style="margin-top:12px">
                <button class="btn-sec" style="font-size:10px" onclick="alert('Camera Foto HD Attiva')">FOTO</button>
                <button class="btn-sec" style="font-size:10px" onclick="alert('Camera Video HD Attiva')">VIDEO</button>
                <button class="btn-primary" style="font-size:10px; background:#ff3b30" onclick="genPDF('${c.nome}')">PDF</button>
            </div>
        </div>
    `).reverse().join('');
}

function genPDF(nomeCantiere) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(`REPORT CANTIERE: ${nomeCantiere}`, 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Documentazione ufficiale FR COLOR`, 20, 30);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.save(`Cantiere_${nomeCantiere}.pdf`);
}

// 7. GESTIONE MAGAZZINO (Entrate/Uscite)
function switchTab(tab) {
    currentTab = (tab === 'mat') ? 'materiali' : 'attrezzature';
    document.getElementById('tab-mat').className = (tab === 'mat') ? 'tab-btn active' : 'tab-btn';
    document.getElementById('tab-att').className = (tab === 'att') ? 'tab-btn active' : 'tab-btn';
    renderMagazzino();
}

function stockUpdate(tipoAzione) {
    const nome = document.getElementById('m-nome').value;
    const qta = parseInt(document.getElementById('m-qta').value);
    const note = document.getElementById('m-note').value;

    if (!nome || isNaN(qta)) { alert("Inserisci nome e quantità"); return; }

    let indice = db[currentTab].findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());

    if (indice > -1) {
        // Se l'articolo esiste, aggiorna la quantità
        if (tipoAzione === 'IN') db[currentTab][indice].qta += qta;
        else db[currentTab][indice].qta -= qta;
        db[currentTab][indice].note = note;
    } else {
        // Se non esiste, aggiungi nuovo articolo (solo se è un'entrata)
        if (tipoAzione === 'IN') {
            db[currentTab].push({ nome, qta, note });
        } else {
            alert("Articolo non presente in magazzino.");
            return;
        }
    }

    saveData();
    renderMagazzino();
    document.getElementById('m-nome').value = "";
    document.getElementById('m-qta').value = "";
}

function renderMagazzino() {
    const list = document.getElementById('m-list');
    list.innerHTML = db[currentTab].map(item => `
        <div class="card" style="margin-bottom:12px; padding:15px; border-left: 4px solid #1c1c1e;">
            <div style="flex:1">
                <strong style="font-size:16px">${item.nome}</strong><br>
                <small style="color:#666">${item.note || 'Nessuna nota'}</small>
            </div>
            <div style="font-size:18px; font-weight:bold">${item.qta}</div>
        </div>
    `).join('');
}

// 8. FUNZIONE DI SALVATAGGIO UNIVERSALE
function saveData() {
    localStorage.setItem('FR_COLOR_OFFICIAL_DB', JSON.stringify(db));
}

// Inizializzazione al caricamento
window.onload = () => {
    console.log("App FR COLOR Caricata correttamente.");
};
