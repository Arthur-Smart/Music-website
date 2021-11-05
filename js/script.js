const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const openModule = document.querySelector('.menu-module');
const navItems = document.querySelector('.nav-list-items');


//Open Menu Module
openBtn.addEventListener('click', () => {
    openModule.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    openModule.classList.remove('show')
})
//Close module on link click
document.querySelector('.menu-module-items').addEventListener('click', (e) => {
    if(e.target.closest('.module-items')){ 
    openModule.classList.remove('show')
    }
})

//Change active link
navItems.addEventListener('click', (e) => {
    if(e.target.classList.contains('nav-item') && !e.target.classList.contains('active')){
        navItems.querySelector('.active').classList.remove('active');
        e.target.classList.add('active')
    }
});

 AOS.init();

//Slider
const slider1 = document.getElementById('glide_1');
const slider2 = document.getElementById('glide_2');

if(slider1){
    new Glide(slider1, {
        type:"carousel",
        startAt:0,
        autoplay:4500,
        hoverpause:true,
        preVeiw:1,
        animationDuration:800,
        animationTimingFunc:'linear'
    }).mount();
}


if(slider2){
    new Glide(slider2, {
        type:"carousel",
        startAt:0,
        autoplay:8000,
        hoverpause:false,
        preVeiw:1,
        animationDuration:800,
        animationTimingFunc:'linear'
    }).mount();
}

//Categories
//Get artists data

const getArtists = async () =>{

    try {
         const results = await fetch('/data/artists.json');
         const data = await results.json();
         const artists = data.artists;
         return artists;
    } catch (err) {
        console.error(err)
    }
   
}

const artistsCategories = document.querySelector('.artist-categories');


//Load artists
window.addEventListener('DOMContentLoaded', async () => {
    const artists = await getArtists();
    displayArtists(artists);
});

//Display product

const displayArtists = artists => {
    let displayArtist = artists.map(artist => `
 <div class="artist">
                        <div class="img-container">
                        <img src=${artist.image} alt="">
                        </div>
                        <div class="title-download">
                            <h5 class='title-artist-name'>${artist.name}</h5>
                        <a href=${artist.song} download ><button class="artist-btn" download>Download song</button></a>
                        
                        </div>
                    </div>
    `);
   displayArtist = displayArtist.join();
    if(artistsCategories){
      artistsCategories.innerHTML = displayArtist;
   }
}
       //<audio src=${artist.song}></audio>
      // <button class="artist-btn" download>Download song</button>

//filtering
const filterBtn = document.querySelectorAll('.filter-btn');
const categoriesContainer = document.getElementById('categories');

if(categoriesContainer){
    categoriesContainer.addEventListener('click', async e =>{
        const target = e.target.closest('.section-title');
        if(!target) return;

        const id = target.dataset.id;
       const artists = await getArtists();
       if(id){
           //Remove active from btn
           Array.from(filterBtn).forEach(btn =>{
               btn.classList.remove('active');
           });
           target.classList.add('active');
           //Load artist category
           let artistCategory = artists.filter(artist => {
               if(artist.category === id){
                   return artist;
               }
           });

           if(id === 'Trending'){
               displayArtists(artists)
           }else{
               displayArtists(artistCategory)
           }
       }
    });
}