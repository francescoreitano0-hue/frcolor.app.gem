




const RAL_DB = [{ral:"1000",r:190,g:173,b:128,n:"Beige verdastro"},{ral:"1001",r:194,g:163,b:115,n:"Beige"},{ral:"1002",r:209,g:163,b:115,n:"Giallo sabbia"},{ral:"1003",r:243,g:165,b:5,n:"Giallo segnale"},{ral:"1004",r:228,g:160,b:4,n:"Giallo oro"},{ral:"1005",r:203,g:142,b:4,n:"Giallo miele"},{ral:"1006",r:226,g:144,b:0,n:"Giallo mais"},{ral:"1007",r:232,g:140,b:0,n:"Giallo cromo"},{ral:"1011",r:175,g:128,b:79,n:"Beige marrone"},{ral:"1012",r:221,g:175,b:39,n:"Giallo limone"},{ral:"1013",r:227,g:217,b:198,n:"Bianco perla"},{ral:"1014",r:221,g:196,b:154,n:"Avorio"},{ral:"1015",r:230,g:210,b:181,n:"Avorio chiaro"},{ral:"1016",r:241,g:232,b:28,n:"Giallo zolfo"},{ral:"1017",r:246,g:169,b:80,n:"Giallo zafferano"},{ral:"1018",r:250,g:202,b:48,n:"Giallo zinco"},{ral:"1019",r:164,g:143,b:122,n:"Beige grigiastro"},{ral:"1020",r:160,g:147,b:110,n:"Giallo olivastro"},{ral:"1021",r:242,g:182,b:0,n:"Giallo colza"},{ral:"1023",r:247,g:181,b:0,n:"Giallo traffico"},{ral:"1024",r:186,g:143,b:76,n:"Giallo ocra"},{ral:"1026",r:255,g:255,b:0,n:"Giallo brillante"},{ral:"1027",r:167,g:127,b:14,n:"Giallo curry"},{ral:"1028",r:255,g:187,b:0,n:"Giallo melone"},{ral:"1032",r:226,g:163,b:0,n:"Giallo scopa"},{ral:"1033",r:249,g:154,b:28,n:"Giallo dalia"},{ral:"1034",r:235,g:156,b:82,n:"Giallo pastello"},{ral:"1035",r:144,g:131,b:112,n:"Beige perlato"},{ral:"1036",r:128,g:101,b:74,n:"Oro perlato"},{ral:"1037",r:243,g:153,b:0,n:"Giallo sole"},{ral:"2000",r:237,g:107,b:33,n:"Arancio giallo"},{ral:"2001",r:186,g:72,b:27,n:"Arancio rossastro"},{ral:"2002",r:191,g:49,b:26,n:"Arancio sanguigno"},{ral:"2003",r:246,g:120,b:37,n:"Arancio pastello"},{ral:"2004",r:228,g:81,b:0,n:"Arancio puro"},{ral:"2005",r:255,g:35,b:1,n:"Arancio brillante"},{ral:"2007",r:255,g:164,b:32,n:"Arancio brillante chiaro"},{ral:"2008",r:237,g:104,b:42,n:"Arancio brillante"},{ral:"2009",r:222,g:73,b:15,n:"Arancio traffico"},{ral:"2010",r:208,g:93,b:40,n:"Arancio segnale"},{ral:"2011",r:231,g:109,b:19,n:"Arancio profondo"},{ral:"2012",r:213,g:101,b:77,n:"Arancio salmone"},{ral:"2013",r:146,g:62,b:37,n:"Arancio perlato"},{ral:"3000",r:167,g:41,b:32,n:"Rosso fuoco"},{ral:"3001",r:155,g:36,b:35,n:"Rosso segnale"},{ral:"3002",r:149,g:33,b:27,n:"Rosso carminio"},{ral:"3003",r:130,g:28,b:27,n:"Rosso rubino"},{ral:"3004",r:104,g:30,b:31,n:"Rosso porpora"},{ral:"3005",r:82,g:28,b:31,n:"Rosso vino"},{ral:"3007",r:61,g:31,b:33,n:"Rosso nero"},{ral:"3009",r:100,g:37,b:33,n:"Rosso ossido"},{ral:"3011",r:113,g:33,b:31,n:"Rosso marrone"},{ral:"3012",r:190,g:123,b:103,n:"Rosso beige"},{ral:"3013",r:151,g:45,b:35,n:"Rosso pomodoro"},{ral:"3014",r:203,g:115,b:117,n:"Rosso antico"},{ral:"3015",r:216,g:160,b:166,n:"Rosa chiaro"},{ral:"3016",r:166,g:53,b:39,n:"Rosso corallo"},{ral:"3017",r:198,g:73,b:84,n:"Rosso fragola"},{ral:"3018",r:197,g:53,b:68,n:"Rosso fragola"},{ral:"3020",r:187,g:30,b:16,n:"Rosso traffico"},{ral:"3022",r:197,g:91,b:78,n:"Rosso salmone"},{ral:"3024",r:255,g:45,b:33,n:"Rosso brillante"},{ral:"3026",r:255,g:45,b:33,n:"Rosso brillante chiaro"},{ral:"3027",r:168,g:32,b:51,n:"Rosso lampone"},{ral:"3028",r:187,g:30,b:16,n:"Rosso puro"},{ral:"3031",r:160,g:43,b:51,n:"Rosso oriente"},{ral:"3032",r:112,g:29,b:35,n:"Rosso rubino perlato"},{ral:"3033",r:165,g:40,b:37,n:"Rosso rosa perlato"},{ral:"4001",r:133,g:90,b:127,n:"Lilla rossastro"},{ral:"4002",r:139,g:48,b:64,n:"Violetto rossastro"},{ral:"4003",r:191,g:83,b:129,n:"Violetto erica"},{ral:"4004",r:101,g:30,b:53,n:"Violetto bordeaux"},{ral:"4005",r:110,g:91,b:152,n:"Blu lilla"},{ral:"4006",r:143,g:48,b:113,n:"Porpora traffico"},{ral:"4007",r:66,g:34,b:55,n:"Violetto porpora"},{ral:"4008",r:131,g:63,b:120,n:"Violetto segnale"},{ral:"4009",r:151,g:129,b:148,n:"Violetto pastello"},{ral:"4010",r:188,g:33,b:104,n:"Telemagenta"},{ral:"4011",r:134,g:95,b:138,n:"Violetto perlato"},{ral:"4012",r:106,g:104,b:121,n:"Violetto mora perlato"},{ral:"5000",r:47,g:76,b:113,n:"Blu violetto"},{ral:"5001",r:28,g:73,b:101,n:"Blu verdastro"},{ral:"5002",r:22,g:49,b:131,n:"Blu oltremare"},{ral:"5003",r:27,g:45,b:75,n:"Blu zaffiro"},{ral:"5004",r:25,g:30,b:42,n:"Blu nero"},{ral:"5005",r:0,g:77,b:128,n:"Blu segnale"},{ral:"5007",r:53,g:103,b:135,n:"Blu brillante"},{ral:"5008",r:38,g:49,b:57,n:"Blu grigiastro"},{ral:"5009",r:33,g:89,b:111,n:"Blu azzurro"},{ral:"5010",r:14,g:67,b:111,n:"Blu genziana"},{ral:"5011",r:26,g:36,b:54,n:"Blu acciaio"},{ral:"5012",r:28,g:125,b:174,n:"Blu luce"},{ral:"5013",r:25,g:36,b:63,n:"Blu cobalto"},{ral:"5014",r:91,g:112,b:140,n:"Blu colombo"},{ral:"5015",r:0,g:113,b:165,n:"Blu cielo"},{ral:"5017",r:0,g:73,b:122,n:"Blu traffico"},{ral:"5018",r:5,g:139,b:140,n:"Blu turchese"},{ral:"5019",r:0,g:85,b:121,n:"Blu Capri"},{ral:"5020",r:1,g:59,b:65,n:"Blu oceano"},{ral:"5021",r:0,g:103,b:110,n:"Blu acqua"},{ral:"5022",r:29,g:32,b:71,n:"Blu notte"},{ral:"5023",r:61,g:90,b:125,n:"Blu distante"},{ral:"5024",r:93,g:138,b:158,n:"Blu pastello"},{ral:"5025",r:33,g:73,b:82,n:"Blu genziana perlato"},{ral:"5026",r:15,g:31,b:46,n:"Blu notte perlato"},{ral:"6000",r:44,g:114,b:89,n:"Verde patina"},{ral:"6001",r:40,g:108,b:45,n:"Verde smeraldo"},{ral:"6002",r:39,g:91,b:40,n:"Verde foglia"},{ral:"6003",r:72,g:80,b:53,n:"Verde oliva"},{ral:"6004",r:1,g:69,b:63,n:"Verde bluastro"},{ral:"6005",r:14,g:58,b:41,n:"Verde muschio"},{ral:"6006",r:55,g:55,b:44,n:"Oliva grigiastro"},{ral:"6007",r:38,g:48,b:34,n:"Verde bottiglia"},{ral:"6008",r:48,g:46,b:37,n:"Verde brunastro"},{ral:"6009",r:33,g:48,b:35,n:"Verde abete"},{ral:"6010",r:61,g:123,b:49,n:"Verde erba"},{ral:"6011",r:102,g:125,b:86,n:"Verde reseda"},{ral:"6012",r:40,g:54,b:51,n:"Verde nero"},{ral:"6013",r:117,g:113,b:80,n:"Verde canna"},{ral:"6014",r:68,g:65,b:53,n:"Oliva giallo"},{ral:"6015",r:54,g:56,b:49,n:"Oliva nero"},{ral:"6016",r:0,g:101,b:71,n:"Verde turchese"},{ral:"6017",r:74,g:133,b:61,n:"Verde maggio"},{ral:"6018",r:80,g:158,b:47,n:"Verde giallo"},{ral:"6019",r:181,g:211,b:171,n:"Verde bianco"},{ral:"6020",r:46,g:59,b:42,n:"Verde ossido cromo"},{ral:"6021",r:131,g:157,b:113,n:"Verde pallido"},{ral:"6022",r:37,g:34,b:27,n:"Oliva marrone"},{ral:"6024",r:0,g:131,b:81,n:"Verde traffico"},{ral:"6025",r:83,g:111,b:53,n:"Verde felce"},{ral:"6026",r:0,g:89,b:79,n:"Verde opale"},{ral:"6027",r:123,g:193,b:184,n:"Verde luce"},{ral:"6028",r:39,g:84,b:63,n:"Verde pino"},{ral:"6029",r:0,g:105,b:53,n:"Verde menta"},{ral:"6032",r:31,g:118,b:75,n:"Verde segnale"},{ral:"6033",r:61,g:137,b:130,n:"Turchese menta"},{ral:"6034",r:119,g:181,b:183,n:"Turchese pastello"},{ral:"6035",r:28,g:84,b:45,n:"Verde elegante perlato"},{ral:"6036",r:15,g:61,b:50,n:"Verde opalo perlato"},{ral:"6037",r:0,g:141,b:52,n:"Verde puro"},{ral:"6038",r:0,g:181,b:26,n:"Verde brillante"},{ral:"7000",r:120,g:133,b:144,n:"Grigio vaio"},{ral:"7001",r:135,g:145,b:154,n:"Grigio argento"},{ral:"7002",r:123,g:121,b:99,n:"Grigio olivastro"},{ral:"7003",r:117,g:119,b:105,n:"Grigio muschio"},{ral:"7004",r:147,g:150,b:152,n:"Grigio segnale"},{ral:"7005",r:100,g:104,b:103,n:"Grigio topo"},{ral:"7006",r:115,g:108,b:95,n:"Grigio beige"},{ral:"7008",r:114,g:100,b:69,n:"Grigio kaki"},{ral:"7009",r:87,g:92,b:82,n:"Grigio verdastro"},{ral:"7010",r:84,g:89,b:85,n:"Grigio tenda"},{ral:"7011",r:67,g:75,b:84,n:"Grigio ferro"},{ral:"7012",r:81,g:89,b:93,n:"Grigio basalto"},{ral:"7013",r:78,g:74,b:62,n:"Grigio marrone"},{ral:"7015",r:67,g:70,b:77,n:"Grigio ardesia"},{ral:"7016",r:56,g:62,b:66,n:"Grigio antracite"},{ral:"7021",r:44,g:49,b:53,n:"Grigio nerastro"},{ral:"7022",r:69,g:69,b:62,n:"Grigio ombra"},{ral:"7023",r:119,g:125,b:116,n:"Grigio calcestruzzo"},{ral:"7024",r:69,g:74,b:81,n:"Grigio grafite"},{ral:"7026",r:47,g:56,b:60,n:"Grigio granito"},{ral:"7030",r:139,g:141,b:133,n:"Grigio pietra"},{ral:"7031",r:86,g:101,b:111,n:"Grigio bluastro"},{ral:"7032",r:177,g:178,b:166,n:"Grigio ghiaia"},{ral:"7033",r:122,g:130,b:116,n:"Grigio cemento"},{ral:"7034",r:141,g:138,b:113,n:"Grigio giallo"},{ral:"7035",r:197,g:199,b:196,n:"Grigio luce"},{ral:"7036",r:149,g:146,b:149,n:"Grigio platino"},{ral:"7037",r:120,g:123,b:123,n:"Grigio polvere"},{ral:"7038",r:176,g:178,b:174,n:"Grigio agata"},{ral:"7039",r:107,g:107,b:101,n:"Grigio quarzo"},{ral:"7040",r:145,g:150,b:156,n:"Grigio finestra"},{ral:"7042",r:141,g:146,b:149,n:"Grigio traffico A"},{ral:"7043",r:78,g:83,b:85,n:"Grigio traffico B"},{ral:"7044",r:182,g:180,b:170,n:"Grigio seta"},{ral:"7045",r:140,g:145,b:150,n:"Telegri 1"},{ral:"7046",r:127,g:132,b:138,n:"Telegri 2"},{ral:"7047",r:191,g:193,b:194,n:"Telegri 4"},{ral:"7048",r:129,g:123,b:115,n:"Grigio topo perlato"},{ral:"8000",r:131,g:104,b:63,n:"Marrone verdastro"},{ral:"8001",r:143,g:92,b:42,n:"Marrone ocra"},{ral:"8002",r:103,g:63,b:48,n:"Marrone segnale"},{ral:"8003",r:116,g:71,b:39,n:"Marrone fango"},{ral:"8004",r:135,g:63,b:46,n:"Marrone rame"},{ral:"8007",r:101,g:63,b:42,n:"Marrone capriolo"},{ral:"8008",r:104,g:73,b:38,n:"Marrone oliva"},{ral:"8011",r:84,g:50,b:34,n:"Marrone noce"},{ral:"8012",r:91,g:46,b:38,n:"Marrone rosso"},{ral:"8014",r:61,g:46,b:35,n:"Marrone seppia"},{ral:"8015",r:86,g:42,b:34,n:"Marrone castagna"},{ral:"8016",r:71,g:39,b:33,n:"Marrone mogano"},{ral:"8017",r:49,g:36,b:31,n:"Marrone cioccolato"},{ral:"8019",r:49,g:40,b:38,n:"Marrone grigiastro"},{ral:"8022",r:26,g:23,b:24,n:"Marrone nerastro"},{ral:"8023",r:155,g:83,b:44,n:"Marrone arancio"},{ral:"8024",r:114,g:78,b:63,n:"Marrone beige"},{ral:"8025",r:110,g:82,b:70,n:"Marrone pallido"},{ral:"8028",r:71,g:54,b:43,n:"Marrone terra"},{ral:"8029",r:118,g:60,b:46,n:"Rame perlato"},{ral:"9001",r:231,g:225,b:210,n:"Bianco crema"},{ral:"9002",r:214,g:214,b:209,n:"Bianco grigiastro"},{ral:"9003",r:236,g:239,b:238,n:"Bianco segnale"},{ral:"9004",r:27,g:28,b:30,n:"Nero segnale"},{ral:"9005",r:14,g:14,b:16,n:"Nero profondo"},{ral:"9006",r:161,g:161,b:160,n:"Alluminio brillante"},{ral:"9007",r:135,g:133,b:128,n:"Alluminio grigiastro"},{ral:"9010",r:241,g:240,b:234,n:"Bianco puro"},{ral:"9011",r:31,g:33,b:34,n:"Nero grafite"},{ral:"9016",r:241,g:246,b:246,n:"Bianco traffico"},{ral:"9017",r:29,g:31,b:32,n:"Nero traffico"},{ral:"9018",r:202,g:208,b:206,n:"Bianco papiro"},{ral:"9022",r:133,g:135,b:138,n:"Grigio perla perlato"},{ral:"9023",r:123,g:125,b:128,n:"Grigio scuro perlato"}];



let state = JSON.parse(localStorage.getItem('FR_PRO_FINAL')) || { cantieri: [], mag: [] };
let stream = null;
let currentZoom = 1, transX = 0, transY = 0, isDragging = false, startX, startY;

// LOGIN
function checkLogin() {
    if(document.getElementById('pass-input').value === "FR2025") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    }
}

// MODULI
function openMod(id) {
    document.getElementById('mod-'+id).style.display = 'flex';
    if(id === 'irina') initIrina();
    if(id === 'cantieri') renderCantieri();
    if(id === 'magazzino') renderMag();
}

function closeMod(id) {
    document.getElementById('mod-'+id).style.display = 'none';
    if(stream) stream.getTracks().forEach(t => t.stop());
}

// --- IRINA SPETTROMETRO ---
async function initIrina() {
    const v = document.getElementById('v');
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: 1280 } });
    v.srcObject = stream;
    v.style.display = 'block';
    document.getElementById('c-view').style.display = 'none';
    resetView();
}

function resetView() {
    currentZoom = 1; transX = 0; transY = 0;
    document.getElementById('zoom-range').value = 1;
    updateTransform();
}

function updateTransform() {
    const target = document.getElementById('v').style.display !== 'none' ? document.getElementById('v') : document.getElementById('c-view');
    target.style.transform = `translate(${transX}px, ${transY}px) scale(${currentZoom})`;
}

function handleZoom(v) { currentZoom = v; updateTransform(); }

// SPOSTAMENTO FOTO CON DITO
const camBox = document.getElementById('cam-container');
camBox.addEventListener('touchstart', e => {
    if(document.getElementById('v').style.display === 'none') {
        isDragging = true;
        startX = e.touches[0].clientX - transX;
        startY = e.touches[0].clientY - transY;
    }
});
camBox.addEventListener('touchmove', e => {
    if(isDragging) {
        transX = e.touches[0].clientX - startX;
        transY = e.touches[0].clientY - startY;
        updateTransform();
    }
}, {passive: false});
camBox.addEventListener('touchend', () => isDragging = false);

function analyzeImg(input) {
    const reader = new FileReader();
    const cv = document.getElementById('c-view');
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            cv.width = img.width; cv.height = img.height;
            cv.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('v').style.display = 'none';
            cv.style.display = 'block';
            resetView(); // BLOCCA LO ZOOM AUTOMATICO
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function takeReading() {
    const v = document.getElementById('v'), cv = document.getElementById('c-view'), ctx = cv.getContext('2d', {willReadFrequently:true});
    if (v.style.display !== 'none') {
        cv.width = v.videoWidth; cv.height = v.videoHeight;
        ctx.drawImage(v, 0, 0);
    }
    const p = ctx.getImageData(cv.width/2, cv.height/2, 1, 1).data;
    const r = p[0], g = p[1], b = p[2];
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    const match = RAL_DB.map(c => ({...c, d: Math.sqrt((r-c.r)**2+(g-c.g)**2+(b-c.b)**2)})).sort((a,b)=>a.d-b.d)[0];
    
    document.getElementById('color-preview').style.backgroundColor = hex;
    document.getElementById('out-text').innerHTML = `
        <div class="data-box">RAL: ${match.ral}</div><div class="data-box">HEX: ${hex}</div>
        <div class="data-box">RGB: ${r},${g},${b}</div><div class="data-box">SCR: ${(r/255).toFixed(2)},${(g/255).toFixed(2)}</div>
        <div class="data-box" style="grid-column:1/3">${match.n}</div>`;
}

// --- GESTIONE CANTIERI ---
function addCantiere() {
    const n = document.getElementById('c-nome').value; if(!n) return;
    state.cantieri.push({ id: Date.now(), nome: n, materiali: "", note: "", foto: [] });
    save(); renderCantieri(); document.getElementById('c-nome').value = "";
}

function renderCantieri() {
    document.getElementById('c-list').innerHTML = state.cantieri.map(c => `
        <div class="c-card">
            <div style="font-size:18px; margin-bottom:10px;"><b>📁 ${c.nome}</b></div>
            <label style="font-size:11px; font-weight:bold; color:var(--navy);">MATERIALI E PRODOTTI:</label>
            <textarea placeholder="Inserisci materiali..." onchange="updC(${c.id},'materiali',this.value)" style="height:60px; background:#fff;">${c.materiali || ''}</textarea>
            <label style="font-size:11px; font-weight:bold; color:var(--navy);">NOTE GENERALI:</label>
            <textarea placeholder="Note..." onchange="updC(${c.id},'note',this.value)" style="height:60px;">${c.note || ''}</textarea>
            <div class="foto-grid">${c.foto.map(f => `<img src="${f}" class="thumb">`).join('')}</div>
            <div class="btn-grid">
                <button class="btn-in" onclick="addF(${c.id},true)">FOTO</button>
                <button class="btn-out" onclick="addF(${c.id},false)">GALLERIA</button>
            </div>
        </div>`).reverse().join('');
}

function updC(id, f, v) { state.cantieri.find(x => x.id === id)[f] = v; save(); }

function addF(id, cam) {
    const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; if(cam) i.capture = 'environment';
    i.onchange = e => {
        const r = new FileReader();
        r.onload = () => { state.cantieri.find(x => x.id === id).foto.push(r.result); save(); renderCantieri(); };
        r.readAsDataURL(e.target.files[0]);
    };
    i.click();
}

// --- MAGAZZINO ---
function updStock(mode) {
    const n = document.getElementById('m-nome').value, q = parseInt(document.getElementById('m-qta').value), nt = document.getElementById('m-note').value;
    if(!n || isNaN(q)) return;
    let item = state.mag.find(x => x.nome === n);
    if(item) { item.qta = (mode==='IN'?item.qta+q:Math.max(0,item.qta-q)); item.note = nt; }
    else if(mode==='IN') state.mag.push({ nome: n, qta: q, note: nt });
    save(); renderMag();
}

function renderMag() {
    document.getElementById('m-list').innerHTML = state.mag.map(i => `
        <div class="c-card"><b>${i.nome}</b> - Q.tà: ${i.qta}<br><small>${i.note || ''}</small></div>`).join('');
}

function save() { localStorage.setItem('FR_PRO_FINAL', JSON.stringify(state)); }
