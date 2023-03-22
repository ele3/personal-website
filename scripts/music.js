//Retrieving Elements of the Music Player
const musicContainer = document.getElementById('music-container');
const playpauseBtn = document.querySelector('.playpause-song');
const prevBtn = document.querySelector('.prev-song');
const nextBtn = document.querySelector('.next-song');

const currentSongHeading = document.querySelector('.current-song-heading');
const songImage = document.querySelector('.song-image');
const songName = document.querySelector('.song-name');
const songArtist = document.querySelector('.song-artist');

const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');

const volumeSlider = document.querySelector('.volume-slider');
const positionSlider = document.querySelector('.position-slider');

let currentSongAudio = document.createElement('audio');       //Creating an Audio Element

let songIndex = 0;         //Global variable to keep track of the current song
let isPlaying = false;      //Global variable to keep track of the current state of the song
let timeInterval = null;            //Global variable to keep track of the current time and total duration of the song

//Creating an Array of Songs
const songs = [
    {
        name: 'I Want You Back',
        artist: 'The Jackson 5',
        imagePath: 'images/IWantYouBackSongCover.jpg',
        musicPath: 'music/I want you back.mp3',
    },
    {
        name: '20 Min',
        artist: 'Lil Uzi Vert',
        imagePath: 'images/20minSongCover.jpg',
        musicPath: 'music/20min.mp3',
    },
    {
        name: 'Lady',
        artist: 'Modjo',
        imagePath: 'images/LadyHearMeTonightSongCover.jpg',
        musicPath: 'music/lady hear me tonight.mp3',
    }
];

positionSlider.addEventListener('mousemove', () => {
    updatePositionSlider();
});

volumeSlider.addEventListener('mousemove', () => {
    var x = volumeSlider.value;
    var color = 'linear-gradient(90deg, rgb(7, 45, 102)' + x + '%, rgb(173, 195, 249)' + x + '%)';
    volumeSlider.style.background = color;
});

//Function to initialize the music player for the song at the given index
function initSong(songIndex) {
    clearInterval(timeInterval);
    
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    positionSlider.value = 0;

    currentSongAudio.src = songs[songIndex].musicPath;
    currentSongAudio.load();

    songName.textContent = songs[songIndex].name;
    songArtist.textContent = songs[songIndex].artist;

    songImage.style.backgroundImage = `url(${songs[songIndex].imagePath})`;
    currentSongHeading.textContent = `${songIndex + 1} of ${songs.length}`;

    timeInterval = setInterval(updateTimer, 1000);     //Every second (1000ms), the current time and total duration of the song is updated

    currentSongAudio.addEventListener('ended', nextSong);

}

function initVolume() {
    currentSongAudio.volume = 0.1;
}

//Function to update the current time and total duration of the song
function updateTimer() {
    positionSlider.value = currentSongAudio.currentTime * (100 / currentSongAudio.duration);        //This updates the position slider based on the current time of the song. The position slider value is calculated as the percentage of the current time in relation to the total duration of the song.
    currentTime.textContent = convertTime(Math.floor(currentSongAudio.currentTime));
    totalDuration.textContent = convertTime(Math.floor(currentSongAudio.duration));
    updatePositionSlider();
}

//Function to convert the time in seconds to minutes and seconds
function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

function setVolume(){
    currentSongAudio.volume = volumeSlider.value / 100;         //Setting the volume of the song (We divide the volume slider value by 100 because the volume slider value is in percentage)
}

function goToPosition(){
    currentSongAudio.currentTime = currentSongAudio.duration * (positionSlider.value / 100);       //Setting the position of the song (We divide the position slider value by 100 because the position slider value is in percentage)
    updateTimer();
}

function playSong(){
    currentSongAudio.play();
    isPlaying = true;
    playpauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    if (!songImage.classList.contains('transition-rotate')) {
        songImage.classList.add('transition-rotate');
    }
}

function pauseSong(){
    currentSongAudio.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';

}

function nextSong() {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;                      //Loop around again to the first song
    }

    initSong(songIndex);
    songImage.classList.remove('transition-rotate');
    updatePositionSlider();
    pauseSong();
}

function prevSong() {
    if(songIndex > 0){
        songIndex--;
    } else{
        songIndex = songs.length - 1;       //Loop around again to the last song
    }

    initSong(songIndex);
    songImage.classList.remove('transition-rotate');
    updatePositionSlider();
    pauseSong();
}

//Updates the progress bar color for the song
function updatePositionSlider() {
    var x = positionSlider.value;
    var color = 'linear-gradient(90deg, rgb(7, 45, 102)' + x + '%, rgb(173, 195, 249)' + x + '%)';
    positionSlider.style.background = color;
}

//Function to detect the click on the next, previous, and (play & pause) buttons
function detectSongControls() {
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playpauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
        }
    );
}

initSong(songIndex);
initVolume();
detectSongControls();