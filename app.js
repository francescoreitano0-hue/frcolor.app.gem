// Database RAL (Esempio dei principali, espandibile)
const RAL_DB = [
    {ral:"1000",r:190,g:173,b:128,n:"Beige verdastro"},
    {ral:"1013",r:227,g:217,b:198,n:"Bianco perla"},
    {ral:"1015",r:230,g:210,b:181,n:"Avorio chiaro"},
    {ral:"7016",r:56,g:62,b:66,n:"Grigio Antracite"},
    {ral:"7035",r:197,g:199,b:196,n:"Grigio Luce"},
    {ral:"9003",r:236,g:239,b:238,n:"Bianco Segnale"},
    {ral:"9005",r:14,g:14,b:16,n:"Nero Profondo"},
    {ral:"9010",r:241,g:240,b:234,n:"Bianco Puro"},
    {ral:"9016",r:241,g:246,b:246,n:"Bianco Traffico"}
];

// Caricamento Stato
let state = JSON.parse(localStorage.getItem('FR_COLOR_DATA_2025')) || { 
    cantieri: [], 
    mag: { mat: [], att: [] } 
};

let stream = null;
let currentTab = 'mat';

// LOGIN
function checkLogin() {
    const pass = document.getElementById('pass-input').value;
    if(pass.trim() === "FR2025") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        document.getElementById('login-err').innerText = "Password Errata";
    }
}

// MODALI
async function openMod(id) {
    document.getElementById('mod-'+id).style.display = 'flex';
    if(id === 'irina') {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } 
            });
            document.getElementById('v').srcObject = stream;
            document.getElementById('v').style.display = 'block';
            document.getElementById('c-view').style.display = 'none';
        } catch (err) { alert("Errore fotocamera: " + err); }
    }
    if(id === 'cantieri') renderCantieri();
    if(id === 'magazzino') renderMag();
}

function closeMod(id) {
    document.getElementById('mod-'+id).style.display = 'none';
    if(id === 'irina' && stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

// IRINA LOGIC
function applyZoom(val) {
    const v = document.getElementById('v');
    const cv = document.getElementById('c-view');
    v.style.transform = `scale(${val})`;
    cv.style.transform = `scale(${val})`;
}

function takeReading() {
    const v = document.getElementById('v');
    const cv = document.getElementById('c-view');
    cv.width = v.videoWidth;
    cv.height = v.videoHeight;
    const ctx = cv.getContext('2d');
    ctx.drawImage(v, 0, 0);
    const p = ctx.getImageData(cv.width/2, cv.height/2, 1, 1).data;
    showCol(p[0], p[1], p[2]);
}

function analyzeImg(input) {
    if(!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const cv = document.getElementById('c-view');
            cv.width = img.width; cv.height = img.height;
            cv.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('v').style.display = 'none';
            cv.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}

document.getElementById('c-view').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (this.width / rect.width);
    const y = (e.clientY - rect.top) * (this.height / rect.height);
    const p = this.getContext('2d').getImageData(x, y, 1, 1).data;
    showCol(p[0], p[1], p[2]);
});

function showCol(r, g, b) {
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    let match = RAL_DB.map(c => ({
        ...c, 
        d: Math.sqrt(Math.pow(r-c.r,2) + Math.pow(g-c.g,2) + Math.pow(b-c.b,2))
    })).sort((a,b) => a.d - b.d)[0];

    document.getElementById('color-preview').style.backgroundColor = hex;
    document.getElementById('out-text').innerHTML = `
        <b style="font-size:18px;">RAL ${match.ral}</b><br>
        <small>HEX: ${hex} | RGB: ${r},${g},${b}</small><br>
        <small>SCREEN: ${(r/255).toFixed(2)}, ${(g/255).toFixed(2)}, ${(b/255).toFixed(2)}</small>
    `;
}

// CANTIERI LOGIC
function addCantiere() {
    const nome = document.getElementById('c-nome').value;
    if(!nome) return;
    state.cantieri.push({ id: Date.now(), nome: nome, note: "", foto: [] });
    save(); renderCantieri();
    document.getElementById('c-nome').value = "";
}

function renderCantieri() {
    const container = document.getElementById('c-list');
    container.innerHTML = state.cantieri.map(c => `
        <div class="cantiere-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <b style="color:#1e3a5f;">📁 ${c.nome}</b>
                <button class="del-btn" onclick="delC(${c.id})">Elimina</button>
            </div>
            <textarea placeholder="Note cantiere..." onchange="updC(${c.id}, 'note', this.value)">${c.note}</textarea>
            <div class="foto-grid">
                ${(c.foto || []).map(f => `<img src="${f}" class="thumb">`).join('')}
            </div>
            <div class="btn-grid-row">
                <button class="btn-in" onclick="triggerFoto(${c.id}, true)">FOTO</button>
                <button class="btn-out" onclick="triggerFoto(${c.id}, false)">GALLERIA</button>
            </div>
        </div>
    `).reverse().join('');
}

function triggerFoto(id, isCam) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if(isCam) input.capture = 'environment';
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const c = state.cantieri.find(x => x.id === id);
            c.foto.push(reader.result);
            save(); renderCantieri();
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    input.click();
}

function updC(id, field, value) {
    const c = state.cantieri.find(x => x.id === id);
    if(c) c[field] = value;
    save();
}

function delC(id) {
    if(confirm("Eliminare cantiere?")) {
        state.cantieri = state.cantieri.filter(x => x.id !== id);
        save(); renderCantieri();
    }
}

// MAGAZZINO LOGIC
function setTab(t) {
    currentTab = t;
    document.getElementById('t-mat').classList.toggle('active', t === 'mat');
    document.getElementById('t-att').classList.toggle('active', t === 'att');
    renderMag();
}

function updStock(mode) {
    const nome = document.getElementById('m-nome').value;
    const qta = parseInt(document.getElementById('m-qta').value);
    const note = document.getElementById('m-note').value;
    if(!nome || isNaN(qta)) return;

    let item = state.mag[currentTab].find(x => x.nome === nome);
    if(item) {
        item.qta = (mode === 'IN' ? item.qta + qta : Math.max(0, item.qta - qta));
        item.note = note;
    } else if(mode === 'IN') {
        state.mag[currentTab].push({ nome, qta, note });
    }
    
    save(); renderMag();
    document.getElementById('m-nome').value = "";
    document.getElementById('m-qta').value = "";
    document.getElementById('m-note').value = "";
}

function renderMag() {
    document.getElementById('m-list').innerHTML = state.mag[currentTab].map(i => `
        <div class="mag-item">
            <div>
                <b>${i.nome}</b><br>
                <small style="color:#666;">${i.note || ''}</small>
            </div>
            <div style="text-align:right;">
                <span style="font-size:18px; font-weight:bold;">${i.qta}</span><br>
                <button class="del-link" onclick="delM('${i.nome}')">Rimuovi</button>
            </div>
        </div>
    `).join('');
}

function delM(nome) {
    state.mag[currentTab] = state.mag[currentTab].filter(x => x.nome !== nome);
    save(); renderMag();
}

function save() {
    localStorage.setItem('FR_COLOR_DATA_2025', JSON.stringify(state));
}
