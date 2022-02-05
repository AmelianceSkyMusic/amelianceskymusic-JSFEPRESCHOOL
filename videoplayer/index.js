/* jshint esversion: 6 */
// /*jshint -W033 */

// ^................... ( Msg from console.log ) ....................

const Msg = msg => console.log(msg);



// >----------------------------------------------------------------<
// >                              INIT                              <
// >----------------------------------------------------------------<


// ^--------------------------- get items ---------------------------

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const playerControls = player.querySelector('.player__controls');


const playBigButton = player.querySelector('.player__play-big-button');
const playerBlackout = player.querySelector('.player__blackout');

const rangeProgressBar = player.querySelector('.player__slider-progress-bar');

const buttonFullscreen = player.querySelector('.player__button-fullscreen');
const buttonMaximize = player.querySelector('.player__button-maximize');

const buttonVolume = player.querySelector('.player__button-volume');
const rangeVolume = player.querySelector('.player__slider-volume-progress');

// const buttonAudioBoost = player.querySelector('.player__button-audio-boost');

const playerTime = player.querySelector('.player__time');

const skipButtons = player.querySelectorAll('[data-skip]');
const buttonGoToStart = player.querySelector('.player__button-go-to-start');
const playToggleBtn = player.querySelector('.player__button-play-toggle');


// const progressBar = player.querySelector('.progress-bar');

// >----------------------------------------------------------------<
// >                          FULLSCREEN                            <
// >----------------------------------------------------------------<
const setFullscreenToggle = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }

    player.classList.toggle('player-fullscreen');
    // openFullscreen(player);
};


buttonFullscreen.addEventListener('click', setFullscreenToggle);

const setMaximizeToggle = (elem) => {
    const el = elem.target;
    if (player.classList.contains('player-maximize')) {
        el.style.backgroundImage = 'url("./assets/svg/maximize.svg")';
    } else {
        el.style.backgroundImage = 'url("./assets/svg/minimize.svg")';
    }
    player.classList.toggle('player-maximize');
    video.classList.toggle('player-maximize');
};


buttonMaximize.addEventListener('click', setMaximizeToggle);


// >----------------------------------------------------------------<
// >                         PLAY BUTTONS                           <
// >----------------------------------------------------------------<



// ^----------------------- play / pause video ----------------------

// const togglePlay = () => {
//     let isPlay = video.paused ? video.play() : video.pause();
//     // video[state]();
// };

// playBigButton.addEventListener('click', togglePlay);


// ^----------------------- play / pause video ----------------------

const togglePlay = () => {
    let isPlay = video.paused ? video.play() : video.pause();
    // video[state]();
};

video.addEventListener('click', togglePlay);
playToggleBtn.addEventListener('click', togglePlay);
playBigButton.addEventListener('click', togglePlay);
playerBlackout.addEventListener('click', togglePlay);



// ^--------------------- update play button img --------------------

const updatePlayToggleButton = () => {
    if (video.paused) {
        playToggleBtn.style.backgroundImage = 'url("./assets/svg/play.svg")';
        playBigButton.classList.remove('player__play-big-button-hide');
        playerBlackout.classList.add('player__blackout-show');
    } else {
        playToggleBtn.style.backgroundImage = 'url("./assets/svg/pause.svg")';
        playBigButton.classList.add('player__play-big-button-hide');
        playerBlackout.classList.remove('player__blackout-show');
    }
};

video.addEventListener('play', updatePlayToggleButton);
video.addEventListener('pause', updatePlayToggleButton);



// ^------------------------- skip buttons --------------------------

const skip = (el) => {
    video.currentTime += parseFloat(el.target.dataset.skip);
    // Msg(video.currentTime);
};

skipButtons.forEach(button => button.addEventListener('click', skip));



// ^------------------------- go to start --------------------------

const goToStart = () => {
    video.pause();
    video.currentTime = 0;
    // Msg(video.currentTime);
};

buttonGoToStart.addEventListener('click', goToStart);



// >----------------------------------------------------------------<
// >                             VOLUME                             <
// >----------------------------------------------------------------<

// ^------------------ volume range update via input ----------------

const rangeUpdate = (elem) => {

    const el = elem.target;
    const rangeName = el.name;
    video[rangeName] = el.value;

    let newVolume = `${el.value * 100}%`;
    rangeVolume.style.setProperty('--slider-width', newVolume);

};

rangeVolume.addEventListener('input', rangeUpdate);



// ^----------------- volume range update via scroll ----------------

const rangeUpdateScroll = (elem) => {
    const el = elem.target; // get target element
    const rangeName = el.name; // get element name

    const scroll = Math.round(elem.deltaY * -0.01); // get scroll direction

    video[rangeName] = el.value; // reset video positon to real value

    // get new value
    let newValue = video[rangeName] + (Math.floor(scroll * 0.05 * 100) / 100);
    newValue = Math.round(newValue * 100) / 100;
    newValue = newValue < 0 ? 0 : newValue;
    newValue = newValue > 1 ? 1 : newValue;

    el.value = newValue; // set range new value
    video[rangeName] = newValue; // set volume new value

    // change new value to CSS
    let progress = `${newValue * 100}%`;
    rangeVolume.style.setProperty('--slider-width', progress);
};

rangeVolume.addEventListener('wheel', rangeUpdateScroll);



// ^---------------------- set volume on load ---------------------

window.addEventListener('load', () => {

    let volume;
    if(localStorage.getItem('volume')) {
        volume = localStorage.getItem('volume');
    } else {
        volume = 0.5;
    }


    if(localStorage.getItem('volumeButtonMute')) {
        const isMuted = localStorage.getItem('volumeButtonMute') === 'true' ? true : false;
        if (isMuted === true) volume = 0;
    }

    rangeVolume.value = volume; // set range new value
    video[rangeVolume.name] = volume; // set volume new value

    // change new value to CSS
    let progress = `${volume * 100}%`;
    rangeVolume.style.setProperty('--slider-width', progress);
});

// ^---------------------- save volume before unload ---------------------
window.addEventListener('beforeunload', () => {
    const volume = Math.floor(rangeVolume.value * 100) / 100;
    if (volume <= 0) {
        localStorage.setItem('volumeButtonMute', true);
    } else {
        localStorage.setItem('volumeButtonMute', false);
    }
});


// ^---------------------- update volume button ---------------------

const updateVolumeButton = () => {
    const volume = Math.floor(rangeVolume.value * 100) / 100;
    if (volume <= 0) {
        buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-x.svg")';
        // localStorage.setItem('volumeButtonMute', true);
    } else {
        if (volume > 0.50){
            buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-more.svg")';
        } else {
            buttonVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
        }
        localStorage.setItem('volume', volume);
        // localStorage.setItem('volumeButtonMute', false);
    }
};

video.addEventListener('volumechange', updateVolumeButton);


// ^------------------- toggle mute volume button -------------------
const toggleMute = () => {
    let volume;
    if (video[rangeVolume.name] > 0) {
        volume = 0;
    } else {
        volume = localStorage.getItem('volume');
    }

    video[rangeVolume.name] = volume; // set video volume to 0
    rangeVolume.value = volume; // set range value to 0

    // change new value to CSS
    let progress = `${volume * 100}%`;
    rangeVolume.style.setProperty('--slider-width', progress);


};

buttonVolume.addEventListener('click', toggleMute);








// >----------------------------------------------------------------<
// >                            PROGRESS                            <
// >----------------------------------------------------------------<

// ^------------------- video progress bar update  ------------------

const videoProgressBarUpdate = () => {

    const position = (video.currentTime / video.duration); // get position value
    const progress = `${position * 100}%`; // convert position value to percent

    rangeProgressBar.value = position; // set position value

    rangeProgressBar.style.setProperty('--slider-width', progress); // draw progress bar position (set percent to class style gradient)

};

video.addEventListener('timeupdate', videoProgressBarUpdate);



// ^------------------- video progress bar scrub  ------------------

const videoScrub = (elem) => {
    const el = elem.target; // get target element
    const position = el.value / (1 / video.duration); // get current position value
    const progress = `${(1 / video.duration) * position * 100}%`; // convert position value to percent

    video.currentTime = position;

    rangeProgressBar.style.setProperty('--slider-width', progress); // draw progress bar position (set percent to class style gradient)


};

rangeProgressBar.addEventListener('input', videoScrub);

let playerControlShownTimeOut;
const showPlayerControlPanel = () => {
    clearTimeout(playerControlShownTimeOut);
    playerControls.classList.add('player__controls-show');
    playerControlShownTimeOut = setTimeout(() => {
        playerControls.classList.remove('player__controls-show');
    }, 3000);
};
player.addEventListener('mousemove', showPlayerControlPanel);
player.addEventListener('click', showPlayerControlPanel);


// >----------------------------------------------------------------<
// >                              TIME                              <
// >----------------------------------------------------------------<

// ^.................. ( Convert number to time ) ...................

// const convertNumberToTime = (duration, current = 0) => {
//     // !---------- IN FEATURE → convert function to object --------------
//     const convertTotimeFormat = num => num = num < 10 ? `0${num}`: num;
//     const getconvertedTime = (num) => {
//         const time = {};
//         time.days = Math.floor(num / 60 / 60 / 60 / 24);
//         time.hour = convertTotimeFormat(Math.floor(num / 60 / 60 % 60));
//         time.min = convertTotimeFormat(Math.floor(num / 60 % 60));
//         time.sec = convertTotimeFormat(Math.floor(num % 60));

//         time.days = time.days < 1 ? "" : `${time.days}:`;
//         time.hour = time.hour < 1 ? "" : `${time.hour}:`;
//         time.min = time.min < 1 ? "" : `${time.min}:`;
//         time.sec = time.sec < 1 ? "" : `${time.sec}`;

//         return time;
//     };

//     const dur = getconvertedTime(duration);
//     const cur = getconvertedTime(current);

//     duration = `${dur.days}${dur.hour}${dur.min}${dur.sec}`;

//     cur.days = cur.days === "" ? `${dur.days}` : `${cur.days}`;
//     cur.hour = cur.hour === "" ? `${dur.hour}` : `${cur.days}`;
//     cur.min = cur.min === "" ? `${dur.min}` : `${cur.days}`;
//     cur.sec = cur.sec === "" ? `${dur.sec}` : `${cur.days}`;
//     current = `${cur.days}${cur.hour}${cur.min}${cur.sec}`;
//     // Msg(dur);



//     // min = min < 1 ? "" : `${min}:`;
//     // hour = hour < 1 ? "" : `${hour}:`;
//     // days = days < 1 ? "" : `${days}:`;
//     // return `${days}${hour}${min}${sec}`;
//     return {duration, current};
// };
const convertNumberToTime = (sec, format = 'HHMMSS') => {
    let from, length;
    if (format === 'HHMMSS') {
        from = 11;
        length = 8;
    } else if (format === 'MMSS'){
        from = 14;
        length = 5;
    } else if (format === 'SS'){
        from = 17;
        length = 2;
    }


    let date = new Date(null);
    date.setSeconds(sec); // specify value for SECONDS here
    let result = date.toISOString().substr(from, length);
    return result;
};


// ^-------------------------- time update --------------------------

const timeUpdate = () => {
    let duration = Math.floor(video.duration);
    let current = Math.floor(video.currentTime);
    const format = duration < 3600 ? 'MMSS' : 'HHMMSS';
    duration = convertNumberToTime(duration, format);
    current = convertNumberToTime(current, format);
    playerTime.innerHTML = `${current} / ${duration}`;
};

video.addEventListener('timeupdate', timeUpdate);
window.addEventListener('load', timeUpdate);
// window.addEventListener('load', function()































// ^------------------------- video progress ------------------------

// const videoProgressUpdate = () => {
//     const positionInPercent = (video.currentTime / video.duration) * 100;
//     progressFilled.style.flexBasis = `${positionInPercent}%`;

// };

// video.addEventListener('timeupdate', videoProgressUpdate);



// // ^-------------------------- video scrub --------------------------

// const videoScrub = (elem) => {
//     video.currentTime = elem.offsetX / progress.offsetWidth * video.duration;
//     // const positionInPercent = (video.currentTime / video.duration) * 100;
//     // progressFilled.style.flexBasis = `${positionInPercent}%`;

// };

// progress.addEventListener('click', videoScrub);
// progress.addEventListener('input', videoScrub);

// // let mousedown = false;
// // progress.addEventListener('mousedown', () => mousedown = true);
// // progress.addEventListener('mousedown', () => mousedown = false);
// // progress.addEventListener('mousemove', (el) => mousedown && videoScrub);










// // ^------------------- prograsbar via <progress> ---------------------

// const videoProgressBarUpdate = () => {
//     const positionInPercent = (video.currentTime / video.duration) * 100;
//     progressBar.value = positionInPercent;
// };
// video.addEventListener('timeupdate', videoProgressBarUpdate);



// // ^---------------------------------------------------------------------

// const videoScrub = (elem) => {
//     video.currentTime = elem.offsetX / progressBar.offsetWidth * video.duration;
//     // const positionInPercent = (video.currentTime / video.duration) * 100;
//     // progressFilled.style.flexBasis = `${positionInPercent}%`;

// };

// progressBar.addEventListener('click', videoScrub);
// // progressBar.addEventListener('input', videoScrub);

























// // ! >--------------------------------------------------------------<
// // ! >--------------------------------------------------------------<
// // ! >                       FROM INTERNET                          <
// // ! >--------------------------------------------------------------<
// // ! >--------------------------------------------------------------<
// let audioCtx, myAudio, source, gainNode;

// const I_audioBooster = (boost) => {

//     // Создаём MediaElementAudioSourceNode
//     // На основе HTMLMediaElement


//     // Создаём узел контроля громкости (усиления)


//     gainNode.gain.value = boost; // double the volume


//     // Последний шаг - построение графа
//     // Подсоединяем AudioBufferSourceNode к gainNode
//     // а gainNode, в свою очередь, к конечному узлу вывода
//     source.connect(gainNode);
//     gainNode.connect(audioCtx.destination);



//         // // create an audio context and hook up the video element as the source
//         // let audioCtx = new AudioContext();
//         // if (this.source === undefined) {
//         //     this.source = audioCtx.createMediaElementSource(audio);
//         // }
//         // this.scriptNode = window.audioCtx.createScriptProcessor(4096, 1, 1);
//         // this.source.connect(this.scriptNode);
//         // this.scriptNode.connect(window.audioCtx.destination);

//         // // create a gain node
//         // let gainNode = audioCtx.createGain();
//         // gainNode.gain.value = boost; // double the volume
//         // source.connect(gainNode);

//         // // connect the gain node to an output destination
//         // gainNode.connect(audioCtx.destination);
// };


// // ^--------------------- toggle audio booster ----------------------
// audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// myAudio = document.querySelector('.viewer');
// source = audioCtx.createMediaElementSource(myAudio);
// gainNode = audioCtx.createGain();

// const boostAudio = (elem) => {
//     const el = elem.target;
//     let isBoosted;

//     if(localStorage.getItem('boosted')) {
//         isBoosted = localStorage.getItem('boosted');
//         isBoosted = isBoosted === 'true' ? true : false;
//     } else {
//         isBoosted = false;
//     }

//     if (isBoosted) {
//         el.style.backgroundImage = 'url("./assets/svg/boost-x.svg")';
//         localStorage.setItem('boosted', 'false');
//         I_audioBooster(1);
//     } else {
//         el.style.backgroundImage = 'url("./assets/svg/boost.svg")';
//         localStorage.setItem('boosted', 'true');
//         I_audioBooster(4);
//     }
// };
// buttonAudioBoost.addEventListener('click', boostAudio);
