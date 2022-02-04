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
// const progress = player.querySelector('.progress');
// const progressFilled = player.querySelector('.progress__filled');
const buttonVolume = player.querySelector('.player__button-volume');
const buttonFullscreen = player.querySelector('.player__button-fullscreen');

const progressBar = player.querySelector('.progress-bar');
const playToggleBtn = player.querySelector('.player__button-play-toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const range = player.querySelector('.player__slider');
const rangeProgress = player.querySelector('.player__slider-progress');
const playerTime = player.querySelector('.player__time');


// >----------------------------------------------------------------<
// >                         PLAY BUTTONS                           <
// >----------------------------------------------------------------<

// ^----------------------- play / pause video ----------------------

const togglePlay = () => {
    let isPlay = video.paused ? video.play() : video.pause();
    // video[state]();
};

video.addEventListener('click', togglePlay);
playToggleBtn.addEventListener('click', togglePlay);



// ^--------------------- update play button img --------------------

const updatePlayToggleButton = () => {
    if (video.paused) {
        playToggleBtn.style.backgroundImage = 'url("./assets/svg/play.svg")';
    } else {
        playToggleBtn.style.backgroundImage = 'url("./assets/svg/pause.svg")';
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



// ^------------------ volume range update via input ----------------

const rangeUpdate = (elem) => {
    const el = elem.target;
    const rangeName = el.name;
    video[rangeName] = el.value;

    let progress = `${el.value * 100}%`;
    rangeProgress.style.setProperty('--slider-width', progress);
};

range.addEventListener('input', rangeUpdate);



// >----------------------------------------------------------------<
// >                             VOLUME                             <
// >----------------------------------------------------------------<

// ^----------------- volume range update via scroll ----------------

const rangeUpdateScroll = (elem) => {
    const el = elem.target; // get target element
    const rangeName = el.name; // get element name

    const scroll = Math.round(elem.deltaY * -0.01); // get scroll direction

    video[rangeName] = el.value; // reset range positon to real value

    // get new value
    let newValue = video[rangeName] + (Math.floor(scroll * 0.05 * 100) / 100);
    newValue = Math.round(newValue * 100) / 100;
    newValue = newValue < 0 ? 0 : newValue;
    newValue = newValue > 1 ? 1 : newValue;

    el.value = newValue; // set range new value
    video[rangeName] = newValue; // set volume new value

    // change new value to CSS
    let progress = `${newValue * 100}%`;
    rangeProgress.style.setProperty('--slider-width', progress);
};

range.addEventListener('wheel', rangeUpdateScroll);



// ^---------------------- update volume button ---------------------

const updateVolumeButton = () => {
    if (range.value <= 0) {
        buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-x.svg")';
    } else if ((range.value > 0.5)){
        buttonVolume.style.backgroundImage = 'url("./assets/svg/volume-more.svg")';
    } else {
        buttonVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
    }
};

video.addEventListener('volumechange', updateVolumeButton);

// >----------------------------------------------------------------<
// >                              TIME                              <
// >----------------------------------------------------------------<

// ^.................. ( Convert number to time ) ...................

const convertNumberToTime = (duration, current = 0) => {
    // !--------------- convert function to object ------------------
    const convertTotimeFormat = num => num = num < 10 ? `0${num}`: num;
    const getconvertedTime = (num) => {
        const time = {};
        time.days = Math.floor(num / 60 / 60 / 60 / 24);
        time.hour = convertTotimeFormat(Math.floor(num / 60 / 60 % 60));
        time.min = convertTotimeFormat(Math.floor(num / 60 % 60));
        time.sec = convertTotimeFormat(Math.floor(num % 60));

        time.days = time.days < 1 ? "" : `${time.days}:`;
        time.hour = time.hour < 1 ? "" : `${time.hour}:`;
        time.min = time.min < 1 ? "" : `${time.min}:`;
        time.sec = time.sec < 1 ? "" : `${time.sec}`;

        return time;
    };

    const dur = getconvertedTime(duration);
    const cur = getconvertedTime(current);

    duration = `${dur.days}${dur.hour}${dur.min}${dur.sec}`;

    cur.days = cur.days === "" ? `${dur.days}` : `${cur.days}`;
    cur.hour = cur.hour === "" ? `${dur.hour}` : `${cur.days}`;
    cur.min = cur.min === "" ? `${dur.min}` : `${cur.days}`;
    cur.sec = cur.sec === "" ? `${dur.sec}` : `${cur.days}`;
    current = `${cur.days}${cur.hour}${cur.min}${cur.sec}`;
    // Msg(dur);



    // min = min < 1 ? "" : `${min}:`;
    // hour = hour < 1 ? "" : `${hour}:`;
    // days = days < 1 ? "" : `${days}:`;
    // return `${days}${hour}${min}${sec}`;
    return {duration, current};
};



// ^-------------------------- time update --------------------------

const timeUpdate = () => {
    const time = convertNumberToTime(video.duration, video.currentTime);
    playerTime.innerHTML = `${time.current} / ${time.duration}`;
    // convertNumberToTime(4822);
};

video.addEventListener('timeupdate', timeUpdate);
window.addEventListener('load', timeUpdate);
// window.addEventListener('load', function()



// >----------------------------------------------------------------<
// >                            PROGRESS                            <
// >----------------------------------------------------------------<

// ^------------------------- video progress ------------------------

const videoProgressUpdate = () => {
    const positionInPercent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${positionInPercent}%`;

};

video.addEventListener('timeupdate', videoProgressUpdate);



// ^-------------------------- video scrub --------------------------

const videoScrub = (elem) => {
    video.currentTime = elem.offsetX / progress.offsetWidth * video.duration;
    // const positionInPercent = (video.currentTime / video.duration) * 100;
    // progressFilled.style.flexBasis = `${positionInPercent}%`;

};

progress.addEventListener('click', videoScrub);
progress.addEventListener('input', videoScrub);

// let mousedown = false;
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mousedown', () => mousedown = false);
// progress.addEventListener('mousemove', (el) => mousedown && videoScrub);



// ^---------------------------------------------------------------------

const videoProgressBarUpdate = () => {
    const positionInPercent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${positionInPercent}%`;

};
progressBar.addEventListener('timeupdate', videoProgressBarUpdate);
