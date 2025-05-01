// images collection
const images = [
    '/images/3.jpg',
    '/images/30.jpg',
    '/images/35.jpg',
    '/images/40.jpg',
    '/images/45.jpg',
    '/images/47.jpg',
    '/images/50.jpg',
    '/images/53.jpg',
    '/images/55.jpg',
    '/images/58.jpg',
    '/images/60.jpg',
    '/images/62.jpg',
    '/images/65.jpg',
    '/images/70.jpg',
    '/images/73.jpg'
];

// videos Collection
const videos = [
    '/videos/Anthem.mp4',
    '/videos/Anthem.mp4',
    '/videos/Anthem.mp4',
    '/videos/Anthem.mp4',
    '/videos/Anthem.mp4',
    '/videos/Anthem.mp4'
];


// getting both the buttons i.e. Photos & Videos
const buttons = document.querySelectorAll('.button-container button');

// getting the photo-gallery element
const photoGallery = document.getElementById('photo-gallery');

images.forEach(src => {
    img = document.createElement('img');
    img.src = src;
    img.classList.add('w-full', 'h-[200px]', 'object-cover', 'rounded-lg', 'shadow-lg', 'transition-transform', 'duration-500', 'hover:scale-105');
    photoGallery.appendChild(img);
});

// getting the video-gallery element
const videoGallery = document.getElementById('video-gallery');

videos.forEach(src => {
    const video = document.createElement('video');
    video.classList.add('w-full', 'h-[200px]', 'object-cover', 'rounded-lg', 'shadow-lg');
    video.setAttribute('muted', '')
    
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';

    video.appendChild(source);
    videoGallery.appendChild(video);
});

// checking button click event
buttons.forEach(button => {
    button.addEventListener('click', e => {
        document.querySelector('.btn-gallery-active').classList.remove('btn-gallery-active');
            e.target.classList.add('btn-gallery-active');
            if(e.target.dataset.name == "photos"){
                photoGallery.classList.remove('hidden');
                videoGallery.classList.add('hidden');
            }
            else{
                videoGallery.classList.remove('hidden');
                photoGallery.classList.add('hidden');
            }
        
    })
});

// Photo LightBox
const photoLightBox = document.getElementById('photo-lightbox');
const photoLightBoxImg = document.getElementById('photo-lightbox-img');

photoGallery.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        photoLightBoxImg.src = e.target.src;
        photoLightBox.classList.remove('hidden');
    }
});

photoLightBox.addEventListener('click', () => {
    photoLightBox.classList.add('hidden');
})

// Video LightBox
const videoLightBox = document.getElementById('video-lightbox');
const videoLightBoxVid = document.getElementById('video-lightbox-vid');
const videoLightBoxSrc = document.getElementById('video-lightbox-src');

videoGallery.addEventListener('click', function(e){
    if(e.target.tagName === 'VIDEO'){
        const sourceElement = document.querySelector('source');
        if(sourceElement){
            videoLightBoxSrc.src = sourceElement.src;
            videoLightBoxSrc.type = sourceElement.type;
            videoLightBoxVid.load();
            videoLightBox.classList.remove('hidden');
        }
        
    }
});

videoLightBox.addEventListener('click', e => {
    if (e.target === videoLightBox) { // Ensure click is outside the video
        videoLightBox.classList.add('hidden');
        videoLightBoxVid.pause(); // Pause the video
        videoLightBoxVid.currentTime = 0; // Reset video to the start
    }
})