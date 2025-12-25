// --- LOGIN ---
function checkLogin() {
    if(document.getElementById('pass').value === 'frcolor') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-app').classList.add('active');
    } else { alert("Password Errata"); }
}

// --- MODALI ---
function openMod(id) {
    document.getElementById('mod-' + id).style.display = 'flex';
    if(id === 'irina') startCam();
    if(id === 'cantieri') renderCantieri();
    if(id === 'magazzino') renderMagazzino();
}
function closeMod(id) {
    document.getElementById(id).style.display = 'none';
    if(id === 'mod-irina') stopCam();
}

// --- SPETTROMETRO ---
let stream;
async function startCam() {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: 3840 } });
    document.getElementById('video').srcObject = stream;
}
function stopCam() { if(stream) stream.getTracks().forEach(t => t.stop()); }

function handleZoom(v) {
    const el = document.getElementById('video').style.display !== 'none' ? 'video' : 'img-preview';
    document.getElementById(el).style.transform = `scale(${v})`;
}

function loadPhoto(e) {
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = document.getElementById('img-preview');
        img.src = ev.target.result;
        img.style.display = 'block';
        document.getElementById('video').style.display = 'none';
    };
    reader.readAsDataURL(e.target.files[0]);
}

document.getElementById('img-preview').onclick = function(e) {
    const canvas = document.createElement('canvas');
    const img = e.target;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const rect = img.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const p = ctx.getImageData(x, y, 1, 1).data;
    analyze(p[0], p[1], p[2]);
};

function takeSnap() {
    const v = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth; canvas.height = v.videoHeight;
    canvas.getContext('2d').drawImage(v, 0, 0);
    const p = canvas.getContext('2d').getImageData(canvas.width/2, canvas.height/2, 1, 1).data;
    analyze(p[0], p[1], p[2]);
}

function analyze(r, g, b) {
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    document.getElementById('color-circle').style.backgroundColor = hex;
    document.getElementById('color-info').innerHTML = `<strong>${hex}</strong><br>1. RAL 7016 (99%)<br>2. RAL 7021 (80%)`;
}

// --- MAGAZZINO ---
let stock = JSON.parse(localStorage.getItem('stock')) || [];
function updateStock(mode) {
    const n = document.getElementById('item-name').value;
    const q = parseInt(document.getElementById('item-qta').value);
    if(!n || !q) return;
    const idx = stock.findIndex(i => i.name === n);
    if(idx > -1) stock[idx].qta += (mode === 'in' ? q : -q);
    else stock.push({name: n, qta: q});
    localStorage.setItem('stock', JSON.stringify(stock));
    renderMagazzino();
}
function renderMagazzino() {
    document.getElementById('list-magazzino').innerHTML = stock.map(i => `<div class="menu-card">${i.name}: ${i.qta}</div>`).join('');
}

// --- CANTIERI ---
let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
function addCantiere() {
    const n = document.getElementById('cantiere-nome').value;
    if(!n) return;
    jobs.push({name: n, date: new Date().toLocaleDateString()});
    localStorage.setItem('jobs', JSON.stringify(jobs));
    renderCantieri();
}
function renderCantieri() {
    document.getElementById('list-cantieri').innerHTML = jobs.map(j => `
        <div class="menu-card">${j.name} (${j.date}) 
        <button onclick="downloadPDF('${j.name}')">PDF</button></div>
    `).join('');
}
function downloadPDF(n) {
    const doc = new jspdf.jsPDF();
    doc.text(`CANTIERE: ${n}`, 10, 10);
    doc.save(`${n}.pdf`);
}

// --- AI & EXTERNAL ---
function openAI(type) { alert("Apertura " + type + "..."); }
function openX() { alert("Apertura Simulatore X..."); }
