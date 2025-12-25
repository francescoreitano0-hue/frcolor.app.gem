// Database locale persistente: salva tutto sul telefono
let db = JSON.parse(localStorage.getItem('FR_COLOR_STORAGE')) || { cantieri: [], mat: [], att: [] };
let currentTab = 'mat';

// Database RAL Integrato (I principali utilizzati)
const RAL_DB = [
    {n:'7016', r:56, g:62, b:66}, {n:'9010', r:241, g:240, b:234}, {n:'7035', r:197, g:199, b:196},
    {n:'6005', r:46, g:58, b:52}, {n:'3000', r:175, g:43, b:30}, {n:'5010', r:14, g:67, b:121},
    {n:'1015', r:230, g:210, b:181}, {n:'8017', r:69, g:50, b:46}, {n:'9005', r:14, g:14, b:16}
];

function checkLogin() {
    if(document.getElementById('pass').value === 'frcolor') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('dashboard').classList.add('active');
    }
}

function openMod(id) {
    document.getElementById('mod-'+id).style.display = 'flex';
    if(id === 'irina') startCamera();
    if(id === 'cantieri') renderCantieri();
    if(id === 'magazzino') renderMagazzino();
}

function closeMod(id) {
    document.getElementById('mod-'+id).style.display = 'none';
    if(id === 'irina') stopCamera();
}

// --- LOGICA SPETTROMETRO IRINA ---
let stream;
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment", width: 3840}});
        document.getElementById('v').srcObject = stream;
        document.getElementById('v').style.display = 'block';
        document.getElementById('img-v').style.display = 'none';
    } catch(e) { alert("Errore Camera: " + e); }
}

function stopCamera() { if(stream) stream.getTracks().forEach(t => t.stop()); }

function applyZoom(v) {
    const el = document.getElementById('v').style.display !== 'none' ? 'v' : 'img-v';
    document.getElementById(el).style.transform = `scale(${v})`;
}

function loadF(e) {
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = document.getElementById('img-v');
        img.src = ev.target.result;
        img.style.display = 'block';
        document.getElementById('v').style.display = 'none';
    };
    reader.readAsDataURL(e.target.files[0]);
}

function snap() {
    const v = document.getElementById('v');
    const c = document.createElement('canvas');
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    const p = c.getContext('2d').getImageData(c.width/2, c.height/2, 1, 1).data;
    analyze(p[0], p[1], p[2]);
}

function analyze(r, g, b) {
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    let best = RAL_DB.map(x => ({...x, d: Math.sqrt((r-x.r)**2+(g-x.g)**2+(b-x.b)**2)})).sort((a,b)=>a.d-b.d)[0];
    document.getElementById('color-box').style.backgroundColor = hex;
    document.getElementById('color-info').innerHTML = `HEX: ${hex}<br>RAL PROBABILE: ${best.n} (${(100-best.d/4).toFixed(1)}%)`;
}

// --- LOGICA GESTIONE CANTIERI ---
function addC() {
    const n = document.getElementById('c-nome').value;
    if(!n) return;
    db.cantieri.push({nome: n, data: new Date().toLocaleDateString()});
    save(); renderCantieri();
    document.getElementById('c-nome').value = "";
}

function renderCantieri() {
    document.getElementById('c-list').innerHTML = db.cantieri.map(c => `
        <div class="folder">
            <strong>📁 ${c.nome}</strong><br><small>Creato il: ${c.data}</small>
            <div class="btn-row">
                <button onclick="alert('Camera Foto HD')" style="font-size:11px">FOTO</button>
                <button onclick="alert('Camera Video HD')" style="font-size:11px">VIDEO</button>
                <button onclick="generatePDF('${c.nome}')" style="font-size:11px; background:#e74c3c; color:white;">PDF</button>
            </div>
        </div>
    `).join('');
}

function generatePDF(nome) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`REPORT CANTIERE: ${nome}`, 10, 10);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 20);
    doc.text(`FR COLOR - Professional Documentation`, 10, 30);
    doc.save(`${nome}.pdf`);
}

// --- LOGICA MAGAZZINO ---
function tabM(t) {
    currentTab = t;
    document.getElementById('t-m').className = t === 'mat' ? 'tab-active' : '';
    document.getElementById('t-a').className = t === 'att' ? 'tab-active' : '';
    renderMagazzino();
}

function stock(mode) {
    const n = document.getElementById('m-n').value;
    const q = parseInt(document.getElementById('m-q').value);
    const note = document.getElementById('m-note').value;
    if(!n || !q) return;

    let i = db[currentTab].findIndex(x => x.nome === n);
    if(i > -1) db[currentTab][i].qta += (mode === 'IN' ? q : -q);
    else db[currentTab].push({nome: n, qta: q, note: note});
    
    save(); renderMagazzino();
    document.getElementById('m-n').value = ""; document.getElementById('m-q').value = "";
}

function renderMagazzino() {
    document.getElementById('m-list').innerHTML = db[currentTab].map(x => `
        <div class="card" style="margin-bottom:10px; flex-direction:column; align-items:flex-start;">
            <div style="display:flex; justify-content:space-between; width:100%;">
                <strong>${x.nome}</strong>
                <span>Q.tà: ${x.qta}</span>
            </div>
            <small style="color:#888; margin-top:5px;">Note: ${x.note || 'Nessuna'}</small>
        </div>
    `).join('');
}

function save() { localStorage.setItem('FR_COLOR_STORAGE', JSON.stringify(db)); }
