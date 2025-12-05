# 🛰️ NIRD Shuttle : Le Village Résistant

![NIRD Shuttle Logo](https://your-logo-url-if-any)  
**Thème : Black & Gold – Résistance & Élégance**  
_Nettoyez le web comme VOUS l'entendez !_

---

NIRD Shuttle est une extension de navigateur conçue pour **reprendre le contrôle de votre expérience web**. Face à la pollution numérique (publicités intrusives, distractions, mises en page inutiles), **NIRD agit comme un bouclier personnel**, vous permettant de _sculpter le web selon vos propres règles_.

> Inspiré par un thème **Black & Gold**, NIRD Shuttle se concentre sur trois piliers :  
> **Personnalisation • Concentration • Sécurité**

---

## ✨ Fonctionnalités Clés

| Icône | Fonctionnalité             | Description                                                                                                                                                                       |
|:-----:|:--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⚔️    | **Cibler & Détruire**<br/>(Mode HIDE)  | Masquez définitivement tout élément indésirable (barres latérales, popups, bannières) d'un simple clic.<br/>Les règles sont sauvegardées et appliquées automatiquement à chaque visite.  |
| 🔍    | **Cibler & Agrandir**<br/>(Mode EXPAND)| Isolez le contenu principal d’une section trop petite (par ex. un graphique ou un bloc de texte) et mettez-le en plein écran, en estompant le reste de la page.                   |
| 📖    | **Mode Lecture Isolé**<br/>(Focus Reader) | Extrait le texte principal de l’article, le nettoie de toute distraction et l’ouvre dans un nouvel onglet minimaliste **Black & Gold** pour une concentration maximale.             |
| 🛡️    | **Blocage d'Ads Intrusifs**| Utilise l’API `declarativeNetRequest` pour bloquer les requêtes publicitaires et de traqueurs. Protection similaire à uBlock Origin.                                              |
| 🔄    | **Toggle Avant/Après**     | Activez/désactivez tous les filtres de NIRD Shuttle en un clic pour comparer la page originale et votre version épurée.                                                           |

---

## 🛠️ Installation et Utilisation

### 1. Installation Développeur (Chrome/Firefox)

- **Clonez** ce dépôt ou téléchargez les fichiers de l'extension.
- Ouvrez votre navigateur :

<details>
<summary><strong>Chrome</strong></summary>

1. Rendez-vous sur `chrome://extensions`
2. Activez le mode développeur (Developer Mode).
3. Cliquez sur **Load unpacked** et sélectionnez le dossier racine du projet (`NIRD Shuttle`).
</details>

<details>
<summary><strong>Firefox</strong></summary>

1. Rendez-vous sur `about:debugging#/runtime/this-firefox`
2. Cliquez sur **Load Temporary Add-on**.
3. Sélectionnez le fichier `manifest.json` dans le dossier racine.
</details>

:L’icône NIRD Shuttle (souvent un bouclier Noir & Or) apparaît dans la barre d’outils.

---

### 2. Modes d’Opération

1. **Cliquez sur l’icône** de l’extension pour ouvrir le panneau.
2. Choisissez un **Mode d’Intervention** :
    - _Cibler & Détruire_
    - _Cibler & Agrandir_
3. Le popup se ferme et le mode s’active.  
   Un indicateur flottant _(Black & Gold)_ s’affiche pour confirmer le mode.
4. **Survolez** les éléments à affecter sur la page (_masquer_ ou _agrandir_).
5. **Cliquez** pour appliquer la règle instantanément :  
   la règle est sauvegardée dans votre « Village Archive » pour l’URL.

---

## ⚙️ Architecture du Projet

Projet **Manifest V3** – architecture standard navigateur.

| Fichier          | Rôle                                      | Notes                                                                   |
|------------------|-------------------------------------------|-------------------------------------------------------------------------|
| `manifest.json`  | Configuration de l’extension              | Permissions (`declarativeNetRequest`, `storage`, `activeTab`) etc.      |
| `popup.html`     | UI du popup                               | Thème Black & Gold + boutons modes/options.                             |
| `popup.js`       | Logique UI popup                          | Gère messages d’activation vers le content script.                      |
| `content.js`     | Script de contenu (page web)              | Mouseover, Click, sélecteurs, CSS dynamique, Focus Reader.              |
| `background.js`  | Service Worker                            | Stockage des règles, badge ON/OFF, ouverture Focus Reader.              |
| `rules.json`     | Règles de blocage                         | Utilisé par l’API `declarativeNetRequest` pour l’adblock réseau.        |

---

## 🛣️ Contributions Futures

:bulb: **Quelques idées pour améliorer le Village :**

- Implémenter une liste d’Ad-Block plus complète.
- Ajouter une interface graphique pour gérer les sélecteurs sauvegardés.
- Optimiser l’algorithme de détection du contenu principal (Focus Reader).

---

> **NIRD Shuttle** : _Résistez à la pollution numérique, reprenez le pouvoir sur votre web._

---

<div align="center">
  <img src="https://svgshare.com/i/15j5.svg" width="80" alt="Black & Gold Shield"/>
  <br>
  <strong>Rejoignez la résistance.</strong>
</div>
