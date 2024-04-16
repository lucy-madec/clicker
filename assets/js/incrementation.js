// Récupérer les éléments nécessaires
const balleDeGolf = document.getElementById('balle_de_golf');
const scoreParagraphe = document.getElementById('score');

// Variable pour stocker le nombre de balles de golf
let nombreDeBalles = 0;

// Ajouter un écouteur d'événements de clic à l'image de la balle de golf
balleDeGolf.addEventListener('click', function(event) {
    // Incrémenter le nombre de balles de golf
    nombreDeBalles++;

    // Mettre à jour le texte du paragraphe avec le nouveau nombre de balles
    scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

    // Appeler la fonction pour générer une nouvelle balle de golf
    genererBalleDeGolf(event.clientX, event.clientY);
});

// Fonction pour générer une nouvelle balle de golf au niveau du curseur
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
    balle.width = 50; // Largeur de la balle de golf (ajustez selon vos besoins)
    balle.style.position = 'absolute';
    balle.style.left = (x - 25) + 'px'; // Position horizontale de la balle de golf (centre)
    balle.style.top = (y - -35) + 'px'; // Position verticale de la balle de golf (centre)

    // Ajouter la balle de golf à la page
    document.body.appendChild(balle);

    // Supprimer la balle de golf après un certain délai (facultatif)
    setTimeout(() => {
        balle.remove();
    }, 100); // Supprime la balle après 1 seconde (ajustez selon vos besoins)
}

// Ajouter un écouteur d'événements de clic à l'image de la balle de golf
const imageBalleGolf = document.getElementById('balle_de_golf');
imageBalleGolf.addEventListener('click', genererBalleDeGolfAuCurseur);

// Ajoute un écouteur d'évènements pour sauvegarder la partie avant de quitter la page
window.addEventListener('beforeunload', function(event) {
    // Sauvegarde le score actuel dans le local storage
    localStorage.setItem('score', nombreDeBalles);
});

// Charger le score sauvegardé au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const sauvegardeScore = localStorage.getItem('score');
    if (sauvegardeScore) {
        nombreDeBalles = parseInt(sauvegardeScore, 10);
        scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";
    }
});