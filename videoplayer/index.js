/* jshint esversion: 6 */
// /*jshint -W033 */

// ^................... ( Msg from console.log ) ....................

const Msg = msg => console.log(msg);

// >----------------------------------------------------------------<
// >                          CASH IMAGES                           <
// >----------------------------------------------------------------<

const playerImages = [
    './assets/svg/backward.svg',
    './assets/svg/boost-x.svg',
    './assets/svg/boost.svg',
    './assets/svg/fullscreen.svg',
    './assets/svg/go-to-start.svg',
    './assets/svg/maximize.svg',
    './assets/svg/minimize.svg',
    './assets/svg/pause.svg',
    './assets/svg/play-big-button.svg',
    './assets/svg/play.svg',
    './assets/svg/rewind.svg',
    './assets/svg/settings.svg',
    './assets/svg/stop.svg',
    './assets/svg/volume-more.svg',
    './assets/svg/volume-x.svg',
    './assets/svg/volume.svg',
];

const preloadImages = (imagesArr) => {
        //cash images
        for (let key of imagesArr) {
            const img = new Image();
            img.src = key;
        }
};

preloadImages(playerImages);

// >----------------------------------------------------------------<
// >                              INIT                              <
// >----------------------------------------------------------------<

// var context = new AudioContext(),
//     audioSource = context.createMediaElementSource(document.getElementById("my-video")),
//     filter = context.createBiquadFilter();
// audioSource.connect(filter);
// filter.connect(context.destination);
const getAudioContext = (boost) => {
    // if (context) {
    //     context.resume().then(() => {
    //         console.log('Playback resumed successfully');
    //     });
    // }
    let context = new AudioContext();
    let audioSource = context.createMediaElementSource(document.getElementById("my-video"));
    let gainItem = context.createGain();
    audioSource.connect(gainItem);
    gainItem.connect(context.destination);

    // gainItem.gain.value = boost;
    // context.resume();
    return gainItem;
};

// window.addEventListener('load', () => {
//     if (context) {
//         context.resume().then(() => {
//             console.log('Playback resumed successfully');
//         });
//     }
//         context = new AudioContext();
//     let audioSource = context.createMediaElementSource(document.getElementById("my-video")),
//         gainItem = context.createGain();
//     audioSource.connect(gainItem);
//     gainItem.connect(context.destination);

//     gainItem.gain.value = 1;
// });

// // Configure filter
// filter.type = "lowshelf";
// filter.frequency.value = 1000;
// filter.gain.value = 25;

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

const buttonAudioBoost = player.querySelector('.player__button-audio-boost');

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
    const position = el.value / (1 / video.duration); // get current position sec
    const progress = `${(1 / video.duration) * position * 100}%`; // convert position value to percent

    video.currentTime = position;

    rangeProgressBar.style.setProperty('--slider-width', progress); // draw progress bar position (set percent to class style gradient)


};

rangeProgressBar.addEventListener('input', videoScrub);

// ^----------------- volume range update via scroll ----------------

const videoProgressBarUpdateScroll = (elem) => {

    const el = elem.target; // get target element
    const position = el.value / (1 / video.duration); // get current position sec
    const scroll = Math.round(elem.deltaY * -0.01); // get scroll direction

    let newPosition = position + (scroll * 10);

    newPosition = Math.round(newPosition * 100) / 100;
    newPosition = newPosition < 0 ? 0 : newPosition;
    newPosition = newPosition > video.duration ? video.duration : newPosition;

    video.currentTime = newPosition;
};

rangeProgressBar.addEventListener('wheel', videoProgressBarUpdateScroll);
// player.addEventListener('wheel', videoProgressBarUpdateScroll);



// ^---------------------- show player controll ---------------------

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
player.addEventListener('wheel', showPlayerControlPanel);



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
// window.addEventListener('onload', () => {
//     audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//     myAudio = document.querySelector('.viewer');
//     source = audioCtx.createMediaElementSource(myAudio);
//     gainNode = audioCtx.createGain();

//     source.connect(gainNode);
//     gainNode.connect(audioCtx.destination);
// });












let GP = {
    boost : 1,
};

const boostAudio = (elem) => {
    const el = elem.target;

    if(!GP.tempGainItem) {
        GP.tempGainItem = getAudioContext();
    }

    if (GP.boost === 1) {
        el.style.backgroundImage = 'url("./assets/svg/boost.svg")';
        GP.boost = 3;
        GP.tempGainItem.gain.value = GP.boost;
    } else {
        el.style.backgroundImage = 'url("./assets/svg/boost-x.svg")';
        GP.boost = 1;
        GP.tempGainItem.gain.value = GP.boost;
    }
};

buttonAudioBoost.addEventListener('click', boostAudio);



















const sendKey = (elem) => {

    switch (elem.key) {
        case 'ArrowRight': Msg('r'); break;
        case 'ArrowLeft': Msg('l'); break;
        case 'ArrowUp': Msg('u'); break;
        case 'ArrowDown': Msg('d'); break;
        default: break;
    }
    showPlayerControlPanel();
};

document.addEventListener('keyup', sendKey);












// var g_6z;
// function cI_6z() {
//     var ctx_6z = new AudioContext();
//     var el_6z = document.querySelector("video") ? document.querySelector("video") : document.querySelector("audio")? document.querySelector("audio"):alert('Media DOM not exist. Aborting.');
//     if (el_6z) {
//         g_6z = ctx_6z.createGain();
//         g_6z.gain.value = 1;
//         var src_6z = ctx_6z.createMediaElementSource(el_6z);
//         src_6z.connect(g_6z).connect(ctx_6z.destination);
//         var p = document.createElement("div");
//         p.innerHTML = `<div class=vpc_6z id=vpc_6z><style>.vpc_6z{float:right;width:25%;position:fixed;bottom:0;padding:20px 20px;z-index:9999999;background:#444;color:#fff}.vpc_6z-hide{position:fixed;background:#444;padding:0;width:80px;height:30px;bottom:0;z-index:999999}.vpi_6z-hide{display:none}</style><button onclick='d=document.getElementById("vpi_6z"),"vpi_6z"==d.getAttribute("class")?d.setAttribute("class","vpi_6z-hide"):d.setAttribute("class","vpi_6z"),c=document.getElementById("vpc_6z"),"vpc_6z"==c.getAttribute("class")?c.setAttribute("class","vpc_6z-hide"):c.setAttribute("class","vpc_6z")'style=float:right;cursor:pointer;width:80px;height:30px>Toggle VP</button><div class=vpi_6z id=vpi_6z><button onclick='document.getElementById("vpc_6z").remove()'>Destroy Panel</button><h1>Volume Gain: <span ></span></h1><input max=100 min=1 onchange='v=this.value,cG_6z(v),document.getElementById("volumeControl_e").innerHTML=1*v+100,console.log(v)'style=width:100% type=range value=1></div></div>`;
//         document.body.appendChild(p);
//     }
// };
// function cG_6z(v) {
//     g_6z.gain.value = v;
// };
// cI_6z(1);
