const audio = new Audio(),
      audioPlayer = document.querySelector(".audio-player"),
      imgSinger = document.querySelector(".img-singer"),
      backgroundImage = document.querySelector(".background-image"),
      playBtn = document.querySelector('.play'),
      backward = document.querySelector('.backward'),
      forward = document.querySelector('.forward'),
      progressBar = document.getElementById('progress-bar'),
      durationTime = document.querySelector('.duration-time'),
      currentTime = document.querySelector('.current-time');

const playlist = [
  {
    artist: 'Beyonce',
    title: "Don't Hurt Yourself",
    track: 'beyonce.mp3',
    img: 'lemonade.png',
  },
  {
    artist: 'Dua Lipa',
    title: "Don't Start Now",
    track: 'dontstartnow.mp3',
    img: 'dontstartnow.png',

  },
  {
    artist: 'Tiesto',
    title: "I will be here",
    track: 'IwillBeHere.mp3',
    img: 'tiesto.jpg',
  },
];

let isPlay = false;
let playNum;

window.onload = function () {
  playNum = 0;
  document.querySelector('.artist').innerHTML = playlist[playNum].artist;
  document.querySelector('.title').innerHTML = playlist[playNum].title;

  audio.src = `./assets/audio/${playlist[playNum].track}`;
  durationTime.textContent = getTimeCodeFromNum(audio.duration);

};

// ==================  Play
function playAudio() {

  // audio.src = `./assets/audio/${playlist[playNum].track}`;
  imgSinger.src = `./assets/img/${playlist[playNum].img}`;
  backgroundImage.style.backgroundImage = `url('./assets/img/${playlist[playNum].img}')`;
  playBtn.classList.add('pause');
  imgSinger.classList.add('active');
  audio.play();
}

// ==================  Pause audio
function pauseAudio() {
  playBtn.classList.remove('pause');
  imgSinger.classList.remove('active');
  audio.pause();
}

// ==================  Class Pause

function changeClass() {
    if (!isPlay) {
      playBtn.classList.remove('pause');
    } else {
      playBtn.classList.add('pause');
    }
}

playBtn.addEventListener('click', () => {
  const isPause = playBtn.classList.contains('pause');
  if (isPause) {
    pauseAudio();
  } else {
    playAudio();
  }
});

// ==================  Next / Prev

function changeInfo() {
    document.querySelector('.artist').innerHTML = playlist[playNum].artist;
    document.querySelector('.title').innerHTML = playlist[playNum].title;
}

function playPrev(){
  if (playNum === 0) {
    playNum = playlist.length - 1;
  } else {
    playNum -= 1;
  }

  audio.src = `./assets/audio/${playlist[playNum].track}`;
  playAudio();
  changeInfo();
}

function playNext() {
  if (playNum === playlist.length-1) {
      playNum = 0;
    } else {
      playNum += 1;
  }
  audio.src = `./assets/audio/${playlist[playNum].track}`;
  playAudio();
  changeInfo();
}

backward.addEventListener('click', playPrev);
forward.addEventListener('click', playNext);

/* ============================= Progress bar ========================== */

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);

}

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener("loadeddata", () => {
  durationTime.textContent = getTimeCodeFromNum(audio.duration);
  },
);

// ========== перевод duration в минуты

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;

  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

// ========== перемотка

function setProgress(event) { 
  const width = this.clientWidth;
  const clickХ = event.offsetX;
    
  audio.currentTime = clickХ / width * audio.duration;
}

progressBar.addEventListener('click', setProgress);


// ========== цвет прогресс-бара при проигрывании и перемотке

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('progress-bar');
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

progressBar.addEventListener('input', handleInputChange);
audio.addEventListener('timeupdate', handleInputChange);