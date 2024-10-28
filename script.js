const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

let isPlaying = false;
let currentSongIndex = 0;
const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];

function playPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function stop() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    isPlaying = false;
}

function prev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}

function next() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}

function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeElem.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function loadSong(index) {
    audioPlayer.src = songs[index];
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationElem.textContent = formatTime(audioPlayer.duration);
    });
}

function mouseOverEffect(event) {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    event.target.style.backgroundColor = randomColor;
}

audioPlayer.addEventListener('timeupdate', updateProgress);
playPauseBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stop);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

playPauseBtn.addEventListener('mouseover', mouseOverEffect);
stopBtn.addEventListener('mouseover', mouseOverEffect);
prevBtn.addEventListener('mouseover', mouseOverEffect);
nextBtn.addEventListener('mouseover', mouseOverEffect);

window.onload = () => {
    loadSong(currentSongIndex);
};
