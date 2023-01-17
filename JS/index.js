const MyURL = '?id=930';

const myId = MyURL.slice(4);


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
                                <a class="buttonMedia" onclick="displayCaroussel()">
                                    <video class='myProfile_main_media' src='/grid_medias/assets/photographers/${namePhotograph}/${mediasPhotographer.video}' alt='' type="video/mp4"></video>
                                </a>
                            </div>
                        `
                } else {
                    project.innerHTML =
                        `   <div class="media_container">
                                <a class="buttonMedia" onclick="displayCaroussel()">
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



function displayCaroussel(dataMedias) {
    console.log('voici mon ' + dataMedias);
}
displayProjectsPhotographer();