// --- FONCTIONS ASYNCHRONES DE STOCKAGE ---

/**
 * Récupère les données de masquage/agrandissement pour un domaine.
 * @param {string} hostnameKey - La clé de l'hôte (domaine) dans le stockage.
 * @returns {Promise<{hidden: string[], expanded: string[]}>} L'objet contenant les deux listes.
 */
async function getRules(hostnameKey) {
    try {
        const result = await chrome.storage.local.get(hostnameKey);
        const data = result[hostnameKey] || {};
        return {
            hidden: data.hidden || [],
            expanded: data.expanded || []
        };
    } catch (error) {
        console.error("Error retrieving rules from storage:", error);
        return { hidden: [], expanded: [] };
    }
}

// --- GESTION DE L'ÉTAT LORS DU CHARGEMENT DE PAGE ---

// Listener pour les mises à jour des onglets (chargement de page/rechargement)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // On s'intéresse uniquement lorsque la page a fini de charger et que l'URL est valide.
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        
        let urlKey;
        try {
            const url = new URL(tab.url);
            // Utiliser le hostname (domaine.com) comme clé de stockage pour le nettoyage site-wide
            urlKey = url.hostname; 
        } catch (e) {
            console.error("Invalid URL:", tab.url);
            return;
        }

        // 1. Récupérer les règles stockées pour ce site
        const rules = await getRules(urlKey);
        
        // 2. Mettre à jour le badge de l'icône
        if (rules.hidden.length > 0 || rules.expanded.length > 0) {
            // Indique que des filtres sont actifs
            chrome.action.setBadgeText({text: "ON", tabId: tabId});
            chrome.action.setBadgeBackgroundColor({color: "#FFD700", tabId: tabId}); // Gold
        } else {
            // Aucune règle pour ce site
            chrome.action.setBadgeText({text: "", tabId: tabId});
        }
    }
});

// --- GESTION DES MESSAGES (POUR OUVRIR LE MODE LECTURE) ---

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // NOUVEAU: Gère l'ouverture du Mode Lecture Isolé (Focus Reader)
    if (request.action === "open_reader_tab") {
        // Crée une Data URI à partir du HTML généré
        const htmlDataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(request.html);
        
        // Ouvre un nouvel onglet avec la Data URI
        chrome.tabs.create({ url: htmlDataUri })
            .then(() => {
                sendResponse({ success: true, message: 'Reader tab created.' });
            })
            .catch(error => {
                console.error("Error creating reader tab:", error);
                sendResponse({ success: false, message: 'Could not create tab.' });
            });
        
        // Retourne true pour indiquer que sendResponse sera appelé de manière asynchrone
        return true; 
    }
});