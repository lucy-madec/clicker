// Fonction pour charger et traiter le fichier JSON
function chargerClubsDeGolf() {
    fetch('data.json') // Charger le fichier JSON
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            // Appeler la fonction pour créer les articles pour chaque club
            creerArticlesClubs(data);
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
}

// Fonction pour créer les articles pour chaque club
function creerArticlesClubs(clubs) {
    const boutique = document.querySelector('.boutique'); // Sélectionner l'élément de la boutique
    
    // Pour chaque club dans la liste
    clubs.forEach(club => {
        // Créer un nouvel article
        const article = document.createElement('article');
        article.classList.add('card');
        
        // Créer l'image de l'objet
        const img = document.createElement('img');
        img.classList.add('card-image');
        img.src = club.image;
        img.alt = club.nom;
        article.appendChild(img);
        
        // Créer les informations sur l'objet (nom et coût)
        const info = document.createElement('div');
        info.classList.add('info');
        
        const nom = document.createElement('span');
        nom.classList.add('name');
        nom.textContent = club.nom;
        info.appendChild(nom);
        
        const coût = document.createElement('span');
        coût.classList.add('cost');
        coût.textContent = `Coût : ${club.coût}`;
        info.appendChild(coût);
        
        article.appendChild(info);
        
        // Créer la quantité de l'objet
        const quantite = document.createElement('span');
        quantite.classList.add('quantity');
        quantite.textContent = `Quantité : ${club.quantite}`;
        article.appendChild(quantite);
        
        // Ajouter l'article à la boutique
        boutique.appendChild(article);
    });
}

// Appeler la fonction pour charger les clubs de golf au chargement de la page
window.onload = chargerClubsDeGolf;