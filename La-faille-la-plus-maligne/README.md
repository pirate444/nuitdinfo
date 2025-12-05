# 🎮 HIKORN Platform : Le Guide du Hacker Éthique !

> **Mission** : Devenir un expert en cybersécurité en s'amusant ! 🚀

---

## 🎭 L'Histoire : Bienvenue au Village HIKORN

Il était une fois, un village numérique résistant face aux géants de la tech...

Dans ce village, **VOUS** êtes le héros ! Votre mission : découvrir une faille de sécurité cachée et apprendre à protéger le village contre les attaques.

**Mais attention** : Cette faille n'est pas cachée dans un donjon sombre. Elle est **juste là**, sous vos yeux. Serez-vous assez malin(e) pour la trouver ? 🕵️

---

## 🎯 ÉTAPE 1 : Infiltration du Village

### Comment entrer ?

1. **Ouvrez l'application** (c'est gratuit, on n'est pas des Big Tech nous !)
2. **Choisissez votre personnage** :
   - 👨‍🎓 **Étudiant** (`student` / `pass123`) - Parfait pour débuter !
   - 👩‍🏫 **Prof** (`teacher` / `teacher123`) - Vous avez plus de privilèges
   - 👨‍💼 **Admin** (`admin` / `admin123`) - Le boss final... ou pas ?

> 💡 **Astuce de Pro** : Commencez avec l'étudiant. C'est plus amusant de partir de rien !

### Ce qui se passe en coulisses...

Quand vous vous connectez, le village fait une **GROSSE ERREUR** :

```javascript
// 🚨 CODE VULNÉRABLE (Ne faites JAMAIS ça !)
localStorage.setItem('userId', user.id);
```

**Traduction** : "Hey, on va stocker ton ID dans un endroit que TU PEUX MODIFIER !"

C'est comme si on vous donnait les clés du coffre-fort et qu'on vous disait :
> "Promets-nous de ne pas l'ouvrir !" 😅

---

## 🔓 ÉTAPE 2 : La Grande Découverte

### Mission : Trouver la Porte Secrète

Une fois connecté, vous voyez votre **profil utilisateur**. Tout semble normal...

**MAIS !** Il y a un petit bouton mystérieux : 👁️ (l'œil)

**Cliquez dessus !**

### 🎉 BOOM ! Le Mode Hacker

Vous venez d'activer le **Mode Détective** ! 🕵️

Maintenant, vous voyez :
- Votre **username** (normal)
- Votre **role** (étudiant)
- Votre **User ID** stocké dans le localStorage (AH HA !)

### Le Moment de Vérité

Vous voyez ce champ qui dit : *"Tester l'accès à un autre utilisateur"* ?

**C'est là que la magie opère !**

Essayez de taper :
- `2` pour voir les données du prof
- `3` pour voir les données de l'admin (LE JACKPOT !)

Puis cliquez sur **"Accéder"** et...

---

## 💰 ÉTAPE 3 : Le Trésor Caché

### 🎊 BRAVO ! Vous l'avez trouvé !

Quand vous accédez à l'ID `3` (l'admin), vous découvrez :

```json
{
  "username": "admin",
  "role": "admin",
  "secretData": "FLAG{broken_access_control_discovered}",
  "secretVault": "🔐 Le trésor de HIKORN est protégé... ou pas ?"
}
```

**JACKPOT !** 💎

Vous venez officiellement de :
1. ✅ Hacker le système (légalement, c'est pour apprendre !)
2. ✅ Découvrir le flag secret
3. ✅ Gagner **100 points** 🏆
4. ✅ Débloquer le badge "Expert Sécurité" 🔓

### Pourquoi ça marche ?

Parce que l'application fait une erreur MONUMENTALE :

```javascript
// ❌ Pas de vérification !
const getUserData = (userId) => {
  return users.find(u => u.id === parseInt(userId));
  // N'importe qui peut demander n'importe quelle donnée !
}
```

C'est comme un bibliothécaire qui vous donnerait **N'IMPORTE QUEL** dossier sans vérifier votre identité !

---

## 🎓 ÉTAPE 4 : L'École de Sécurité

### Comprendre ce qui s'est passé (avec des pizzas 🍕)

Imaginez que vous commandez une pizza :

#### ❌ Version VULNÉRABLE :
1. Vous appelez : "Je suis le client numéro 1"
2. Pizzeria : "OK, voici TOUTES les commandes du client 1"
3. Vous : "Attendez... et si je disais que je suis le client numéro 42 ?"
4. Pizzeria : "Voici les commandes du client 42 !"
5. **Résultat** : Vous voyez les pizzas de tout le monde ! 🍕🍕🍕

#### ✅ Version SÉCURISÉE :
1. Vous appelez : "Je suis le client numéro 1"
2. Pizzeria : "Prouvez-le avec votre code secret"
3. Vous donnez le code : `JWT_TOKEN_SUPER_SECRET`
4. Pizzeria vérifie : "OK, c'est bien vous, voici VOS commandes"
5. Vous : "Et pour le client 42 ?"
6. Pizzeria : "Désolé, vous n'avez pas l'autorisation !"
7. **Résultat** : Chacun voit seulement SES pizzas ! 🍕✅

---

## ⚔️ ÉTAPE 5 : Le Combat Épique

### Code Vulnérable VS Code Sécurisé

#### 🔴 Le Méchant (Code Vulnérable)

```javascript
// 💀 TEAM DARKSIDE
const getUserData = (userId) => {
  // Pas de vérif = CHAOS !
  return users.find(u => u.id === parseInt(userId));
};

// Stockage dans localStorage = DANGEREUX !
localStorage.setItem('userId', user.id);
```

**Pouvoir** : Aucun  
**Faiblesse** : TOUT  
**Citation** : "Fais-moi confiance bro" 🤡

---

#### 🟢 Le Héros (Code Sécurisé)

```javascript
// 🛡️ TEAM SECURITY
app.get('/api/user/:id', authenticateToken, (req, res) => {
  const requestedId = req.params.id;
  const currentUserId = req.user.id; // Du token JWT
  
  // VÉRIFICATION DE OUF !
  if (requestedId !== currentUserId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé !' });
  }
  
  // OK, tu peux passer
  res.json(getUserData(requestedId));
});
```

**Pouvoir** : MAXIMUM  
**Faiblesse** : Aucune  
**Citation** : "Tu ne passeras pas !" 🧙‍♂️

---

## 🏆 Les 5 Commandements du Hacker Éthique

### 1️⃣ Ne JAMAIS Faire Confiance au Client
> "Le client est roi... mais aussi un menteur potentiel !" 😅

**Exemple** :
- ❌ "Je te promets que je suis admin" (côté client)
- ✅ "Prouve-le avec un token signé" (côté serveur)

---

### 2️⃣ TOUJOURS Vérifier Côté Serveur
> "Le serveur, c'est le videur du club. Il vérifie TOUTES les cartes d'identité."

**Exemple** :
```javascript
// ❌ Vérif côté client (modifiable !)
if (user.role === 'admin') { /* ... */ }

// ✅ Vérif côté serveur (fiable !)
if (req.user.role === 'admin') { /* ... */ }
```

---

### 3️⃣ Utiliser des Tokens Sécurisés (JWT + HTTPS)
> "Un token JWT, c'est comme un passeport diplomatique. Difficile à falsifier !"

**Exemple** :
```javascript
// ✅ Créer un token JWT
const token = jwt.sign(
  { id: user.id, role: user.role },
  'SECRET_SUPER_SECRET',
  { expiresIn: '24h' }
);
```

---

### 4️⃣ Principe du Moindre Privilège
> "Donne seulement ce qui est nécessaire. Pas plus, pas moins."

**Exemple** :
- Étudiant : Voir son profil ✅ | Voir tous les profils ❌
- Prof : Voir ses classes ✅ | Voir la compta ❌
- Admin : TOUT voir ✅ (mais avec responsabilité !)

---

### 5️⃣ Logger les Tentatives Suspectes
> "Si quelqu'un essaie 10 fois le même mot de passe, c'est louche !" 🚨

**Exemple** :
```javascript
// Logger chaque tentative d'accès
logger.info(`User ${userId} accessed profile ${requestedId}`);

// Alerter si comportement suspect
if (failedAttempts > 5) {
  alert.send('Tentative de hack détectée !');
}
```

---

## 🎮 Mini-Jeux & Défis

### Quiz Rapide : Es-tu un Hacker ou un Noob ?

**Question 1** : Où doit-on stocker les données sensibles ?
- A) localStorage 😱
- B) Cookie non-sécurisé 😱😱
- C) Cookie httpOnly + HTTPS 🎉
- D) Variable globale 💀

**Réponse** : C ! Les autres sont des pièges !

---

**Question 2** : Qu'est-ce que "Broken Access Control" ?
- A) Un contrôleur cassé 🎮
- B) Une faille qui permet d'accéder à des données non autorisées 🎯
- C) Un problème de WiFi 📡
- D) Un bug dans Excel 📊

**Réponse** : B ! Et c'est la faille #1 de l'OWASP Top 10 !

---

**Question 3** : Si tu vois ce code, que fais-tu ?
```javascript
localStorage.setItem('isAdmin', 'true');
```
- A) Tu applaudis 👏
- B) Tu cries "AU FEU !" 🔥
- C) Tu démissionnes 😅
- D) Tu corriges immédiatement ✅

**Réponse** : D (et peut-être un peu de B) !

---

## 🎨 Pourquoi C'est Amusant ET Important ?

### 🎉 C'est Amusant Parce Que :

1. **Gamification** : Points, badges, défis !
2. **Histoire** : Vous êtes le héros du village HIKORN
3. **Interactivité** : Cliquez, explorez, découvrez
4. **Récompenses** : Débloquez des secrets
5. **Compétition** : Montez dans le classement

### 🛡️ C'est Important Parce Que :

#### Dans la Vraie Vie, Cette Faille Peut :

1. **Voler des données bancaires** 💳
   - Accès aux comptes d'autres utilisateurs
   - Transactions frauduleuses

2. **Exposer des données médicales** 🏥
   - Violation du secret médical
   - Amendes RGPD (jusqu'à 4% du CA !)

3. **Compromettre des entreprises** 🏢
   - Espionnage industriel
   - Perte de confiance des clients

4. **Ruiner des vies** 😰
   - Vol d'identité
   - Chantage avec données personnelles

---

## 🌟 Statistiques Choc

### Selon l'OWASP (2021) :

- **94%** des applications ont des problèmes d'accès 😱
- **Broken Access Control** est la faille **#1** mondiale 🥇
- Plus de **318,000** CVEs liées à cette faille 📈
- Coût moyen d'une violation : **4.24 millions $** 💰

### En France :

- **+67%** d'attaques en 2024 vs 2023 📊
- **1 entreprise sur 3** a été victime 🎯
- Temps moyen de détection : **207 jours** ⏰

---

## 🎓 Ressources pour Aller Plus Loin

### 📚 Apprendre :

1. **OWASP Top 10** - La Bible de la sécurité web
   - [https://owasp.org/Top10/](https://owasp.org/Top10/)

2. **WebGoat** - Apprendre en hackant (légalement !)
   - [https://owasp.org/www-project-webgoat/](https://owasp.org/www-project-webgoat/)

3. **HackTheBox** - Challenges de sécurité
   - [https://www.hackthebox.com/](https://www.hackthebox.com/)

### 🛠️ Outils :

1. **Burp Suite** - Tester les failles
2. **OWASP ZAP** - Scanner de sécurité
3. **Postman** - Tester les APIs
4. **DevTools** - Le meilleur ami du hacker

---

## 🤝 Rejoindre la Communauté HIKORN

### Pourquoi HIKORN ?

- 🌱 **Durable** : Prolonger la vie du matériel
- 🆓 **Libre** : Logiciels open-source
- 🎓 **Éducatif** : Apprendre ensemble
- 🛡️ **Sécurisé** : Contrôle sur nos données

### Comment Participer ?

1. **Visitez** : [https://HIKORN.forge.apps.education.fr/](https://HIKORN.forge.apps.education.fr/)
2. **Partagez** vos ressources
3. **Contribuez** au code
4. **Formez** d'autres personnes

---

## 🎉 Félicitations, Hacker !

Vous avez :
- ✅ Découvert une vraie faille de sécurité
- ✅ Compris comment l'exploiter
- ✅ Appris à vous en protéger
- ✅ Gagné 100+ points
- ✅ Rejoint la résistance numérique !

### Prochaines Missions :

1. 🐧 Installer Linux sur un vieux PC
2. 📚 Partager une ressource libre
3. 🌱 Calculer votre empreinte carbone numérique
4. 👥 Convaincre votre établissement de rejoindre HIKORN

---

## 💬 Citations de Hackers Célèbres

> "Hacker, ce n'est pas casser. C'est comprendre."  
> — *Kevin Mitnick*

> "La sécurité est un processus, pas un produit."  
> — *Bruce Schneier*

> "Le seul système vraiment sécurisé est celui qui est éteint."  
> — *Gene Spafford* (mais bon, c'est pas pratique 😅)

---

## 🎮 Easter Eggs

**Psst...** Il y a des secrets cachés dans l'application :

- 🎮 Essayez le code Konami (↑↑↓↓←→←→BA)
- 🐧 Tapez "tux" dans la console
- 🔢 Cherchez le nombre 42
- 🦸 Trouvez les badges cachés

---

## 📜 Conclusion

### Ce que Vous Avez Appris :

1. **Broken Access Control** = Faille #1 mondiale
2. **Ne JAMAIS** faire confiance au client
3. **TOUJOURS** vérifier côté serveur
4. La sécurité, c'est comme les oignons (ça a des couches 🧅)
5. HIKORN, c'est cool 😎

### Message Final :

> Vous n'êtes plus un simple utilisateur.  
> Vous êtes maintenant un **Gardien de la Sécurité Numérique**.  
> Utilisez ce pouvoir avec sagesse ! 🦸‍♂️

---

**Développé avec ❤️ et beaucoup de ☕ pour la Nuit de l'Info 2025**

*Rejoignez la résistance numérique ! 🏰*

---

## 🙏 Remerciements

- **Collectif enseignant HIKORN** - Pour l'inspiration
- **OWASP** - Pour les connaissances
- **Vous** - Pour avoir lu jusqu'ici ! 🎉

**Maintenant, allez hacker (éthiquement) le monde ! 🚀**
