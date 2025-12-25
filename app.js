// Gestione apertura e chiusura modali
function openMod(id) {
    const modal = document.getElementById('mod-' + id);
    if (modal) modal.style.display = 'flex';
}

function closeMod(id) {
    const modal = document.getElementById('mod-' + id);
    if (modal) modal.style.display = 'none';
}

// Chiudi modale cliccando fuori
window.onclick = function(event) {
    if (event.target.className === 'modal-overlay') {
        event.target.style.display = 'none';
    }
}
