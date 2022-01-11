const btnPlay = document.querySelector('.play > svg');
const video = document.querySelector('video');
const nextVideo = document.querySelector('.next');
const prevVideo = document.querySelector('.prev');
const soundLow = document.querySelector('.sound-low');
const soundUp = document.querySelector('.sound-up');
const btnMute = document.querySelector('.mute');
const btnFullScreen = document.querySelector('.full-screen');

const arrSrcVideos = ['./videos/Audi 2022 here’s to the future.mp4', './videos/mercedes.mp4', './videos/BMW.mp4'];

let time;
let index = 0
let isPlaying = false;

if(localStorage.getItem('currentTime')) video.currentTime = +localStorage.getItem('currentTime');
if(localStorage.getItem('currentVideo')) {
    video.src = localStorage.getItem('currentVideo')
} else video.src = arrSrcVideos[index];
if(localStorage.getItem('currentVolume')) video.volume = +localStorage.getItem('currentVolume');




btnFullScreen.addEventListener('click', () => {
    video.requestFullscreen()
});

nextVideo.addEventListener('click', () => {
    isPlaying = false;
    btnPlay.innerHTML = btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`

    if(index + 1 === arrSrcVideos.length) {
        index = 0;
        video.src = arrSrcVideos[index];
    } else video.src = arrSrcVideos[index += 1];

    nextVideo.style.fill = 'cadetblue';
    setTimeout(() => {
        nextVideo.style.fill = 'white';
    }, 200);

    localStorage.setItem('currentVideo', video.src);
    localStorage.setItem('currentTime', 0);
});

prevVideo.addEventListener('click', () => {
    isPlaying = false;
    btnPlay.innerHTML = btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`;

    if(index - 1 < 0) {
        index = arrSrcVideos.length - 1;
        video.src = arrSrcVideos[index];
    } else video.src = arrSrcVideos[index -= 1];

    prevVideo.style.fill = 'cadetblue';
    setTimeout(() => {
        prevVideo.style.fill = 'white';
    }, 200);
    
    localStorage.setItem('currentVideo', video.src);
    localStorage.setItem('currentTime', 0);
});


btnMute.addEventListener('click', () => {
    video.muted = !video.muted;

    if(video.muted) {
        btnMute.style.fill = 'cadetblue'
    } else btnMute.style.fill = 'white'
});


soundUp.addEventListener('click', () => {
    if(video.volume + 0.05 >= 1) return
    video.volume += 0.05;

    soundUp.style.fill = 'cadetblue';
    setTimeout(() => {
        soundUp.style.fill = 'white';
    }, 200);

    localStorage.setItem('currentVolume', video.volume);
});
soundLow.addEventListener('click', () => {
    if(video.volume - 0.05 <= 0) return
    video.volume -= 0.05;


    soundLow.style.fill = 'cadetblue';
    setTimeout(() => {
        soundLow.style.fill = 'white';
    }, 200);

    localStorage.setItem('currentVolume', video.volume);
});



btnPlay.addEventListener('click', () => {
    if(!isPlaying) {
        btnPlay.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z"/></svg>`;

        video.play();
        isPlaying = !isPlaying;
        
        time = setInterval(() => {
            if(!video.paused) localStorage.setItem('currentTime', video.currentTime);
        }, 100);
    } else {
        btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`;

        video.pause();
        isPlaying = !isPlaying;
        clearTimeout(time);
    }
})