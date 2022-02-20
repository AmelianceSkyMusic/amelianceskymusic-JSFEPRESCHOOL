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
        theme: 'dark',

        bestScore: 0,
        gameScore: 0,
        scoresTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],

        gameTable:  [
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,],
                    ],

        maxBlockValue: 2048,
    };

    if(localStorage.getItem('settings')) { // load settings if exists
        let receivedSettings = JSON.parse(localStorage.getItem('settings')); // read
        GS = {...GS, ...receivedSettings};
    }

    initGame();
};


window.addEventListener('load', loadSettings);


// ^------------------------ init game ------------------------

const initGame = () => {
    document.querySelector('.stats__game-score').innerHTML = GS.gameScore;
    document.querySelector('.stats__game-score-best').innerHTML = GS.bestScore;

    // let table = [
    // [2, 16, 2, 4,],
    // [4, 32, 8, 4,],
    // [16, 8, 32, 64,],
    // [4, 2, 0, 0,],
    // ];
    // GS.gameTable = table;

    redrawBlocks(GS.gameTable);
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
    GS.bestScore = GS.bestScore > GS.gameScore ? GS.bestScore : GS.gameScore;
    GS.scoresTable.push(GS.bestScore);
    GS.scoresTable.sort((a, b) => b - a).splice(10);
};


// ^------------------------ save settings --------------------------

const saveSettings = () => {

    // collectSettings();

    let savingSettings = {
        theme:          GS.theme,

        bestScore:      GS.bestScore,
        gameScore:      GS.gameScore,
        scoresTable:    GS.scoresTable,

        gameTable:      GS.gameTable,
        maxBlockValue:  GS.maxBlockValue,
    };

    localStorage.setItem('settings', JSON.stringify(savingSettings)); // write
};

window.addEventListener('beforeunload', saveSettings);


// ^------------------------ reset settings ------------------------

const resetSettings = () => {

    const resetSettings = {
        gameScore: 0,
        gameTable:  [
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,],
                    [0, 0, 0, 0,]
                    ],
    };
    GS = {...GS, ...resetSettings};
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

    resetSettings(); // reset game settings

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

// // ^------------------------ is empty cells ------------------------

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

// ^------------------------ is empty cells horizontal ------------------------

const isEmptyCellsHorizontal = () => { // TODO: NEEDS REFACTORING
    const table = GS.gameTable;
    for (let row = 0; row <= 3; row++) { // run lines
        if( table[row][0] === 0 ||
            table[row][1] === 0 ||
            table[row][2] === 0 ||
            table[row][3] === 0 ) {
            return true;
        }
    }
    return false;
};

// ^------------------------ is empty cells vertical ------------------------

const isEmptyCellsVertical = () => { // TODO: NEEDS REFACTORING
    const table = GS.gameTable;
    for (let col = 0; col <= 3; col++) { // run lines
        if( table[0][col] === 0 ||
            table[1][col] === 0 ||
            table[2][col] === 0 ||
            table[3][col] === 0 ) {
            return true;
        }
    }
    return false;
};

// ^------------------------ is same cells near horizontal ------------------------

const isSameCellsNearHorizontal = () => {
    const table = GS.gameTable; // link

    for (let row = 0; row <= 3; row++) { // run lines
        if (table[row][0] === table[row][1] ||
            table[row][1] === table[row][2] ||
            table[row][2] === table[row][3]) {
            return true;
        }
    }
    return false;
};

// ^------------------------ is same cell near vertical ------------------------

const isSameCellsNearVertical = () => {
    const table = GS.gameTable; // link

    for (let col = 0; col <= 3; col++) { // run lines
        if (table[0][col] === table[1][col] ||
            table[1][col] === table[2][col] ||
            table[2][col] === table[3][col]) {
            return true;
        }
    }
    return false;
};


// ^------------------------ is no steps horizontal ------------------------

const isNoStepsHorizontal = () => { // TODO: NEEDS REFACTORING
    // const table = GS.gameTable; // link
    // Msg(`hello`);

    // for (let row = 0; row <= 3; row++) { // run lines
    //     if( table[row][0] === 0 ||
    //         table[row][1] === 0 ||
    //         table[row][2] === 0 ||
    //         table[row][3] === 0 ) {
    //         return false;
    //         }
    //     if (table[row][0] === table[row][1] ||
    //         table[row][1] === table[row][2] ||
    //         table[row][2] === table[row][3]) {
    //         return false;
    //     }
    // }

    if(isEmptyCellsHorizontal() === false || isSameCellsNearHorizontal() === false) {
        return true;
    } else {
        return false;
    }
};


// ^------------------------ is no steps vertical ------------------------

const isNoStepsVertical = () => { // TODO: NEEDS REFACTORING
    // const table = GS.gameTable; // link

    // for (let col = 0; col <= 3; col++) { // run lines
    //     if( table[0][col] === 0 ||
    //         table[1][col] === 0 ||
    //         table[2][col] === 0 ||
    //         table[3][col] === 0 ) {
    //         return false;
    //         }
    //     if (table[0][col] === table[1][col] ||
    //         table[1][col] === table[2][col] ||
    //         table[2][col] === table[3][col]) {
    //         return false;
    //     }
    // }

    if(isEmptyCellsVertical() === false || isSameCellsNearVertical() === false) {
        return true;
    } else {
        return false;
    }

    // return true;
};

// ^------------------------ is no steps ------------------------

const isNoSteps = () => {
    if (isNoStepsHorizontal() === true && isNoStepsVertical() === true) {
        return true;
    } else {
        return false;
    }
};


// ^------------------------ is table changed ------------------------

const isGametableChangedTrue = () => { // TODO: create fubction comparing changes in table

};


// ^------------------------ can move left ------------------------

const canMoveLeft = () => { // 'toLeft' or 'toRight'

    let firstEl = 0;

    const table = GS.gameTable; // link

    for (let x = 0; x < table.length; x++) {

        if (table[x][firstEl] === 0) return true; // check if first element is 0 then can move

        let zeroAfterNumber = false;

        for (let y = 1; y < table[x].length; y++) {

            if (table[x][y] === 0) {
                zeroAfterNumber = true;
            }

            if (zeroAfterNumber && table[x][y] > 0) {
                return true;
            }
        }
    }
    Msg('can move finish function')
    return false;
};


// ^------------------------ can move right ------------------------




// ^------------------------ is 2048 ------------------------

const is2048 = () => {  // TODO: NEEDS REFACTORING
    const table = GS.gameTable; // link
    // horizontal
    for (let row = 0; row <= 3; row++) { // run lines
        if( table[row][0] === GS.maxBlockValue ||
            table[row][1] === GS.maxBlockValue ||
            table[row][2] === GS.maxBlockValue ||
            table[row][3] === GS.maxBlockValue ) {
            return true;
        }
    }
    // vertical
    for (let col = 0; col <= 3; col++) { // run lines
        if( table[0][col] === GS.maxBlockValue ||
            table[1][col] === GS.maxBlockValue ||
            table[2][col] === GS.maxBlockValue ||
            table[3][col] === GS.maxBlockValue ) {
            return true;
        }
    }
    return false;
};


// ^------------------------ check lose ------------------------

const checkLose = () => {
    if (isNoSteps()) {
        setTimeout(() => {
            alert('SORRY! YOU LOSE!\nSTART NEW GAME?');
            startNewGame();
        }, 500);
    }
};

// ^------------------------ check win ------------------------

const checkWin = () => {
    if (is2048()) {
        setTimeout(() => {
            alert('2048!\nYou WIN!\nSTART NEW GAME?');
            startNewGame();
        }, 500);
    }
};



// >----------------------------------------------------------------<
// >                         DRAW BLOCKS                            <
// >----------------------------------------------------------------<

// ^------------------------ redraw blocks ------------------------

const redrawBlocks = (gameTable) => {
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
    const noSteps = isNoSteps();
    const gametableChangedTrue = isGametableChangedTrue(); // TODO: finish function
    if (noSteps === false) {
        const emptyBlocks = getEmptyBlocks();
        // Msg(emptyBlocks.join(' '));
        const randomEmptyBlock = asm.getRandomNumber(0, emptyBlocks.length-1);
        // Msg(randomEmptyBlock);

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
    const isInputUserAcrion = elem.key === 'ArrowRight' || // block other key inputs
                              elem.key === 'ArrowLeft' ||
                              elem.key === 'ArrowUp' ||
                              elem.key === 'ArrowDown';
        // Msg(asm.getRandomNumber(1, 4))

    if (isInputUserAcrion) {
        // isHorizontalLock = checkHorizontalLock();
        // isVerticalLock = checkVerticalLock();
        // is
        // switch (elem.key) {
        //     case 'ArrowRight':  moveRight(); break;
        //     case 'ArrowLeft': if (canMoveLeft()) moveLeft(); break;
        //     case 'ArrowUp': moveUp(); break;
        //     case 'ArrowDown': moveDown(); break;
        //     default: break;
        // }

        if (elem.key === 'ArrowRight') {
            moveRight();
            redrawBlocks(GS.gameTable);
            if (isEmptyCells()) generateNewBlock();
        }
        if (elem.key === 'ArrowLeft' && canMoveLeft()) {
            Msg(canMoveLeft())
            Msg('left')
            moveLeft();
            redrawBlocks(GS.gameTable);
            if (isEmptyCells()) generateNewBlock();
        }
        if (elem.key === 'ArrowUp') {
            moveUp();
            redrawBlocks(GS.gameTable);
            if (isEmptyCells()) generateNewBlock();
        }
        if (elem.key === 'ArrowDown') {
            moveDown();
            redrawBlocks(GS.gameTable);
            if (isEmptyCells()) generateNewBlock();
        }
        // redrawBlocks(GS.gameTable);
        // if (isEmptyCells()) generateNewBlock();
        // generateNewBlock();
        checkLose();
        checkWin();
    }


    // draw
    // updateSettings();
};

document.addEventListener('keydown', sendKey);


// ^------------------------ new game button ------------------------

const newGameButtom = document.querySelector('.stats__new-game');

newGameButtom.addEventListener('click', startNewGame);

const lightTheme = document.querySelector('.change-theme');
// const darkStylesheet = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const lightStylesheet = document.querySelector('link[rel=stylesheet][href*=light]');
const darkStylesheet = document.querySelector('link[rel=stylesheet][href*=dark]');
// const dartSchemeMedia = matchMedia('prefers-color-scheme: light');


const changeTheme = (event) => {

    let el = event.target;

    if (el.checked) {  // light theme
        lightStylesheet.media = 'all';
        darkStylesheet.media = 'not all';
        // el.style.backgroundImage = 'url("assets/svg/moon.svg")';
        // el.style.maskImage = 'none';
        el.style.webkitMaskImage = 'url("assets/svg/moon.svg")';
        el.style.maskImage = 'url("assets/svg/moon.svg")';
    } else {  // dark theme
        lightStylesheet.media = 'not all';
        darkStylesheet.media = 'all';
        // el.style.backgroundImage = 'url("assets/svg/sun.svg")';
        // el.style.maskImage = 'none';
        el.style.webkitMaskImage = 'url("assets/svg/sun.svg")';
        el.style.maskImage = 'url("assets/svg/sun.svg")';
    }
};

lightTheme.addEventListener('click', changeTheme);
