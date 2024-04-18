// Récupérer les éléments nécessaires
const balleDeGolf = document.getElementById('balle_de_golf');
const scoreParagraphe = document.getElementById('score');
const acheterPutterButton = document.getElementById('acheterPutter');
const acheterFerButton = document.getElementById('acheterFer9');
const acheterSeauButton = document.getElementById('acheterSeau');

// Variable pour stocker le nombre de balles de golf
let nombreDeBalles = 0;

// Variable pour suivre si le Putter a été acheté
let putterAchete = false;

let autoclickerInterval;

// Ajouter un écouteur d'événements de clic à l'image de la balle de golf
balleDeGolf.addEventListener('click', function(event) {
    // Incrémenter le nombre de balles de golf
    nombreDeBalles++;

    // Si le Putter a été acheté, incrémenter le score de 2
    if (putterAchete) {
        nombreDeBalles += 1;
    }

    // Mettre à jour le texte du paragraphe avec le nouveau nombre de balles
    scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

    // Appeler la fonction pour générer une nouvelle balle de golf
    genererBalleDeGolfAuCurseur(event);
});

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
    balle.width = 50; // Largeur de la balle de golf
    balle.style.position = 'absolute';
    balle.style.left = (x - 25) + 'px'; // Position horizontale de la balle de golf (centre)
    balle.style.top = (y - -35) + 'px'; // Position verticale de la balle de golf (centre)

    // Ajouter la balle de golf à la page
    document.body.appendChild(balle);

    // Supprimer la balle de golf après un certain délai (facultatif)
    setTimeout(() => {
        balle.remove();
    }, 100); // Supprime la balle après 1 seconde
}

// Fonction pour charger et traiter le fichier JSON des clubs de golf
function chargerClubsDeGolf() {
    fetch('data.json') // Charger le fichier JSON
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            // Appeler la fonction pour créer les articles pour chaque club
            creerArticlesClubs(data);
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
}


// Appeler la fonction pour charger les clubs de golf au chargement de la page
window.onload = chargerClubsDeGolf;

// Ajouter un écouteur d'événements de clic au bouton de l'achat du Putter
acheterPutterButton.addEventListener('click', function() {
    // Vérifier si le score est suffisant pour acheter le Putter
    if (nombreDeBalles >= 10) {
        // Réduire le score de 10 points
        nombreDeBalles -= 10;

        // Mettre à jour le texte du paragraphe avec le nouveau score
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

        // Mettre à jour la variable pour indiquer que le Putter a été acheté
        putterAchete = true;

        // Afficher un message de confirmation
        alert("Vous avez acheté le Putter ! Votre score est maintenant " + nombreDeBalles + ".");
    } else {
        // Afficher un message d'erreur si le score n'est pas suffisant
        alert("Vous n'avez pas assez de points pour acheter le Putter.");
    }
});

// Ajouter un écouteur d'événements de clic au bouton de l'achat du Fer
acheterFerButton.addEventListener('click', function() {
    // Vérifier si le score est suffisant pour acheter le Fer
    if (nombreDeBalles >= 50) {
        // Réduire le score de 50 points
        nombreDeBalles -= 50;

        // Mettre à jour le texte du paragraphe avec le nouveau score
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

        // Activer l'autoclicker pour le Fer
        activerAutoclickerFer();
    } else {
        // Afficher un message d'erreur si le score n'est pas suffisant
        alert("Vous n'avez pas assez de points pour acheter le Fer.");
    }
});

// Ajouter un écouteur d'événements de clic au bouton de l'achat du Driver
acheterSeauButton.addEventListener('click', function() {
    // Vérifier si le score est suffisant pour acheter le Driver
    if (nombreDeBalles >= 100) {
        // Réduire le score de 100 points
        nombreDeBalles -= 100;

        // Mettre à jour le texte du paragraphe avec le nouveau score
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

        // Activer l'autoclicker pour le Driver
        activerAutoclickerSeau();
    } else {
        // Afficher un message d'erreur si le score n'est pas suffisant
        alert("Vous n'avez pas assez de points pour acheter le Seau (Auto-clicker).");
    }
});

function activerAutoclickerFer() {
    // Définir l'intervalle des clics automatiques (en millisecondes)
    const intervalleClics = 1000; // 1 seconde

    // Commencer à incrémenter le score à intervalles réguliers
    autoclickerInterval = setInterval(function() {
        // Incrémenter le nombre de balles de golf
        nombreDeBalles++;

        // Mettre à jour le texte du paragraphe avec le nouveau nombre de balles
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";
    }, intervalleClics);
}

function activerAutoclickerSeau() {
    // Définir l'intervalle des clics automatiques (en millisecondes)
    const intervalleClics = 1000; // 1 seconde

    // Commencer à incrémenter le score à intervalles réguliers
    autoclickerInterval = setInterval(function() {
        // Incrémenter le nombre de balles de golf
        nombreDeBalles += 10;

        // Mettre à jour le texte du paragraphe avec le nouveau nombre de balles
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";
    }, intervalleClics);
}

// Arrêter l'autoclicker lorsque le joueur quitte la page
window.addEventListener('beforeunload', function(event) {
    clearInterval(autoclickerInterval);
});

// Ajouter un écouteur d'événements pour sauvegarder la partie avant de quitter la page
window.addEventListener('beforeunload', function(event) {
    // Créer un objet avec le score et l'état du Putter
    const jeuSauvegarde = {
        score: nombreDeBalles,
        putterAchete: putterAchete
    };

    // Sauvegarder l'objet dans le localStorage
    localStorage.setItem('jeuSauvegarde', JSON.stringify(jeuSauvegarde));
});

// Charger le score et l'état du Putter sauvegardés au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const sauvegardeJeu = localStorage.getItem('jeuSauvegarde');
    if (sauvegardeJeu) {
        const jeu = JSON.parse(sauvegardeJeu);
        nombreDeBalles = jeu.score;
        putterAchete = jeu.putterAchete;
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";
    }
});
