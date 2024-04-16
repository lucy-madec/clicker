// Récupére les éléments nécessaires
const balleDeGolf = document.getElementById('balle_de_golf');
const scoreParagraphe = document.getElementById('score');

// Variable pour stocker le nombre de balles de golf
let nombreDeBalles = 0;

// Ajoute un écouteur d'événements de clic à l'image de la balle de golf
balleDeGolf.addEventListener('click', function(event) {
    // Incrémente le nombre de balles de golf
    nombreDeBalles++;

    // Met à jour le texte du paragraphe avec le nouveau nombre de balles
    scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";

    // Appelle la fonction pour générer une nouvelle balle de golf
    genererBalleDeGolf(event.clientX, event.clientY);
});

// Fonction pour générer une nouvelle balle de golf au niveau du curseur
function genererBalleDeGolfAuCurseur(event) {
    // Récupérer les coordonnées du curseur
    const x = event.clientX;
    const y = event.clientY;

    // Crée un nouvel élément image
    const balle = document.createElement('img');

    // Défini les attributs de l'image de la balle de golf
    balle.src = 'assets/images/balle_de_golf_jaune.png';
    balle.alt = 'Balle de golf';
    balle.width = 50; // Largeur de la balle de golf
    balle.style.position = 'absolute';
    balle.style.left = (x - 25) + 'px'; // Position horizontale de la balle de golf (centre)
    balle.style.top = (y - -35) + 'px'; // Position verticale de la balle de golf (centre)

    // Ajoute la balle de golf à la page
    document.body.appendChild(balle);

    // Supprime la balle de golf après un certain délai
    setTimeout(() => {
        balle.remove();
    }, 100); // Supprime la balle après 1 seconde
}

// Ajoute un écouteur d'événements de clic à l'image de la balle de golf
const imageBalleGolf = document.getElementById('balle_de_golf');
imageBalleGolf.addEventListener('click', genererBalleDeGolfAuCurseur);
