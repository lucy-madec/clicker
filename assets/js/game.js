/**
 * Golf Clicker - Script principal du jeu
 * Version améliorée avec plus de fonctionnalités
 */

// ===== INITIALISATION DES VARIABLES =====
// Éléments du DOM
const balleDeGolf = document.getElementById('balle_de_golf');
const scoreParagraphe = document.getElementById('score');
const clickArea = document.getElementById('click-area');
const clickEffect = document.getElementById('click-effect');
const totalClicsSpan = document.getElementById('total-clics');
const ballesParClicSpan = document.getElementById('balles-par-clic');
const ballesParSecondeSpan = document.getElementById('balles-par-seconde');
const achievementPopup = document.getElementById('achievement-popup');
const achievementDescription = document.getElementById('achievement-description');
const shopTabs = document.querySelectorAll('.shop-tab');
const tabContents = document.querySelectorAll('.tab-content');
const resetGameButton = document.getElementById('resetGame');

// Boutons de la boutique
const acheterPutterButton = document.getElementById('acheterPutter');
const acheterFerButton = document.getElementById('acheterFer9');
const acheterSeauButton = document.getElementById('acheterSeau');
const acheterDriverButton = document.getElementById('acheterDriver');
const ameliorerClicsButton = document.getElementById('ameliorerClics');
const ameliorerAutoButton = document.getElementById('ameliorerAuto');

// Compteurs d'items
const putterCountSpan = document.getElementById('putter-count');
const fer9CountSpan = document.getElementById('fer9-count');
const seauCountSpan = document.getElementById('seau-count');
const driverCountSpan = document.getElementById('driver-count');
const gantsCountSpan = document.getElementById('gants-count');
const caddieCountSpan = document.getElementById('caddie-count');

// Variables du jeu
let gameState = {
    nombreDeBalles: 0,
    totalClics: 0,
    ballesParClic: 1,
    ballesParSeconde: 0,
    multiplicateurClic: 1,
    multiplicateurAuto: 1,
    items: {
        putter: 0,
        fer9: 0,
        seau: 0,
        driver: 0,
        gants: 0,
        caddie: 0
    },
    achievements: {
        premierClic: false,
        dixClics: false,
        centClics: false,
        milleClics: false,
        premierAchat: false,
        cinqAchats: false,
        dixAchats: false,
        premierAutoclicker: false
    }
};

// Prix des items
const PRIX = {
    putter: 10,
    fer9: 50,
    seau: 100,
    driver: 500,
    gants: 200,
    caddie: 300
};

// Intervalles pour les autoclickers
let autoclickerIntervals = [];

// ===== FONCTIONS PRINCIPALES =====

// Fonction pour mettre à jour l'affichage du score et des statistiques
function updateDisplay() {
    scoreParagraphe.textContent = `Vous avez ${Math.floor(gameState.nombreDeBalles)} balles de Golf`;
    totalClicsSpan.textContent = gameState.totalClics;
    ballesParClicSpan.textContent = (gameState.ballesParClic * gameState.multiplicateurClic).toFixed(1);
    ballesParSecondeSpan.textContent = (gameState.ballesParSeconde * gameState.multiplicateurAuto).toFixed(1);
    
    // Mise à jour des compteurs d'items
    putterCountSpan.textContent = gameState.items.putter;
    fer9CountSpan.textContent = gameState.items.fer9;
    seauCountSpan.textContent = gameState.items.seau;
    driverCountSpan.textContent = gameState.items.driver;
    gantsCountSpan.textContent = gameState.items.gants;
    caddieCountSpan.textContent = gameState.items.caddie;
    
    // Désactiver les boutons si pas assez de balles
    toggleButtonState(acheterPutterButton, gameState.nombreDeBalles >= PRIX.putter);
    toggleButtonState(acheterFerButton, gameState.nombreDeBalles >= PRIX.fer9);
    toggleButtonState(acheterSeauButton, gameState.nombreDeBalles >= PRIX.seau);
    toggleButtonState(acheterDriverButton, gameState.nombreDeBalles >= PRIX.driver);
    toggleButtonState(ameliorerClicsButton, gameState.nombreDeBalles >= PRIX.gants);
    toggleButtonState(ameliorerAutoButton, gameState.nombreDeBalles >= PRIX.caddie);
    
    // Animation du score si changement
    scoreParagraphe.classList.add('score-change');
    setTimeout(() => {
        scoreParagraphe.classList.remove('score-change');
    }, 300);
}

// Fonction pour activer/désactiver les boutons
function toggleButtonState(button, isEnabled) {
    if (isEnabled) {
        button.classList.remove('disabled');
        button.disabled = false;
    } else {
        button.classList.add('disabled');
        button.disabled = true;
    }
}

// Fonction pour générer une nouvelle balle de golf au niveau du curseur
function genererBalleDeGolfAuCurseur(event) {
    // Récupérer les coordonnées du curseur
    const x = event.clientX;
    const y = event.clientY;

    // Créer un nouvel élément image
    const balle = document.createElement('img');

    // Définir les attributs de l'image de la balle de golf
    balle.src = 'assets/images/balle_de_golf_jaune.png';
    balle.alt = 'Balle de golf';
    balle.width = 30;
    balle.style.position = 'fixed'; // Utiliser fixed au lieu de absolute pour un positionnement cohérent
    balle.style.left = (x - 15) + 'px';
    balle.style.top = (y - 15) + 'px';
    balle.style.zIndex = '1000';
    balle.style.opacity = '1';
    balle.style.transition = 'all 0.5s ease';
    balle.style.pointerEvents = 'none'; // Éviter que la balle n'interfère avec les clics

    // Ajouter la balle de golf à la page
    document.body.appendChild(balle);
    
    // Créer l'effet de clic sur la balle jaune
    const effect = document.createElement('div');
    effect.classList.add('click-ripple');
    effect.style.position = 'fixed';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.pointerEvents = 'none';
    document.body.appendChild(effect);

    // Animation de la balle
    setTimeout(() => {
        balle.style.transform = `translateY(-${Math.random() * 50 + 20}px)`;
        balle.style.opacity = '0';
    }, 10);

    // Supprimer la balle de golf et l'effet après l'animation
    setTimeout(() => {
        balle.remove();
        effect.remove();
    }, 500);
}

// Fonction pour afficher un effet de clic sur la balle principale
function showClickEffect(event) {
    // Créer un élément pour l'effet de clic
    const effect = document.createElement('div');
    effect.classList.add('click-ripple');
    effect.classList.add('main-ball-effect'); // Classe spécifique pour l'effet sur la balle principale
    
    // Récupérer les coordonnées relatives à la balle de golf principale
    const balleRect = balleDeGolf.getBoundingClientRect();
    const balleCenterX = balleRect.left + balleRect.width / 2;
    const balleCenterY = balleRect.top + balleRect.height / 2;
    
    // Positionner l'effet au centre de la balle principale
    effect.style.position = 'fixed';
    effect.style.left = `${balleCenterX}px`;
    effect.style.top = `${balleCenterY}px`;
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.pointerEvents = 'none';
    effect.style.width = '100px'; // Plus grand pour la balle principale
    effect.style.height = '100px';
    
    // Ajouter l'effet au document
    document.body.appendChild(effect);
    
    // Supprimer l'effet après l'animation
    setTimeout(() => {
        effect.remove();
    }, 500);
}

// Fonction pour afficher un achievement
function showAchievement(title) {
    achievementDescription.textContent = title;
    achievementPopup.classList.remove('hidden');
    
    // Masquer l'achievement après quelques secondes
    setTimeout(() => {
        achievementPopup.classList.add('hidden');
    }, 3000);
}

// Fonction pour vérifier les achievements
function checkAchievements() {
    // Premier clic
    if (!gameState.achievements.premierClic && gameState.totalClics >= 1) {
        gameState.achievements.premierClic = true;
        showAchievement('Premier clic !');
    }
    
    // 10 clics
    if (!gameState.achievements.dixClics && gameState.totalClics >= 10) {
        gameState.achievements.dixClics = true;
        showAchievement('10 clics !');
    }
    
    // 100 clics
    if (!gameState.achievements.centClics && gameState.totalClics >= 100) {
        gameState.achievements.centClics = true;
        showAchievement('100 clics ! Vous êtes accro !');
    }
    
    // 1000 clics
    if (!gameState.achievements.milleClics && gameState.totalClics >= 1000) {
        gameState.achievements.milleClics = true;
        showAchievement('1000 clics ! Vos doigts doivent être fatigués !');
    }
    
    // Premier achat
    const totalItems = Object.values(gameState.items).reduce((a, b) => a + b, 0);
    if (!gameState.achievements.premierAchat && totalItems >= 1) {
        gameState.achievements.premierAchat = true;
        showAchievement('Premier achat ! Vous êtes un vrai golfeur maintenant !');
    }
    
    // 5 achats
    if (!gameState.achievements.cinqAchats && totalItems >= 5) {
        gameState.achievements.cinqAchats = true;
        showAchievement('5 achats ! Votre collection s\'agrandit !');
    }
    
    // 10 achats
    if (!gameState.achievements.dixAchats && totalItems >= 10) {
        gameState.achievements.dixAchats = true;
        showAchievement('10 achats ! Vous êtes un collectionneur !');
    }
    
    // Premier autoclicker
    if (!gameState.achievements.premierAutoclicker && (gameState.items.fer9 > 0 || gameState.items.seau > 0 || gameState.items.driver > 0)) {
        gameState.achievements.premierAutoclicker = true;
        showAchievement('Premier auto-clicker ! Le jeu joue tout seul maintenant !');
    }
}

// Fonction pour activer les autoclickers
function activerAutoclickers() {
    // Nettoyer les intervalles existants
    autoclickerIntervals.forEach(interval => clearInterval(interval));
    autoclickerIntervals = [];
    
    // Calculer le nombre total de balles par seconde
    gameState.ballesParSeconde = 
        gameState.items.fer9 * 1 + 
        gameState.items.seau * 10 + 
        gameState.items.driver * 50;
    
    // Créer un nouvel intervalle pour tous les autoclickers
    if (gameState.ballesParSeconde > 0) {
        const interval = setInterval(() => {
            // Ajouter les balles en fonction du multiplicateur
            gameState.nombreDeBalles += (gameState.ballesParSeconde * gameState.multiplicateurAuto) / 10;
            updateDisplay();
        }, 100); // Mise à jour 10 fois par seconde pour une animation plus fluide
        
        autoclickerIntervals.push(interval);
    }
}

// Fonction pour sauvegarder la partie
function sauvegarderPartie() {
    localStorage.setItem('golfClickerSave', JSON.stringify(gameState));
}

// Fonction pour charger la partie
function chargerPartie() {
    const sauvegarde = localStorage.getItem('golfClickerSave');
    if (sauvegarde) {
        const savedState = JSON.parse(sauvegarde);
        
        // Fusionner avec l'état actuel pour gérer les nouvelles propriétés
        gameState = { ...gameState, ...savedState };
        
        // S'assurer que tous les items existent
        gameState.items = { ...gameState.items, ...savedState.items };
        gameState.achievements = { ...gameState.achievements, ...savedState.achievements };
        
        updateDisplay();
        activerAutoclickers();
    }
}

// Fonction pour réinitialiser la partie
function reinitialiserPartie() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser la partie ? Tout votre progrès sera perdu.')) {
        // Nettoyer les intervalles
        autoclickerIntervals.forEach(interval => clearInterval(interval));
        
        // Réinitialiser l'état du jeu
        gameState = {
            nombreDeBalles: 0,
            totalClics: 0,
            ballesParClic: 1,
            ballesParSeconde: 0,
            multiplicateurClic: 1,
            multiplicateurAuto: 1,
            items: {
                putter: 0,
                fer9: 0,
                seau: 0,
                driver: 0,
                gants: 0,
                caddie: 0
            },
            achievements: {
                premierClic: false,
                dixClics: false,
                centClics: false,
                milleClics: false,
                premierAchat: false,
                cinqAchats: false,
                dixAchats: false,
                premierAutoclicker: false
            }
        };
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Sauvegarder la partie réinitialisée
        sauvegarderPartie();
        
        // Afficher un message
        alert('Partie réinitialisée !');
    }
}

// ===== GESTIONNAIRES D'ÉVÉNEMENTS =====

// Clic sur la balle de golf
balleDeGolf.addEventListener('click', function(event) {
    // Incrémenter le nombre de balles de golf
    gameState.nombreDeBalles += gameState.ballesParClic * gameState.multiplicateurClic;
    gameState.totalClics++;
    
    // Mettre à jour l'affichage
    updateDisplay();
    
    // Générer une balle au curseur avec effet de clic intégré
    genererBalleDeGolfAuCurseur(event);
    // Effet de clic sur la balle principale
    showClickEffect(event);
    
    // Vérifier les achievements
    checkAchievements();
});

// Achat du Putter
acheterPutterButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.putter) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.putter;
        
        // Incrémenter le nombre de putters
        gameState.items.putter++;
        
        // Augmenter le nombre de balles par clic
        gameState.ballesParClic += 1;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Achat du Fer 9
acheterFerButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.fer9) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.fer9;
        
        // Incrémenter le nombre de fers
        gameState.items.fer9++;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Activer les autoclickers
        activerAutoclickers();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Achat du Seau
acheterSeauButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.seau) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.seau;
        
        // Incrémenter le nombre de seaux
        gameState.items.seau++;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Activer les autoclickers
        activerAutoclickers();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Achat du Driver
acheterDriverButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.driver) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.driver;
        
        // Incrémenter le nombre de drivers
        gameState.items.driver++;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Activer les autoclickers
        activerAutoclickers();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Amélioration des clics (Gants)
ameliorerClicsButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.gants) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.gants;
        
        // Incrémenter le nombre de gants
        gameState.items.gants++;
        
        // Augmenter le multiplicateur de clics
        gameState.multiplicateurClic *= 2;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Amélioration des autoclickers (Caddie)
ameliorerAutoButton.addEventListener('click', function() {
    if (gameState.nombreDeBalles >= PRIX.caddie) {
        // Réduire le score
        gameState.nombreDeBalles -= PRIX.caddie;
        
        // Incrémenter le nombre de caddies
        gameState.items.caddie++;
        
        // Augmenter le multiplicateur d'autoclickers
        gameState.multiplicateurAuto *= 2;
        
        // Mettre à jour l'affichage
        updateDisplay();
        
        // Activer les autoclickers avec le nouveau multiplicateur
        activerAutoclickers();
        
        // Vérifier les achievements
        checkAchievements();
        
        // Sauvegarder la partie
        sauvegarderPartie();
    }
});

// Gestion des onglets de la boutique
shopTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Retirer la classe active de tous les onglets
        shopTabs.forEach(t => t.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet cliqué
        this.classList.add('active');
        
        // Masquer tous les contenus d'onglets
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Afficher le contenu de l'onglet correspondant
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.remove('hidden');
    });
});

// Réinitialisation de la partie
resetGameButton.addEventListener('click', reinitialiserPartie);

// Sauvegarder la partie avant de quitter
window.addEventListener('beforeunload', sauvegarderPartie);

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Charger la partie sauvegardée
    chargerPartie();
    
    // Mettre à jour l'affichage initial
    updateDisplay();
    
    // Activer les autoclickers si nécessaire
    activerAutoclickers();
});

// Ajouter des styles CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    .click-ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    .score-change {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.1); }
        100% { transform: translateX(-50%) scale(1); }
    }
    
    .achievement-popup {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s;
    }
    
    .achievement-popup.hidden {
        display: none;
    }
    
    .achievement-content {
        display: flex;
        align-items: center;
    }
    
    .achievement-icon {
        font-size: 2rem;
        color: gold;
        margin-right: 15px;
    }
    
    .achievement-text h3 {
        margin: 0 0 5px 0;
        font-size: 1.2rem;
    }
    
    .achievement-text p {
        margin: 0;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .shop-tabs {
        display: flex;
        margin-bottom: 1rem;
    }
    
    .shop-tab {
        flex: 1;
        padding: 0.5rem;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .shop-tab:first-child {
        border-radius: 4px 0 0 4px;
    }
    
    .shop-tab:last-child {
        border-radius: 0 4px 4px 0;
    }
    
    .shop-tab.active {
        background-color: var(--primary-color);
    }
    
    .tab-content {
        display: flex;
        flex-direction: column;
    }
    
    .tab-content.hidden {
        display: none;
    }
    
    .shop-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .shop-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    
    .shop-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .shop-item.disabled:hover {
        transform: none;
        box-shadow: none;
    }
    
    .item-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    
    .item-name {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .item-desc {
        font-size: 0.8rem;
        color: #666;
    }
    
    .item-cost {
        font-weight: bold;
        color: #333;
    }
    
    .reset-button {
        margin-top: 2rem;
        background-color: rgba(255, 0, 0, 0.2);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .reset-button:hover {
        background-color: rgba(255, 0, 0, 0.4);
    }
`;
document.head.appendChild(style);
