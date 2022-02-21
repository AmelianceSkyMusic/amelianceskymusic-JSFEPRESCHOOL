'use strict';
// // /* jshint esversion: 9 */
// // /*jshint -W033 */
// /* jshint browser: true */
// /* jshint browser: true */
// /* global
//         localStorage: false,
//         console: false,
//         alert: true*/


import {Msg} from './ASM_js-functions.js';
import * as asm from './ASM_js-functions.js';


const MsgA = (msgArray) =>  {
    let result = [];
    // for (let i = 0; i < msgArray.length; i++) {
            result = msgArray.join(' ');
    // }
    return result;
};

const createHTMLElem = (parentName, divClass, element = 'div') => { // create element
    const divName = document.createElement(element);
    divName.classList.add(divClass);
    parentName.append(divName);
    return divName;
};

// const MsgA = (msgArray) =>  {
//     let result = [];
//     if (Array.isArray(msgArray)) {
//         for (let i = 0; i < msgArray.length; i++) {
//             if (Array.isArray(msgArray[i])) MsgA(msgArray[i]);
//             result += ' ';
//         }
//     } else {
//         return;
//     }
//     return result;
// };
// >----------------------------------------------------------------<
// >                             INIT                               <
// >----------------------------------------------------------------<

let GS = {};


// ^------------------------ load settings ------------------------

const loadSettings = () => {
    GS = {
        theme: 'Dark',
        gameMode: 2048,

        bestScore: 0,
        gameScore: 0,
        scoresTable: [
            [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0],
        ],

        gameTable:  [
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
        ],

    };

    if(localStorage.getItem('settings')) { // load settings if exists
        let receivedSettings = JSON.parse(localStorage.getItem('settings')); // read
        GS = {...GS, ...receivedSettings};
    }

    setTheme();
    initGame();
    // alert('Правила игры предпологают, что выиграш наступит в случае если вы соберете блок 2048, но для ускорения процесса проверки я поставил граничное значение 128')
};


window.addEventListener('load', loadSettings);


// ^------------------------ init game ------------------------

const initGame = () => {
    document.querySelector('.stats__game-score').innerHTML = GS.gameScore;
    document.querySelector('.stats__game-score-best').innerHTML = GS.bestScore;
    document.querySelector('.option-item__theme').innerHTML = `Theme: ${GS.theme}`;
    document.querySelector('.option-item__game-mode').innerHTML = `Game mode: ${GS.gameMode}`;

    // let table = [
    // [2, 16, 2, 4,],
    // [4, 32, 8, 4,],
    // [16, 8, 32, 64,],
    // [4, 2, 0, 0,],
    // ];
    // GS.gameTable = table;

    redrawBlocks();
    const emptyBlocks = getEmptyBlocks();
    if (emptyBlocks.length === 16) {
        generateNewBlock();
        generateNewBlock();
    }

    // TODO: CREATE THEME CHANGER
    // !!!! CREATE THEME CHANGER
    // ! setTheme();
};


// ^------------------------ collect settings --------------------------

const collectSettings = () => {
    let maxBlock = getmaxBlock();
    GS.scoresTable.push([GS.gameScore, maxBlock]);
    GS.scoresTable.sort((a, b) => b[0] - a[0]).splice(10);
};


// ^------------------------ save settings --------------------------

const saveSettings = () => {

    collectSettings();

    let savingSettings = {
        theme:          GS.theme,

        bestScore:      GS.bestScore,
        gameScore:      GS.gameScore,
        scoresTable:    GS.scoresTable,

        gameTable:      GS.gameTable,
        gameMode:       GS.gameMode,
    };

    localStorage.setItem('settings', JSON.stringify(savingSettings)); // write
};

window.addEventListener('beforeunload', saveSettings);

// ^------------------------ Reset All Settings ------------------------

const resetAllSettings = () => {

    const resetSettings = {
        gameMode: 2048,

        bestScore: 0,
        gameScore: 0,
        scoresTable: [
            [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0],
        ],

        gameTable:  [
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
        ],

    };
    GS = {...GS, ...resetSettings};

    localStorage.setItem('settings', JSON.stringify(GS)); // write
};

// ^------------------------ reset settings ------------------------

const resetCurrentGameSettings = () => {

    const resetCurrentGameSettings = {
        gameScore: 0,
        gameTable:  [
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
            [0, 0, 0, 0,],
        ],
    };

    GS = {...GS, ...resetCurrentGameSettings};

    localStorage.setItem('settings', JSON.stringify(GS)); // write
};


// ^------------------------ update settings ------------------------

const updateSettings = () => {
    document.querySelector('.stats__game-score').innerHTML = GS.gameScore;
    saveSettings();
};


// ^------------------------ start new game ------------------------

const startNewGame = () => {

    updateBestScore(); // update best score varible

    saveSettings(); // save settings

    resetCurrentGameSettings(); // reset game settings

    updateGameScore(); // reset current game score varible

    initGame(); // init game with new settings

};




// >----------------------------------------------------------------<
// >                             SCORE                              <
// >----------------------------------------------------------------<

// ^------------------------ update best score ------------------------

const updateBestScore = () => {
    GS.bestScore = GS.bestScore > GS.gameScore ? GS.bestScore : GS.gameScore;
    document.querySelector('.stats__game-score-best').innerHTML = GS.bestScore;
};

// ^------------------------ update game score ------------------------

const updateGameScore = () => {
    document.querySelector('.stats__game-score').innerHTML = GS.gameScore;
};




// >----------------------------------------------------------------<
// >                             CHECKS                             <
// >----------------------------------------------------------------<

// ^------------------------ Get Max Block ------------------------

const getmaxBlock = () => {
    const table = GS.gameTable;
    let block = 0;
    for (let row = 0; row < table.length; row++) { // run lines
        for (let col = 0; col < table[row].length - 1; col++) {
            if (table[row][col] > block) {
                block = table[row][col];
            }
        }
    }
    return block;
};

// ^------------------------ can move left ------------------------

// const canMoveLeft = () => { // 'toLeft' or 'toRight'

//     let firstEl = 0;

//     const table = GS.gameTable; // link

//     for (let x = 0; x < table.length; x++) {

//         if (table[x][firstEl] === 0) return true; // check if first element is 0 then can move

//         let zeroAfterNumber = false;

//         for (let y = 1; y < table[x].length; y++) {

//             if (table[x][y] === 0) {
//                 zeroAfterNumber = true;
//             }

//             if (zeroAfterNumber && table[x][y] > 0) {
//                 return true;
//             }
//         }
//     }
//     Msg('can move finish function')
//     return false;
// };


// ^------------------------ Is Empty Cells Near Left Edge ------------------------

const isEmptyCellsNearLeftEdge = () => {
    const table = GS.gameTable; // link
    for (let row = 0; row < table.length; row++) {
        if (table[row][0] === 0) return true; // check if first element is 0
    }
    return false;
};


// ^------------------------ Is Empty Cells Near Right Edge ------------------------

const isEmptyCellsNearRightEdge = () => {
    const table = GS.gameTable; // link
    for (let row = 0; row < table.length; row++) {
        if (table[row][3] === 0) return true; // check if first element is 0
    }
    return false;
};


// ^------------------------ Is Empty Cells Near Top Edge ------------------------

const isEmptyCellsNearTopEdge = () => {
    const table = GS.gameTable; // link
    for (let col = 0; col < table.length; col++) {
        if (table[0][col] === 0) return true; // check if first element is 0
    }
    return false;
};


// ^------------------------ Is Empty Cells Near Bottom Edge ------------------------

const isEmptyCellsNearBottomEdge = () => {
    const table = GS.gameTable; // link
    for (let col = 0; col < table.length; col++) {
        if (table[3][col] === 0) return true; // check if first element is 0
    }
    return false;
};


// ^------------------------ Is Empty Cells Between Numbers Columns ------------------------

const isEmptyCellsBetweenNumbersColumns = () => {
    const table = GS.gameTable; // link
    for (let row = 0; row < table.length; row++) {

        let firstNumber = false;
        let zeroAfterNumber = false;

        for (let col = 0; col < table[row].length; col++) {

            if (table[row][col] > 0) {
                firstNumber = true;
            }

            if (firstNumber && table[row][col] === 0) {
                zeroAfterNumber = true;
            }

            if (zeroAfterNumber && table[row][col] > 0) {
                return true;
            }
        }
    }
    return false;
};


// ^------------------------ Is Empty Cells Between Numbers Rows ------------------------

const isEmptyCellsBetweenNumbersRows = () => {
    const table = GS.gameTable; // link
    for (let col = 0; col < table.length; col++) {

        let firstNumber = false;
        let zeroAfterNumber = false;

        for (let row = 0; row < table[col].length; row++) {

            if (table[row][col] > 0) {
                firstNumber = true;
            }

            if (firstNumber && table[row][col] === 0) {
                zeroAfterNumber = true;
            }

            if (zeroAfterNumber && table[row][col] > 0) {
                return true;
            }
        }
    }
    return false;
};

// ^------------------------ is empty cells ------------------------

// const isEmptyCells = () => { // TODO: NEEDS REFACTORING
//     const table = GS.gameTable;
//     for (let row = 0; row <= 3; row++) { // run lines
//         if( table[row][0] === 0 ||
//             table[row][1] === 0 ||
//             table[row][2] === 0 ||
//             table[row][3] === 0 ) {
//             return true;
//         }
//     }
//     for (let col = 0; col <= 3; col++) { // run lines
//         if( table[0][col] === 0 ||
//             table[1][col] === 0 ||
//             table[2][col] === 0 ||
//             table[3][col] === 0 ) {
//             return true;
//         }
//     }
//     return false;
// };

// ^------------------------ Is Same Cells Near Horizontal ------------------------

const isSameCellsNearHorizontal = () => {
    const table = GS.gameTable; // link

    for (let row = 0; row < table.length; row++) { // run lines
        for (let col = 0; col < table[row].length - 1; col++) {
            if (table[row][col] === table[row][col+1] && table[row][col] !== 0) {
                return true;
            }
        }
    }
    return false;
};

// ^------------------------ Is Same Cells Near Vertical ------------------------

const isSameCellsNearVertical = () => {
    const table = GS.gameTable; // link

    for (let col = 0; col < table.length; col++) { // run lines
        for (let row = 0; row < table[col].length - 1; row++) {
            if (table[row][col] === table[row+1][col] && table[row][col] !== 0) {
                return true;
            }
        }
    }
    return false;
};

// ^------------------------ Is Empty Cells ------------------------

const isEmptyCells = () => {
    const table = GS.gameTable;
    for (let row = 0; row < table.length; row++) { // run lines
        for (let col = 0; col < table[row].length ; col++) {
            if (table[row][col] === 0) {
                return true;
            }
        }
    }
    return false;
};


// ^------------------------ is no steps horizontal ------------------------

// const isNoStepsHorizontal = () => {

//     if(isEmptyCells() === false  isSameCellsNearHorizontal() === false) {
//         return true;
//     } else {
//         return false;
//     }
// };


// ^------------------------ is no steps vertical ------------------------

// const isNoStepsVertical = () => {

//     if(isEmptyCells() === false  isSameCellsNearVertical() === false) {
//         return true;
//     } else {
//         return false;
//     }
// };

// ^------------------------ Is No Steps ------------------------

const isNoSteps = () => {
    if (isEmptyCells()) return false;
    if (isSameCellsNearHorizontal()) return false;
    if (isSameCellsNearVertical()) return false;
    return true;
};


// ^------------------------ Is Table Changed ------------------------

// const isGametableChangedTrue = () => { // TODO: create fubction comparing changes in table

// };


// ^------------------------ Is Wanted Block ------------------------

const isWantedBlock = () => {  // TODO: NEEDS REFACTORING
    const table = GS.gameTable; // link
    // horizontal
    for (let row = 0; row <= 3; row++) { // run lines
        if( table[row][0] >= GS.gameMode ||
            table[row][1] >= GS.gameMode ||
            table[row][2] >= GS.gameMode ||
            table[row][3] >= GS.gameMode ) {
            return true;
        }
    }
    // vertical
    for (let col = 0; col <= 3; col++) { // run lines
        if( table[0][col] >= GS.gameMode ||
            table[1][col] >= GS.gameMode ||
            table[2][col] >= GS.gameMode ||
            table[3][col] >= GS.gameMode ) {
            return true;
        }
    }
    return false;
};


// ^------------------------ check lose ------------------------

const checkLose = () => {
    if (isNoSteps()) return true;
    return false;
};


// ^------------------------ Popup Lose ------------------------

const popupLose = () => {
    setTimeout(() => {
        createPopup('SORRY! YOU LOSE!', `<pre>Your Score: ${GS.gameScore}  |  Best Score: ${GS.bestScore}<pre>` , 'Try Again!', startNewGame);
    }, 500);
};

// ^------------------------ check win ------------------------

const checkWin = () => {
    if (isWantedBlock()) return true;
    return false;
};


// ^------------------------ Popup Win ------------------------

const popupWin = () => {
    setTimeout(() => {
        createPopup('YOU WIN!', `<pre>Your Score: ${GS.gameScore}  |  Best Score: ${GS.bestScore}<pre>` , 'Try Again!', startNewGame);
    }, 500);
};


// ^------------------------ Is Popup ------------------------

const isPopup = () => {
    const popup = document.querySelector('.popup');
    if (!popup) {
        return false;
    } else {
        return true;
    }
    // Msg(zeroBlock.classList.contains('popup'));
    // return zeroBlock.classList.contains('popup');
};



// >----------------------------------------------------------------<
// >                         DRAW BLOCKS                            <
// >----------------------------------------------------------------<

// ^------------------------ redraw blocks ------------------------

const redrawBlocks = () => {
    const gameTable = GS.gameTable;
    for (let x = 0; x < gameTable.length; x++) {
        for (let y = 0; y < gameTable[x].length; y++) {
            let blockId = `${x+1}-${y+1}`;
            let el = document.getElementById(blockId);
            el.removeAttribute('class');
            el.classList.add('block');
            el.classList.add(`block__${gameTable[x][y]}`);
            if (gameTable[x][y] > 0) {
                el.innerHTML = gameTable[x][y];
            } else {
                el.innerHTML = '';
            }
        }
    }
};


// ^------------------------ generate new block ------------------------

const generateNewBlock = () => {

    if (isEmptyCells() === true) {
        const emptyBlocks = getEmptyBlocks();
        const randomEmptyBlock = asm.getRandomNumber(0, emptyBlocks.length-1);

        const position = emptyBlocks[randomEmptyBlock];
        let x = position[0];
        let y = position[1];

        const randomPercent = asm.getRandomNumber(1, 100);
        const generatedNumber = randomPercent >= 90 ? 4 : 2;

        let blockId = `${x+1}-${y+1}`;
        let el = document.getElementById(blockId);
        el.removeAttribute('class');
        el.classList.add('block');
        el.classList.add(`block__${generatedNumber}`);
        el.innerHTML = generatedNumber;
        GS.gameTable[x][y] = generatedNumber;
    }

};


// ^------------------------ get empty blocks ------------------------

const getEmptyBlocks = () => {
    const table = GS.gameTable;
    let emptyBlocks = [];
    let counter = 0;
    for (let x = 0; x < table.length; x++) {
        for (let y = 0; y < table[x].length; y++) {
            if (table[x][y] === 0) {
                emptyBlocks[counter] = [x, y];
                counter++;
            }
        }
    }

    return emptyBlocks; //array
};




// >----------------------------------------------------------------<
// >                             MOVE                               <
// >----------------------------------------------------------------<

// ^------------------------ move right ------------------------

// Msg(MsgA(gameTable));
const moveRight = () => {
    const gameTable = GS.gameTable;
    for (let line = 0; line <= 3; line++) { // run lines
        const start = 3;
        let curr = start; // first current postion
        let currEdge = 0; // last checked item
        let lastLock = -1; // last locked item
        let modifier = -1;

        while(curr > currEdge ) { // run items

            let next = curr + modifier;

            if (gameTable[line][next] === 0) { // if NEXT === 0
                curr += modifier;

            } else if (gameTable[line][curr] === 0 ) { // if CURRENT === 0 && NEXT !== 0

                gameTable[line][curr] = gameTable[line][next];
                gameTable[line][next] = 0;
                curr = curr > start ? curr -= modifier : start;

            } else if (gameTable[line][curr] === gameTable[line][next]) { // if CURRENT === NEXT

                if (curr === lastLock) {
                    curr += modifier;
                    // redrawBlocks(gameTable);
                    continue;
                }
                gameTable[line][curr] *= 2;
                GS.gameScore += gameTable[line][curr];
                gameTable[line][next] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }

        }
        // redrawBlocks(gameTable);
    }

    return gameTable;
};


// ^------------------------ move left ------------------------

const moveLeft = () => {
    const gameTable = GS.gameTable;
    for (let line = 0; line <= 3; line++) { // run lines
        const start = 0;
        let curr = start; // first current postion
        let currEdge = 3; // last checked item
        let lastLock = -1; // last locked item
        let modifier = 1;

        while(curr < currEdge ) { // run items
            let next = curr + modifier;

            if (gameTable[line][next] === 0) { // if NEXT === 0
                curr += modifier;

            } else if (gameTable[line][curr] === 0 ) { // if CURRENT === 0 && NEXT !== 0

                gameTable[line][curr] = gameTable[line][next];
                gameTable[line][next] = 0;
                curr = curr > start ? curr -= modifier : start;

            } else if (gameTable[line][curr] === gameTable[line][next]) { // if CURRENT === NEXT

                if (curr === lastLock) {
                    curr += modifier;
                    // redrawBlocks(gameTable);
                    continue;
                }
                gameTable[line][curr] *= 2;
                GS.gameScore += gameTable[line][curr];
                gameTable[line][next] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }
            // redrawBlocks(gameTable);

        }
    }

    return gameTable;
};


// ^------------------------ move up ------------------------

const moveUp = () => {
    const gameTable = GS.gameTable;
    for (let line = 0; line <= 3; line++) { // run lines
        const start = 0;
        let curr = start; // first current postion
        let currEdge = 3; // last checked item
        let lastLock = -1; // last locked item
        let modifier = 1;

        while(curr < currEdge ) { // run items
            let next = curr + modifier;

            if (gameTable[next][line] === 0) { // if NEXT === 0
                curr += modifier;

            } else if (gameTable[curr][line] === 0 ) { // if CURRENT === 0 && NEXT !== 0

                gameTable[curr][line] = gameTable[next][line];
                gameTable[next][line] = 0;
                curr = curr > start ? curr -= modifier : start;

            } else if (gameTable[curr][line] === gameTable[next][line]) { // if CURRENT === NEXT

                if (curr === lastLock) {
                    curr += modifier;
                    // redrawBlocks(gameTable);
                    continue;
                }
                gameTable[curr][line] *= 2;
                GS.gameScore += gameTable[curr][line];
                gameTable[next][line] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }
            // redrawBlocks(gameTable);

        }
    }

    return gameTable;
};


// ^------------------------ move down ------------------------

const moveDown = () => {
    const gameTable = GS.gameTable;
    for (let line = 0; line <= 3; line++) { // run lines
        const start = 3;
        let curr = start; // first current postion
        let currEdge = 0; // last checked item
        let lastLock = -1; // last locked item
        let modifier = -1;

        while(curr > currEdge ) { // run items
            let next = curr + modifier;

            if (gameTable[next][line] === 0) { // if NEXT === 0
                curr += modifier;

            } else if (gameTable[curr][line] === 0 ) { // if CURRENT === 0 && NEXT !== 0

                gameTable[curr][line] = gameTable[next][line];
                gameTable[next][line] = 0;
                curr = curr > start ? curr -= modifier : start;

            } else if (gameTable[curr][line] === gameTable[next][line]) { // if CURRENT === NEXT

                if (curr === lastLock) {
                    curr += modifier;
                    // redrawBlocks(gameTable);
                    continue;
                }
                gameTable[curr][line] *= 2;
                GS.gameScore += gameTable[curr][line];
                gameTable[next][line] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }
            // redrawBlocks(gameTable);

        }
    }

    return gameTable;
};

// >----------------------------------------------------------------<
// >                            CONTROLS                            <
// >----------------------------------------------------------------<

// ^------------------------ send key ------------------------

const sendKey = (elem) => {
    const isInputUserAction = elem.key === 'ArrowRight' || // block other key inputs
                              elem.key === 'ArrowLeft' ||
                              elem.key === 'ArrowUp' ||
                              elem.key === 'ArrowDown';

    const checkMoveGeneral = () => {
        redrawBlocks();
        if (checkWin()) popupWin();
        generateNewBlock();
        if (checkLose()) popupLose();
        checkLose();
        updateGameScore();
    };

    if (checkWin()) return;

    if (isInputUserAction) {

        if (elem.key === 'ArrowRight') {
            if( isEmptyCellsNearRightEdge() ||
                isEmptyCellsBetweenNumbersColumns() ||
                isSameCellsNearHorizontal()) {

                moveRight();
                checkMoveGeneral();
            }
        }
        if (elem.key === 'ArrowLeft') {
            if( isEmptyCellsNearLeftEdge() ||
                isEmptyCellsBetweenNumbersColumns() ||
                isSameCellsNearHorizontal()) {

                moveLeft();
                checkMoveGeneral();
            }
        }
        if (elem.key === 'ArrowUp') {
            if( isEmptyCellsNearTopEdge() ||
                isEmptyCellsBetweenNumbersRows() ||
                isSameCellsNearVertical()) {

                moveUp();
                checkMoveGeneral();
            }
        }
        if (elem.key === 'ArrowDown') {
            if( isEmptyCellsNearBottomEdge() ||
                isEmptyCellsBetweenNumbersRows() ||
                isSameCellsNearVertical()) {

                moveDown();
                checkMoveGeneral();
            }
        }
    }
};

document.addEventListener('keydown', sendKey);


// ^------------------------ new game button ------------------------

const newGameButtom = document.querySelector('.stats__new-game');

newGameButtom.addEventListener('click', startNewGame);


// ^------------------------ Change Theme ------------------------

// const lightTheme = document.querySelector('.change-theme');
// // const darkStylesheet = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
// const lightStylesheet = document.querySelector('link[rel=stylesheet][href*=light]');
// const darkStylesheet = document.querySelector('link[rel=stylesheet][href*=dark]');
// // const dartSchemeMedia = matchMedia('prefers-color-scheme: light');


// const changeTheme = (event) => {

//     let el = event.target;

//     if (el.checked) {  // light theme
//         lightStylesheet.media = 'all';
//         darkStylesheet.media = 'not all';
//         // el.style.backgroundImage = 'url("assets/svg/moon.svg")';
//         // el.style.maskImage = 'none';
//         el.style.webkitMaskImage = 'url("assets/svg/moon.svg")';
//         el.style.maskImage = 'url("assets/svg/moon.svg")';
//     } else {  // dark theme
//         lightStylesheet.media = 'not all';
//         darkStylesheet.media = 'all';
//         // el.style.backgroundImage = 'url("assets/svg/sun.svg")';
//         // el.style.maskImage = 'none';
//         el.style.webkitMaskImage = 'url("assets/svg/sun.svg")';
//         el.style.maskImage = 'url("assets/svg/sun.svg")';
//     }
// };

// lightTheme.addEventListener('click', changeTheme);

// >----------------------------------------------------------------<
// >                             OPTIONS                            <
// >----------------------------------------------------------------<

const options = document.querySelector('.options');

// ^------------------------ Blackout ------------------------

const blackout = document.querySelector('.zero-block__blackout');

const showBlackout = () => {
    blackout.classList.add('blackout');
    blackout.classList.add('show');
};

const hideBlackout = () => {
    blackout.classList.remove('blackout');
    blackout.classList.remove('show');
};

// ^------------------------ Close Options ------------------------

const closeOptions = () => {
    let show = options.classList.contains('show');

    if (show) {
        optionsOpenCloseIcon.style.webkitMaskImage = 'url("assets/svg/options.svg")';
        optionsOpenCloseIcon.style.maskImage = 'url("assets/svg/options.svg")';
        blackout.classList.remove('blackout');
        hideBlackout();
        options.classList.remove('show');
        optionsOpenCloseIcon.style.zIndex = 'auto';
    }
};

blackout.addEventListener('click', closeOptions);


// ^------------------------ Open Options ------------------------

const openOptions = () => {
    let show = options.classList.contains('show');

    if (!show) {
        optionsOpenCloseIcon.style.webkitMaskImage = 'url("assets/svg/close.svg")';
        optionsOpenCloseIcon.style.maskImage = 'url("assets/svg/close.svg")';
        blackout.classList.add('blackout');
        showBlackout();
        options.classList.add('show');
        optionsOpenCloseIcon.style.zIndex = '200';
    }
};


// ^------------------------ Open Close Options ------------------------

const optionsOpenCloseIcon = document.querySelector('.options__open-close-icon');

const openCloseOptions = () => {

    let show = options.classList.contains('show');

    if (show) {
        closeOptions();
        if (checkWin()) popupWin();
    } else {
        openOptions();
    }

};

optionsOpenCloseIcon.addEventListener('click', openCloseOptions);

// ^------------------------ Set Theme ------------------------

const setTheme = () => {
    const lightStylesheet = document.querySelector('link[rel=stylesheet][href*=light]');
    const darkStylesheet = document.querySelector('link[rel=stylesheet][href*=dark]');

    if (GS.theme === 'Light') {
        lightStylesheet.media = 'all';
        darkStylesheet.media = 'not all';
    } else {
        darkStylesheet.media = 'all';
        lightStylesheet.media = 'not all';
    }
};

// ^------------------------ Change Theme ------------------------

const optionItemTheme = document.querySelector('.option-item__theme');

const changeTheme = (event) => {
    const el = event.target;
    const optionItemThemeValue = el.innerHTML;

    optionItemThemeValue.includes('Dark');
    if (optionItemThemeValue.includes('Dark')) {
        GS.theme = 'Light';
    } else {
        GS.theme = 'Dark';
    }
    el.innerHTML = `Theme: ${GS.theme}`;
    setTheme();
    // document.querySelector('.option-item__theme').innerHTML = `${optionItemThemeValue} ${GS.theme}`;
    // const optionItemDarkModeValue = document.querySelector('.option-item__game-mode').innerHTML;
    // document.querySelector('.option-item__game-mode').innerHTML = `${optionItemDarkModeValue} ${GS.gameMode}`;
};

optionItemTheme.addEventListener('click', changeTheme);


// ^------------------------ Change Game Mode ------------------------

const optionItemGameMode = document.querySelector('.option-item__game-mode');

const changeGameMode = (event) => {
    let el = event.target;
    let optionItemDarkModeValue = el.innerHTML;
    GS.gameMode = optionItemDarkModeValue.substr(11) / 2;
    if (GS.gameMode < 64) {
        GS.gameMode = 4096;
    }
    el.innerHTML = `Game mode: ${GS.gameMode}`;
};

optionItemGameMode.addEventListener('click', changeGameMode);


// ^------------------------ Show Top ------------------------

const optionShowTop = document.querySelector('.option-item__show-top');

const showTop = () => {
    closeOptions();

    const scoresTable = GS.scoresTable;
    let scores = '';
    const maxScoreTextLenght = String(scoresTable[0][0]).length;
    Msg(maxScoreTextLenght)

    for (let i = 0; i < scoresTable.length; i++) {
        scores += `<pre>` +
        ' '.repeat(maxScoreTextLenght - String(scoresTable[i][0]).length) +
        `<b>${scoresTable[i][0]}</b>` +
        ` | Best block: ${scoresTable[i][1]}<br><pre>`;
    }
    // for (let i = 0; i < scoresTable.length; i++) {
    //     scores += `<pre>` +
    //     '0'.repeat(2 - String(i+1).length) +
    //     `${i+1}: <b>${scoresTable[i][0]}</b>` +
    //     ' '.repeat(maxScoreTextLenght - String(scoresTable[i][0]).length) +
    //     ` | Best block: ${scoresTable[i][1]}<br><pre>`;
    // }

    createPopup('TOP 10', scores , 'Close');
};

optionShowTop.addEventListener('click', showTop);


// ^------------------------ Reset All ------------------------

const optionItemResetAll = document.querySelector('.option-item__reset-all');

const resetAll = () => {
    // localStorage.removeItem('settings');
    resetAllSettings();
    initGame();
    closeOptions();
};

optionItemResetAll.addEventListener('click', resetAll);










const logo = document.querySelector('.header__title');

const toogleBlackout = () => {
    Msg('hello');
    const zeroBlock = document.querySelector('.zero-block');
    const blackout = createHTMLElem(zeroBlock, 'blackout', 'div');

    setTimeout(() => {
        blackout.classList.add('show');
    }, 0);

    blackout.addEventListener('click', () => {
        blackout.classList.remove('show'); // hide popup with animation
        setTimeout(() => {
            blackout.remove(); // remove popup
        }, 300);
    });
};


const createPopup = (title, text, button, action = () => {}) => {
    const zeroBlock = document.querySelector('.zero-block');
    const popup = createHTMLElem(zeroBlock, 'popup', 'div');
        const popupTitle = createHTMLElem(popup, 'popup__title', 'h2');
        popupTitle.classList.add('h2');
        const popuptext = createHTMLElem(popup, 'popup__text', 'p');
        popuptext.classList.add('p');
        const popupButton = createHTMLElem(popup, 'popup__button', 'button');
        popupButton.classList.add('button');

        popupTitle.innerHTML = title;
        popuptext.innerHTML = text;
        popupButton.innerHTML = button;


        showBlackout();
        setTimeout(() => {
            popup.classList.add('show');
        }, 0);

        popupButton.addEventListener('click', () => {
            popup.classList.remove('show'); // hide popup with animation
            hideBlackout(); // hide blackout with aniamtion
            action();
            setTimeout(() => {
                popup.remove(); // remove popup
            }, 300);
        });
};

logo.addEventListener('click', () => {
    let maxBlock = getmaxBlock();
    createPopup('2048!', `Current max block: <b>${maxBlock}</b>` , 'Ok');
});
