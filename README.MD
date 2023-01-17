<!-- Preview = Ctrl + Maj + V on VsCode-->


## Projet: Faire une fonction capable d'afficher une grille regroupant les projets d'un photographe.
* ##### Étape 1: Création de ma fonction.

```bash
function displayProjectsPhotographer() {
    console.log('ma fonction est appelée')
}

displayProjectsPhotographer();  # Affichage de la console: "ma fonction est appelée"
```

*********
* ##### Étape 2: Initialisation des mes variables. 

```bash
## Création d'élément Html
function displayProjectsPhotographer() {
    const videoCaroussel = document.createElement('video'); 
    const imageCaroussel = document.createElement('img');
    videoCaroussel.setAttribute('class', 'myProfile_main_media');
    imageCaroussel.setAttribute('class', 'myProfile_main_media');
}
```

*********
* ##### Étape 3: Récupération de mon fichier JSON. 

```bash
let myMedia = fetch('/grid_medias/data/dataPhotographers.json')
    .then(reponse => reponse.json()) # récupération de ma réponse JSON.
    .then(data => data) ## récupération de mon fichier dans une variable "data". 
```

*********
* ##### Étape 4: Utiliser mon fichier JSON dans mon JS. 

```bash 
let myMedia = fetch('/grid_medias/data/dataPhotographers.json')
    .then(reponse => reponse.json())
    .then(data => data) # data représente 2 tableaux d'objets. (médias + photographes)
    .then(data => {
        const dataMedias = data.media; # tableau de mes médias
        const dataPhotographers = data.photographers; # tableau de mes photographes

        ## utilisation de filter() pour récupérer les médias de mon photographe.
        const photographId = dataPhotographers.filter(photographId => photographId.id == myId); 

        ## utilisation de map() et reduce() pour retourner le nom de mon photographe.
        const namePhotograph =  photographId.map(photographName => photographName.name)
                                            .reduce((acc, e) => e); 

        ## utilisation de filter() pour comparer l'id du photographe avec les id des médias.         
        const myMedias = dataMedias.filter(mediasId => mediasId.photographerId == myId);
    })
```

*********
* ##### Étape 5: Création d'une boucle dans le tableau correspondant à mon Photographe. 

```bash
## Utilisation de for of dans mon tableau myMedias
for (const mediasPhotographer of myMedias) {
        const project = document.createElement('div');      # création d'une div
        project.setAttribute('class', 'project_display');   # attribution d'une classe
        const grid = document.querySelector('.myProfile_grid_projects'); #déclaration d'une constante représentant un div.
        grid.appendChild(project); # J'injecte mon élément "projet" dans ma div grid.
}
```

*********
* ##### Étape 6: Création de la structure HTML de ma grille. 

```bash
# Ajoute une image ou une vidéo dans l'html de "project".
if (mediasPhotographer.image === undefined) {
    project.innerHTML =
        `   <div class="media_container">
                <a class="buttonMedia">
                    <video class='myProfile_main_media' src='/grid_medias/assets/photographers/${namePhotograph}/${mediasPhotographer.video}' alt='' type="video/mp4"></video>
                </a>
            </div>
        `
} else {
    project.innerHTML =
        `   <div class="media_container">
                <a class="buttonMedia">
                    <img class='myProfile_main_media' src='/grid_medias/assets/photographers/${namePhotograph}/${mediasPhotographer.image}' alt=''>
                </a>
            </div>
        `
}
# Utilisation de += permettant de rajouter cet Html à la suite de "media_container".
project.innerHTML +=
    ` 
    <div class="media_desc">
        <h4 class="myProfile_Title_Project"></h4>
        <div class="likes_display">
            <p>${mediasPhotographer.likes}</p>
            <button class="likes_button">
                <i class="fa-regular fa-heart fa-xl"></i>
            </button>                    
        </div>
    </div>
`
```


*********
* ##### Code entier fonctionnel. 
* Ma fonction me permet de créer des éléments HTML via le JS en récupérant des données (id,name,medias,likes) de 2 tableaux contenus dans un fichier JSON.

```bash
const MyURL = '?id=930'; # Permet de simuler une récupération d'url en fonction d'un id d'un photographe
const myId = MyURL.slice(4); # myId représente alors : '930'. 

function displayProjectsPhotographer() {

    const videoCaroussel = document.createElement('video');
    const imageCaroussel = document.createElement('img');
    videoCaroussel.setAttribute('class', 'myProfile_main_media');
    imageCaroussel.setAttribute('class', 'myProfile_main_media');
    let myMedia = fetch('/grid_medias/data/dataPhotographers.json')
        .then(reponse => reponse.json())
        .then(data => data)
        .then(data => {
            const dataMedias = data.media;
            const dataPhotographers = data.photographers;
            const photographId = dataPhotographers.filter(photographId => photographId.id == myId);
            const namePhotograph =  photographId.map(photographName => photographName.name)
                                                .reduce((acc, e) => e); 
            const myMedias = dataMedias.filter(mediasId => mediasId.photographerId == myId);
            
            for (const mediasPhotographer of myMedias) {
                const project = document.createElement('div');
                project.setAttribute('class', 'project_display');
                const grid = document.querySelector('.myProfile_grid_projects').appendChild(project);

                if (mediasPhotographer.image === undefined) {
                    project.innerHTML =
                        `   <div class="media_container">
                                <a class="buttonMedia">
                                    <video class='myProfile_main_media' src='/grid_medias/assets/photographers/${namePhotograph}/${mediasPhotographer.video}' alt='' type="video/mp4"></video>
                                </a>
                            </div>
                        `
                } else {
                    project.innerHTML =
                        `   <div class="media_container">
                                <a class="buttonMedia">
                                    <img class='myProfile_main_media' src='/grid_medias/assets/photographers/${namePhotograph}/${mediasPhotographer.image}' alt=''>
                                </a>
                            </div>
                        `
                }
                project.innerHTML +=
                    ` 
                    <div class="media_desc">
                        <h4 class="myProfile_Title_Project"></h4>
                        <div class="likes_display">
                            <p>${mediasPhotographer.likes}</p>
                            <button class="likes_button">
                                <i class="fa-regular fa-heart fa-xl"></i>
                            </button>                    
                        </div>
                    </div>
                `
            }
        })
}
displayProjectsPhotographer();
```