let currentMode = null; // 'HIDE', 'EXPAND', ou null
let isCleaningActive = true;
let hiddenSelectors = [];
let expandedSelectors = [];

const hostname = window.location.hostname;


chrome.storage.local.get([hostname], (result) => {
  if (result[hostname]) {
    const data = result[hostname];
    hiddenSelectors = data.hidden || [];
    expandedSelectors = data.expanded || [];
    applyRules(); 
  }
});

// --- ECOUTE DES MESSAGES DU POPUP ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle_mode") {
    // Désactiver le mode actuel s'il est cliqué à nouveau, sinon basculer vers le nouveau mode.
    currentMode = (currentMode === request.mode) ? null : request.mode;
    showFloatingIndicator(currentMode);
  } 
  else if (request.action === "reset_site") {
    chrome.storage.local.remove([hostname], () => location.reload());
  }
  else if (request.action === "toggle_cleaning_state") {
    isCleaningActive = request.active;
    applyRules(); // Réapplique ou retire le CSS
    showFloatingIndicator(currentMode); // Met à jour l'indicateur si un mode est actif
  }
  else if (request.action === "activate_reader") {
    activateReaderMode();
  }
});

// --- INTERACTION SOURIS (UNIQUEMENT SI UN MODE EST ACTIF) ---
document.addEventListener('mouseover', (e) => {
  if (!currentMode) return;
  e.target.classList.add('nird-target');
});

document.addEventListener('mouseout', (e) => {
  if (!currentMode) return;
  e.target.classList.remove('nird-target');
});

document.addEventListener('click', (e) => {
  if (!currentMode) return;
  e.preventDefault(); // Empêche le clic d'activer un lien
  e.stopPropagation(); // Empêche l'événement de remonter

  const target = e.target;
  target.classList.remove('nird-target');
  const selector = getUniqueSelector(target);

  // 1. Gérer le mode HIDE
  if (currentMode === 'HIDE') {
    // Ajout si absent, ou suppression si déjà présent (pour annuler un clic)
    const index = hiddenSelectors.indexOf(selector);
    if (index > -1) {
      hiddenSelectors.splice(index, 1);
      console.log(`[NIRD] Annulation Masquage: ${selector}`);
    } else {
      hiddenSelectors.push(selector);
      // S'assurer qu'il n'est pas dans les agrandis
      const expandIndex = expandedSelectors.indexOf(selector);
      if (expandIndex > -1) expandedSelectors.splice(expandIndex, 1);

      console.log(`[NIRD] Masqué: ${selector}`);
    }
  } 
  // 2. Gérer le mode EXPAND
  else if (currentMode === 'EXPAND') {
     const index = expandedSelectors.indexOf(selector);
    if (index > -1) {
      expandedSelectors.splice(index, 1);
      console.log(`[NIRD] Annulation Agrandissement: ${selector}`);
    } else {
      expandedSelectors.push(selector);
      // S'assurer qu'il n'est pas dans les masqués
      const hideIndex = hiddenSelectors.indexOf(selector);
      if (hideIndex > -1) hiddenSelectors.splice(hideIndex, 1);

      console.log(`[NIRD] Agrandi: ${selector}`);
    }
  }

  saveToStorage();
  applyRules(); // Appliquer immédiatement
  
  // Le mode reste actif jusqu'à ce que l'utilisateur le désactive.
});

// --- FONCTIONS DE GESTION DE RÈGLES ---

function saveToStorage() {
  const data = {
    hidden: hiddenSelectors,
    expanded: expandedSelectors
  };
  chrome.storage.local.set({ [hostname]: data });
}

function applyRules() {
  // Retirer l'ancien style s'il existe
  const oldStyle = document.getElementById('nird-style-block');
  if (oldStyle) oldStyle.remove();

  if (!isCleaningActive) return; // Si "Désactivé", on s'arrête là (Mode Avant/Après)

  const style = document.createElement('style');
  style.id = 'nird-style-block';
  let cssRules = "";

  // 1. Générer CSS Masquage
  if (hiddenSelectors.length > 0) {
    cssRules += hiddenSelectors.join(', ') + ' { display: none !important; }\n';
  }

  // 2. Générer CSS Agrandissement
  if (expandedSelectors.length > 0) {
    expandedSelectors.forEach(sel => {
      // Les règles pour agrandir et mettre en valeur
      cssRules += `
        ${sel} { 
          width: 100% !important; 
          max-width: 100% !important; 
          position: relative !important; 
          z-index: 10000 !important; 
          margin: 0 !important;
          padding: 20px !important;
          /* Effet "Cinéma mode": fonce l'arrière-plan */
          box-shadow: 0 0 0 100vmax rgba(0,0,0,0.85) !important; 
        }
      `;
    });
  }

  style.textContent = cssRules;
  document.head.appendChild(style);
}

function showFloatingIndicator(mode) {
  let div = document.getElementById('nird-indicator');
  
  if (!isCleaningActive) {
      if (div) div.remove();
      return;
  }
  
  if (!mode) {
    // Si pas de mode actif, on affiche un indicateur passif
    if (div) div.remove();
    
    // Ajout optionnel: afficher l'état si des règles sont appliquées
    if (hiddenSelectors.length > 0 || expandedSelectors.length > 0) {
        if (!div) {
            div = document.createElement('div');
            div.id = 'nird-indicator';
            document.body.appendChild(div);
        }
        div.innerText = `✅ FILTRES ACTIFS`;
        div.style.borderColor = '#B8860B';
        div.style.color = '#B8860B';
        div.style.backgroundColor = '#000000';
    }
    return;
  }
  
  if (!div) {
    div = document.createElement('div');
    div.id = 'nird-indicator';
    document.body.appendChild(div);
  }
  
  if (mode === 'HIDE') {
    div.innerText = '⚔️ MODE DESTRUCTION (CLIC POUR MASQUER/ANNULER)';
    div.style.borderColor = '#FFD700';
    div.style.color = '#FFD700';
    div.style.backgroundColor = '#000000';
  } else {
    div.innerText = '🔍 MODE AGRANDISSEMENT (CLIC POUR AGRANDIR/ANNULER)';
    div.style.borderColor = '#DAA520';
    div.style.color = '#DAA520';
    div.style.backgroundColor = '#000000';
  }
}

// --- ALGORYTHME DE SÉLECTION UNIQUE ---

function getUniqueSelector(el) {
  if (el.id) return '#' + el.id;
  
  let path = [];
  while (el.parentNode && el.tagName !== 'BODY' && el.tagName !== 'HTML') {
    let tagName = el.tagName.toLowerCase();
    let siblingIndex = 1;
    let sibling = el;
    
    while (sibling.previousElementSibling) {
      sibling = sibling.previousElementSibling;
      siblingIndex++;
    }
    
    // Utiliser l'index du n-ième enfant
    path.unshift(`${tagName}:nth-child(${siblingIndex})`);
    el = el.parentNode;
    
    // Arrêter si un parent a un ID
    if (el.id) {
      path.unshift('#' + el.id);
      break;
    }
  }
  return path.join(' > ');
}


// --- NOUVELLE FONCTION: MODE LECTURE ISOLÉ ---

function activateReaderMode() {
    // 1. Trouver le contenu principal (heuristique: le bloc avec le plus de <p>)
    let mainContent = document.body;
    let maxParagraphs = 0;
    
    // Sélectionne les conteneurs courants de contenu
    const contentCandidates = document.querySelectorAll('main, article, [role="main"], #content, .post-content, .entry-content, .container, .wrapper');

    contentCandidates.forEach(el => {
        // Compte les paragraphes et les titres dans l'élément
        const count = el.querySelectorAll('p, h2, h3, h4').length;
        if (count > maxParagraphs) {
            maxParagraphs = count;
            mainContent = el;
        }
    });

    // Prendre le clone du contenu trouvé
    const clonedContent = mainContent.cloneNode(true);
    
    // 2. Assainir le contenu (nettoyer les éléments non pertinents)
    const cleanupSelectors = 'script, style, iframe, form, noscript, header, footer, nav, aside, [class*="ad"], [id*="comment"], [id*="sidebar"], [class*="social"], [role="navigation"]';
    clonedContent.querySelectorAll(cleanupSelectors).forEach(el => el.remove());

    // Utiliser un conteneur temporaire pour récupérer le HTML assaini
    const container = document.createElement('div');
    container.innerHTML = clonedContent.innerHTML;

    // 3. Récupérer le titre de la page et l'URL
    const pageTitle = document.title;
    const originalUrl = window.location.href;

    // 4. Générer le HTML du mode lecture avec le thème Black & Gold
    const readerHTML = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>NIRD Reader: ${pageTitle}</title>
            <style>
                body {
                    background-color: #000000; 
                    font-family: Georgia, serif; 
                    line-height: 1.65;
                    padding: 50px 0;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    color: #fff; /* Base text color for better readability on black */
                }
                .reader-container {
                    width: 100%;
                    max-width: 800px; 
                    padding: 40px;
                    margin: 0 20px;
                    background-color: #0a0a0a;
                    border: 1px solid #333;
                    box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
                }
                h1 {
                    color: #FFD700;
                    font-size: 2.2em;
                    margin-bottom: 25px;
                    border-bottom: 2px solid #B8860B;
                    padding-bottom: 15px;
                    text-shadow: 0 0 5px rgba(255, 215, 0, 0.2);
                }
                h2, h3, h4 {
                    color: #DAA520;
                    margin-top: 25px;
                    border-left: 3px solid #DAA520;
                    padding-left: 10px;
                }
                p, li {
                    font-size: 1.1em;
                    margin-bottom: 1.2em;
                    color: #ccc;
                }
                a {
                    color: #FFD700;
                    text-decoration: none;
                }
                a:hover {
                    border-bottom: 1px solid #FFD700;
                }
                img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 30px auto;
                    border: 1px solid #333;
                }
                .nird-footer {
                    margin-top: 40px;
                    padding-top: 15px;
                    border-top: 1px solid #333;
                    font-size: 0.8em;
                    color: #666;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="reader-container">
                <h1>${pageTitle}</h1>
                ${container.innerHTML}
                <div class="nird-footer">
                    Lecture isolée par NIRD Shuttle.<br>
                    <a href="${originalUrl}" target="_blank">Retour à la page originale</a>.
                </div>
            </div>
        </body>
        </html>
    `;
    chrome.runtime.sendMessage({
        action: "open_reader_tab",
        html: readerHTML
    });
}