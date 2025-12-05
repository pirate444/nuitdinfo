document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Nouveaux IDs inclus
  const btnHide = document.getElementById('btn-mode-hide');
  const btnExpand = document.getElementById('btn-mode-expand');
  const btnReader = document.getElementById('btn-mode-reader'); // NOUVEAU
  const btnResetSite = document.getElementById('btn-reset-site');
  const btnResetAll = document.getElementById('btn-reset-all');
  const chkActive = document.getElementById('chk-toggle-active');
  const btnShowSites = document.getElementById('btn-show-sites');
  const listContainer = document.getElementById('sites-list');

  // --- ACTIONS ---

  // Mode CIBLER & DÉTRUIRE
  btnHide.addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_mode", mode: "HIDE" });
    window.close();
  });

  // Mode CIBLER & AGRANDIR
  btnExpand.addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_mode", mode: "EXPAND" });
    window.close();
  });
  
  // Mode LECTURE ISOLÉ (NOUVEAU)
  btnReader.addEventListener('click', () => {
    // Envoi de la demande d'activation du lecteur
    chrome.tabs.sendMessage(tab.id, { action: "activate_reader" });
    window.close();
  });

  // Reset Site Courant
  btnResetSite.addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, { action: "reset_site" });
  });

  // Reset Total
  btnResetAll.addEventListener('click', () => {
    if(confirm("⚠ ATTENTION : Cela effacera toute la mémoire du village.\nConfirmer le Reset Total ?")) {
      chrome.storage.local.clear();
      chrome.tabs.reload(tab.id);
    }
  });

  // Toggle ON/OFF (Avant/Après)
  chkActive.addEventListener('change', (e) => {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_cleaning_state", active: e.target.checked });
  });

  // --- LIST HANDLING ---

  btnShowSites.addEventListener('click', async () => {
    if (listContainer.style.display === 'block') {
      listContainer.style.display = 'none';
      btnShowSites.innerText = "Voir les archives de résistance ▼";
      return;
    }
    
    listContainer.style.display = 'block';
    btnShowSites.innerText = "Masquer les archives ▲";
    listContainer.innerHTML = '<div style="padding:10px; color:#666;">Chargement...</div>';

    const allData = await chrome.storage.local.get(null);
    const siteKeys = Object.keys(allData).filter(k => k.includes('.')); 

    listContainer.innerHTML = '';
    if (siteKeys.length === 0) {
      listContainer.innerHTML = '<div class="site-item" style="justify-content:center; opacity:0.5;">Aucun secteur libéré.</div>';
    } else {
      siteKeys.forEach(key => {
        const div = document.createElement('div');
        div.className = 'site-item';
        const displayKey = key.length > 25 ? key.substring(0, 22) + '...' : key;
        
        div.innerHTML = `
          <span>${displayKey}</span> 
          <span class="site-remove" data-key="${key}" title="Oublier ce site">✖</span>
        `;
        listContainer.appendChild(div);
      });
    }

    document.querySelectorAll('.site-remove').forEach(x => {
      x.addEventListener('click', async (e) => {
        const keyToRemove = e.target.getAttribute('data-key');
        await chrome.storage.local.remove(keyToRemove);
        e.target.parentElement.remove();
        if (tab.url.includes(keyToRemove)) {
            chrome.tabs.reload(tab.id);
        }
      });
    });
  });
});