// Navigazione
function nav(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + screenId)?.classList.add('active');
    if(screenId === 'dashboard') document.getElementById('dashboard').classList.add('active');
}

// Gestione Magazzino (Sezioni Separate)
let magazzino = { materiali: [], attrezzature: [] };
function tabMag(tipo) {
    const content = document.getElementById('magazzino-content');
    let lista = magazzino[tipo];
    content.innerHTML = lista.map(item => `
        <div class="card-item">
            <strong>${item.nome}</strong> <span>Q.tà: ${item.qta}</span>
            <p>Note: ${item.note}</p>
            <button onclick="flusso('${tipo}', '${item.nome}', 'in')">In (+)</button>
            <button onclick="flusso('${tipo}', '${item.nome}', 'out')">Out (-)</button>
        </div>
    `).join('') || '<p class="p-20">Nessun articolo registrato.</p>';
}

// Gestione Cantieri & PDF
function capture() {
    const mode = currentCamMode; // 'photo' o 'doc'
    if(mode === 'doc') {
        // Logica per scansione e conversione automatica PDF
        const doc = new jspdf.jsPDF();
        doc.text("Report Cantiere FR Color", 10, 10);
        // Qui acquisiamo l'immagine Ultra HD dal video stream
        doc.save(`Doc_${Date.now()}.pdf`);
    } else {
        // Salvataggio foto Ultra HD in galleria cantiere
    }
}

// Integrazione AI [cite: 2025-12-19]
function openAI(assistente) {
    const prompt = assistente === 'irina' ? "Ciao Irina (Gemini), analizza questo..." : "Ciao Carla (GPT), dammi un consiglio su...";
    alert(prompt);
}

// Funzione Tasto X (Link Esterno)
function openX() {
    window.open('https://frcolor-simulatore.it', '_blank');
}
