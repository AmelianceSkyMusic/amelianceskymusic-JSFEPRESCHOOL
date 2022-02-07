/* jshint esversion: 9 */
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
    './assets/svg/fullscreen-off.svg',
    './assets/svg/fullscreen.svg',
    './assets/svg/github-icon.svg',
    './assets/svg/go-to-start.svg',
    './assets/svg/maximize.svg',
    './assets/svg/minimize.svg',
    './assets/svg/pause.svg',
    './assets/svg/play-big-button.svg',
    './assets/svg/play.svg',
    './assets/svg/rewind.svg',
    './assets/svg/rs_school_js-logo.svg',
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
// >                       GET AUDIO CONTEXT                        <
// >----------------------------------------------------------------<

// ******************************************************************
// * Get concept from https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation
// ******************************************************************

// ^------------- get audio context and return work item-------------

const getAudioContext = (boost) => {

    let context = new AudioContext();
    let audioSource = context.createMediaElementSource(document.getElementById("my-video"));
    let gainItem = context.createGain();

    audioSource.connect(gainItem);
    gainItem.connect(context.destination);

    return gainItem;
};





// >----------------------------------------------------------------<
// >                           SETTINGS                             <
// >----------------------------------------------------------------<

// ^------------------------ player settings ------------------------
// let PS = { // player settings
//     boost : 1, // boostAudio()
//     isPlayerInit : false,
//     isPause : true,
//     isOnControls: false,
//     isFullscreen: false,
//     isMaximize: false,
// };

let PS = {}; // player settings

// ^--------------------- INIT and load settings --------------------

window.addEventListener('load', () => {

    PS = { // player settings
        volume              : 0.5, // 0-1
        volumeWatcher    : 0.5, // 0-1
        currentTimePosition : 0, // 0-1

        isMute  : false,


        // SESSION settings - not loaded from settings
        boost   : 1, // boostAudio() boost autio varible 1 or 3
        tempGainItem    : undefined,


        isPlayerInit    : false,
        isPause         : true,
        isOnControls    : false,
        isFullscreen    : false,
        isMaximize      : false,

    };

    if(localStorage.getItem('playerSettings')) {
        let receivedPlayerSettings = JSON.parse(localStorage.getItem('playerSettings')); // read\
        PS = {...PS, ...receivedPlayerSettings};
        // Msg('try to load settings');
    }
});


// ^------------------------ save settings --------------------------

window.addEventListener('beforeunload', () => {


    let savingPlayerSettings = {
        volume              : PS.volume, // 0-1
        volumeWatcher       : PS.volumeWatcher, // 0-1
        currentTimePosition : PS.currentTimePosition, // 0-1

        isMute  : PS.isMute,

        // SESSION settings - not loaded from settings
        // boost           : PS.boost,
        // tempGainItem      : PS.tempGainItem,

        // isPlayerInit    : PS.isPlayerInit,
        // isPause         : PS.isPause,
        // isOnControls    : PS.isOnControls,
        // isFullscreen    : PS.isFullscreen,
        // isMaximize      : PS.isMaximize,

    };

    localStorage.setItem('playerSettings', JSON.stringify(savingPlayerSettings)); // write
});


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

const buttonAudioBoost = player.querySelector('.player__button-audio-boost');

const playerTime = player.querySelector('.player__time');

const skipButtons = player.querySelectorAll('[data-skip]');
const buttonGoToStart = player.querySelector('.player__button-go-to-start');
const playToggleBtn = player.querySelector('.player__button-play-toggle');





// >----------------------------------------------------------------<
// >                          FULLSCREEN                            <
// >----------------------------------------------------------------<

// ^--------------------------- fullscreen --------------------------

const setFullscreenToggle = () => {

    if (PS.isMaximize) {
        setMaximizeToggle();
        PS.isMaximize = false;
    }

    if (player.requestFullscreen) {
        player.requestFullscreen();

    } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
    }

    if (document.fullscreenElement) {
        document.exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    }

    if (!document.fullscreenElement) {
        PS.isFullscreen = true;
        buttonFullscreen.style.backgroundImage = 'url("./assets/svg/fullscreen-off.svg")';
    } else {
        PS.isFullscreen = false;
        buttonFullscreen.style.backgroundImage = 'url("./assets/svg/fullscreen.svg")';
    }

};



buttonFullscreen.addEventListener('click', setFullscreenToggle);

// ^---------------------------- maximize ---------------------------

const setMaximizeToggle = () => {


    if (PS.isFullscreen) {
        setFullscreenToggle();
        PS.isFullscreen = false;
    }

    if (player.classList.contains('player-maximize')) {
        PS.isMaximize = false;
        buttonMaximize.style.backgroundImage = 'url("./assets/svg/maximize.svg")';
    } else {
        PS.isMaximize = true;
        buttonMaximize.style.backgroundImage = 'url("./assets/svg/minimize.svg")';
    }

    player.classList.toggle('player-maximize');
    video.classList.toggle('player-maximize');
};


buttonMaximize.addEventListener('click', setMaximizeToggle);





// >----------------------------------------------------------------<
// >                         PLAY BUTTONS                           <
// >----------------------------------------------------------------<

// ^-------------------------- init player --------------------------
if (!PS.isPlayerInit) {
    const initPlayer = () => {
        playerControls.classList.remove('player__controls-before-init');
        PS.isPlayerInit = true;
        showPlayerControlPanel();
    };

    playBigButton.addEventListener('click', initPlayer);
    video.addEventListener('click', initPlayer);
}

// ^----------------------- play / pause video ----------------------

const togglePlayPlayer = () => {
    if (video.paused) {
        video.play();
        PS.isPause = false;
    } else {
        video.pause();
        PS.isPause = true;
        playerControls.classList.remove('player__controls-show');
    }

};

video.addEventListener('click', togglePlayPlayer);
playerBlackout.addEventListener('click', togglePlayPlayer);
playBigButton.addEventListener('click', togglePlayPlayer);



// ^----------------------- play / pause video ----------------------

const togglePlay = () => {
    if (video.paused) {
        video.play();
        PS.isPause = false;
    } else {
        video.pause();
        PS.isPause = true;
    }
};

playToggleBtn.addEventListener('click', togglePlay);



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
};

skipButtons.forEach(button => button.addEventListener('click', skip));



// ^------------------------- go to start --------------------------

const goToStart = () => {
    video.pause();
    video.currentTime = 0;
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

    if(localStorage.getItem('volume')) {
        // volume = localStorage.getItem('volume');
        PS.volume = PS.volumeWatcher;
    } else {
        PS.volume = 0.5;
    }


    if (PS.isMute === true) PS.volume = 0;

    rangeVolume.value = PS.volume; // set range new value
    video[rangeVolume.name] = PS.volume; // set volume new value

    // change new value to CSS
    let progress = `${PS.volume * 100}%`;
    rangeVolume.style.setProperty('--slider-width', progress);
});



// // ^---------------------- save volume before unload ---------------------

// window.addEventListener('beforeunload', () => {

//     // const volume = Math.floor(rangeVolume.value * 100) / 100;

//     if (PS.volume <= 0) {
//         // localStorage.setItem('volumeButtonMute', true);
//         PS.isMute = true;
//     } else {
//         // localStorage.setItem('volumeButtonMute', false);
//         PS.isMute = false;
//     }
// });



// ^---------------------- update volume button ---------------------

const updateVolumeButton = () => {

    PS.volume = Math.floor(rangeVolume.value * 100) / 100;

    if (PS.volume <= 0) {

        buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-x.svg")';
        PS.isMute = true;

    } else {

        if (PS.volume > 0.50){
            buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-more.svg")';
        } else {
            buttonVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
        }
        PS.isMute = false;
        // localStorage.setItem('volume', volume);
        PS.volumeWatcher = PS.volume;
        // localStorage.setItem('playerSettings', JSON.stringify(PS)); // write
    }
};

video.addEventListener('volumechange', updateVolumeButton);


// ^------------------- toggle mute volume button -------------------
const toggleMute = () => {

    if (video[rangeVolume.name] > 0) {
        PS.volume = 0;
        PS.isMute = true;
    } else {
        PS.volume = PS.volumeWatcher;
        PS.isMute = false;
    }

    video[rangeVolume.name] = PS.volume; // set video volume to 0
    rangeVolume.value = PS.volume; // set range value to 0

    // change new value to CSS
    let progress = `${PS.volume * 100}%`;
    rangeVolume.style.setProperty('--slider-width', progress);


};

buttonVolume.addEventListener('click', toggleMute);





// >----------------------------------------------------------------<
// >                            PROGRESS                            <
// >----------------------------------------------------------------<

// ^------------------- video progress bar update  ------------------

const videoProgressBarUpdate = () => {

    PS.currentTimePosition = (video.currentTime / video.duration); // get position value
    const progress = `${PS.currentTimePosition * 100}%`; // convert position value to percent

    rangeProgressBar.value = PS.currentTimePosition; // set position value

    rangeProgressBar.style.setProperty('--slider-width', progress); // draw progress bar position (set percent to class style gradient)

};

video.addEventListener('timeupdate', videoProgressBarUpdate);



// ^------------------- video progress bar scrub  ------------------

const videoScrub = (elem) => {

    const el = elem.target; // get target element
    PS.currentTimePosition = el.value / (1 / video.duration); // get current position sec
    const progress = `${(1 / video.duration) * PS.currentTimePosition * 100}%`; // convert position value to percent

    video.currentTime = PS.currentTimePosition;

    rangeProgressBar.style.setProperty('--slider-width', progress); // draw progress bar position (set percent to class style gradient)


};

rangeProgressBar.addEventListener('input', videoScrub);



// ^----------------- volume range update via scroll ----------------

const videoProgressBarUpdateScroll = (elem) => {

    const el = elem.target; // get target element
    PS.currentTimePosition = el.value / (1 / video.duration); // get current position sec
    const scroll = Math.round(elem.deltaY * -0.01); // get scroll direction

    let newPosition = PS.currentTimePosition + (scroll * 10);

    newPosition = Math.round(newPosition * 100) / 100;
    newPosition = newPosition < 0 ? 0 : newPosition;
    newPosition = newPosition > video.duration ? video.duration : newPosition;

    video.currentTime = newPosition;
};

rangeProgressBar.addEventListener('wheel', videoProgressBarUpdateScroll);
// player.addEventListener('wheel', videoProgressBarUpdateScroll);





// >----------------------------------------------------------------<
// >                         CONTROL PANEL                          <
// >----------------------------------------------------------------<

// ^---------------------- show player control ---------------------

let playerControlShownTimeOut;

const showPlayerControlPanel = () => {

    if (!PS.isPlayerInit) {
        return;
    }

    if (!PS.isPause) {
        clearTimeout(playerControlShownTimeOut); // clear timout — prevert close panel

        playerControls.classList.add('player__controls-show'); // show panel

        if (!PS.isOnControls) {
            playerControlShownTimeOut = setTimeout(() => { // close panel after 3sec
                playerControls.classList.remove('player__controls-show');
            }, 3000);
        }
    }

};

player.addEventListener('mousemove', showPlayerControlPanel);
player.addEventListener('click', showPlayerControlPanel);
player.addEventListener('wheel', showPlayerControlPanel);



// ^---------------------- show player control ---------------------
playerControls.addEventListener('mouseover', () => {
    PS.isOnControls = true;
} );

playerControls.addEventListener('mouseleave', () => {
    PS.isOnControls = false;
    playerControlShownTimeOut = setTimeout(() => { // close panel after 3sec
        playerControls.classList.remove('player__controls-show');
    }, 3000);
} );




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
    date.setSeconds(sec); // convert sec to date
    date = date.toISOString(); // convert data to ISO string format 1970-01-01T00:00:01.000Z
    let result = date.substr(from, length); // cut needed data
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





// >----------------------------------------------------------------<
// >                         BOOST AUDIO                            <
// >----------------------------------------------------------------<

// ^--------------------- toggle audio booster ----------------------

const boostAudio = (elem) => {
    const el = elem.target;
    if(!PS.tempGainItem) {
        PS.tempGainItem = getAudioContext();
    }

    if (PS.boost === 1) {
        el.style.backgroundImage = 'url("./assets/svg/boost.svg")';
        PS.boost = 3;
        PS.tempGainItem.gain.value = PS.boost;
    } else {
        el.style.backgroundImage = 'url("./assets/svg/boost-x.svg")';
        PS.boost = 1;
        PS.tempGainItem.gain.value = PS.boost;
    }
};

buttonAudioBoost.addEventListener('click', boostAudio);









// >----------------------------------------------------------------<
// >                              TEST                              <
// >----------------------------------------------------------------<

// Get concept from https://developer.mozilla.org/ru/docs/Web/API/Element/keyup_event

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
