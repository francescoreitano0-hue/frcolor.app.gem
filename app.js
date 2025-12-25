// Database locale persistente
let data = JSON.parse(localStorage.getItem('FR_COLOR_DATA')) || { cantieri: [], mat: [], att: [] };
let currentTab = 'mat';
const RAL_LIST = [
    {n:'7016',r:56,g:62,b:66}, {n:'9010',r:241,g:240,b:234}, 
    {n:'3000',r:175,g:43,b:30}, {n:'7035',r:197,g:199,b:196},
    {n:'6005',r:46,g:58,b:52}, {n:'1015',r:230,g:210,b:181}
];

function checkLogin() {
    if(document.getElementById('pass').value === 'frcolor') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('dashboard').classList.add('active');
    } else { alert("Accesso Negato"); }
}

function openMod(id) {
    document.getElementById('mod-' + id).style.display = 'flex';
    if(id === 'irina') startCam();
    if(id === 'cantieri') renderCantieri();
    if(id === 'magazzino') renderMagazzino();
}

function closeMod(id) {
    document.getElementById('mod-' + id).style.display = 'none';
    if(id === 'irina') stopCam();
}

// --- SPETTROMETRO IRINA ---
let stream;
async function startCam() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 3840 } } });
        document.getElementById('v').srcObject = stream;
        document.getElementById('v').style.display = 'block';
        document.getElementById('i-view').style.display = 'none';
    } catch (e) { alert("Camera Error: " + e); }
}

function stopCam() { if(stream) stream.getTracks().forEach(t => t.stop()); }

function applyZ(v) {
    const el = document.getElementById('v').style.display !== 'none' ? 'v' : 'i-view';
    document.getElementById(el).style.transform = `scale(${v})`;
}

function loadF(e) {
    const reader = new FileReader();
    reader.onload = (f) => {
        const img = document.getElementById('i-view');
        img.src = f.target.result;
        img.style.display = 'block';
        document.getElementById('v').style.display = 'none';
    };
    reader.readAsDataURL(e.target.files[0]);
}

function takeSnap() {
    const v = document.getElementById('v');
    const c = document.createElement('canvas');
    c.width = v.videoWidth; c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0);
    const p = ctx.getImageData(c.width/2, c.height/2, 1, 1).data;
    processCol(p[0], p[1], p[2]);
}

// Analisi al tocco su immagine caricata
document.getElementById('i-view').onclick = function(e) {
    const c = document.createElement('canvas');
    const img = e.target;
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const r = img.getBoundingClientRect();
    const x = (e.clientX - r.left) * (c.width / r.width);
    const y = (e.clientY - r.top) * (c.height / r.height);
    const p = ctx.getImageData(x, y, 1, 1).data;
    processCol(p[0], p[1], p[2]);
};

function processCol(r, g, b) {
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    let matches = RAL_LIST.map(ral => {
        const d = Math.sqrt((r-ral.r)**2 + (g-ral.g)**2 + (b-ral.b)**2);
        return { ...ral, acc: (Math.max(0, 100 - d/4)).toFixed(1) };
    }).sort((a,b) => b.acc - a.acc).slice(0,3);

    document.getElementById('color-prev').style.backgroundColor = hex;
    document.getElementById('color-info').innerHTML = `<strong>HEX: ${hex}</strong><br>
        1. RAL ${matches[0].n} (${matches[0].acc}%)<br>
        2. RAL ${matches[1].n} (${matches[1].acc}%)`;
}

// --- MAGAZZINO ---
function switchMag(t) {
    currentTab = t;
    document.getElementById('t-mat').className = t === 'mat' ? 'active-tab' : '';
    document.getElementById('t-att').className = t === 'att' ? 'active-tab' : '';
    renderMagazzino();
}

function stockUpdate(mode) {
    const n = document.getElementById('m-nome').value;
    const q = parseInt(document.getElementById('m-qta').value);
    const nt = document.getElementById('m-note').value;
    if(!n || !q) return;
    
    let i = data[currentTab].findIndex(x => x.n === n);
    if(i > -1) data[currentTab][i].q += (mode === 'IN' ? q : -q);
    else data[currentTab].push({ n, q, nt });
    
    sync(); renderMagazzino();
}

function renderMagazzino() {
    document.getElementById('m-list').innerHTML = data[currentTab].map(x => `
        <div class="card-main" style="text-align:left; margin-bottom:10px;">
            <strong>${x.n}</strong>: ${x.q} unità<br><small>${x.nt}</small>
        </div>
    `).join('');
}

// --- CANTIERI & PDF ---
function addCantiere() {
    const n = document.getElementById('c-nome').value;
    if(!n) return;
    data.cantieri.push({ n, d: new Date().toLocaleDateString() });
    sync(); renderCantieri();
}

function renderCantieri() {
    document.getElementById('c-list').innerHTML = data.cantieri.map(c => `
        <div class="card-main" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div><strong>${c.n}</strong><br><small>${c.d}</small></div>
            <button onclick="genPDF('${c.n}')" style="background:red; color:white; border:none; padding:8px; border-radius:8px;">PDF</button>
        </div>
    `).join('');
}

function genPDF(n) {
    const doc = new jspdf.jsPDF();
    doc.setFontSize(20); doc.text("REPORT CANTIERE FR COLOR", 10, 20);
    doc.setFontSize(12); doc.text(`Cantiere: ${n}`, 10, 40);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 50);
    doc.text("Documento generato automaticamente dall'App.", 10, 70);
    doc.save(`Cantiere_${n}.pdf`);
}

function sync() { localStorage.setItem('FR_COLOR_DATA', JSON.stringify(data)); }
