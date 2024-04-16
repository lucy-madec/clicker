// Récupérer les éléments nécessaires
const balleDeGolf = document.getElementById('balle_de_golf');
const scoreParagraphe = document.getElementById('score');

// Variable pour stocker le nombre de balles de golf
let nombreDeBalles = 0;

// Ajouter un écouteur d'événements de clic à l'image de la balle de golf
balleDeGolf.addEventListener('click', function() {
    // Incrémenter le nombre de balles de golf
    nombreDeBalles++;

    // Mettre à jour le texte du paragraphe avec le nouveau nombre de balles
    scoreParagraphe.textContent = "Vous avez " + nombreDeBalles + " balles de Golf";
});