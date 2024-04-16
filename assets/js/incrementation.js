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

// Fonction pour générer une nouvelle balle de golf
function genererBalleDeGolf(x, y) {
    // Créer un nouvel élément image
    const balle = document.createElement('img');

    // Définir les attributs de l'image de la balle de golf
    balle.src = 'assets/images/balle_de_golf.png';
    balle.alt = 'Balle de golf';
    balle.width = 50; // Largeur de la balle de golf (ajustez selon vos besoins)
    balle.style.position = 'absolute';
    balle.style.left = x + 'px'; // Position horizontale de la balle de golf
    balle.style.top = y + 'px'; // Position verticale de la balle de golf

    // Ajouter la balle de golf à la page
    document.body.appendChild(balle);

    // Supprimer la balle de golf après un certain délai (facultatif)
    setTimeout(() => {
        balle.remove();
    }, 100); // Supprime la balle après 1 seconde (ajustez selon vos besoins)
}
