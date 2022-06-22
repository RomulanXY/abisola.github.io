// window.addEventListener('scroll', ()=>{
//     let secondSection = document.querySelector('.space');
//     let thirdSection = document.querySelector('.three');
//     let secondSectionPosition = secondSection.getBoundingClientRect().top;
//     console.log(secondSectionPosition);
//     let screenPosition = window.innerHeight*1.6;
//     console.log(screenPosition);
//     if (secondSectionPosition < screenPosition) {
//         secondSection.classList.add('active');
//     } else {
//         secondSection.classList.remove('active');
//     }
// })



let currentScrollPosition = 0;
let scrollAmount = 320;

let videoCarousel = document.querySelector('.video-carousel');
let cover = document.querySelector('.cover');
let arrows = document.querySelectorAll('.btn-scroll');

let maxScroll = -videoCarousel.offsetWidth + cover.offsetWidth;

function scrollHorizontally(val) {
    console.log(videoCarousel.offsetWidth);
    console.log(cover.offsetWidth);
    console.log(maxScroll);
    currentScrollPosition += (val * scrollAmount);
    if (currentScrollPosition > 0) {
        currentScrollPosition = 0
    }
    if (currentScrollPosition < maxScroll) {
        currentScrollPosition = maxScroll;
    }
    videoCarousel.style.left = `${currentScrollPosition}px`;

}
arrows.forEach(arrow=>{
    arrow.addEventListener('click', (e)=>{
        console.log(e.currentTarget.id);
        if (e.currentTarget.id === "left") {
            console.log('hi');
            scrollHorizontally(1);
        } else {
            scrollHorizontally(-1);
        }
        
    })
})

const video = document.querySelectorAll('video');
video.forEach(play => play.addEventListener('click', ()=>{
    play.classList.toggle('active');
    if (play.paused) {
        play.play();
    }else{
        play.pause();
        play.currentTime = 0;
    }
}))

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const coverImg = document.querySelector('#cover');


const songs = ['Beneath your beautiful', 'Perfect', 'Conversations in the Dark', 'Mine', 'Fight for you', 'Tornado', 'Jowo', 'All The Way', 'Reckless Love', 'Dansaki'];
let songIndex = 0;

function loadSong(song) {
    title.innerText = song;
    audio.src = `./src/music/${song}.mp3`;
    cover.src = `./src/music/covers/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
