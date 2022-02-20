/* jshint esversion: 6 */
// /*jshint -W033 */
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
const GS = {};

GS.gameTable = [
    [0, 2, 2, 4,],
    [0, 4, 4, 0,],
    [0, 0, 2, 0,],
    [4, 2, 2, 2,],
    [4, 4, 0, 2,],
    [4, 2, 0, 0,],
    [0, 0, 8, 8,],
];




// >----------------------------------------------------------------<
// >                             MOVE                               <
// >----------------------------------------------------------------<

// ^------------------------ move right ------------------------

// const moveRight = (currentGameTable) => {
//     const gameTable = currentGameTable; // link to obj
//     Msg(MsgA(gameTable));
//     for (let row = 0; row <= 6; row++) { // run rows
//         let colCurr = 3;
//         let i = 0;
//         let lastLock = -1;
//         while(i <= 3 ) { // run column
//             let colPrev = colCurr - 1;
//             if (gameTable[row][colPrev] === 0) { // if Previous === 0
//                 colCurr--;
//             } else if (gameTable[row][colCurr] === 0 && colCurr !== 0) { // if Current === 0 && Previous !== 0
//                 gameTable[row][colCurr] = gameTable[row][colPrev];
//                 gameTable[row][colPrev] = 0;
//                 colCurr ++;
//                 i = 0;
//             } else if (gameTable[row][colCurr] === gameTable[row][colPrev]) { // if Current === Previous
//                 if (colCurr === lastLock) {
//                     colCurr--;
//                     i++;
//                     continue;
//                 }
//                 gameTable[row][colCurr] *= 2;
//                 gameTable[row][colPrev] = 0;
//                 lastLock = colCurr;
//                 colCurr--;
//                 continue;
//             } else {  // if Current !== Previous && Current !== 0
//                 colCurr--;
//             }

//             i++;
//         }
//     }
//             Msg(MsgA(gameTable));
//             Msg('--------------------');
//     return gameTable;
// };

const moveRight = (currentGameTable) => {
    const gameTable = currentGameTable; // link to obj
    Msg(MsgA(gameTable));
    for (let line = 0; line <= 6; line++) { // run lines
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
                    continue;
                }
                gameTable[line][curr] *= 2;
                gameTable[line][next] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }

        }
    }
    Msg(MsgA(gameTable));
    return gameTable;
};


// ^------------------------ move left ------------------------

const moveLeft = (currentGameTable) => {
    const gameTable = currentGameTable; // link to obj
    Msg(MsgA(gameTable));
    for (let line = 0; line <= 6; line++) { // run lines
        const start = 0;
        let curr = start; // first current postion
        let currEdge = 3; // last checked item
        let lastLock = -1; // last locked item
        let modifier = 1;

        while(curr < currEdge ) { // run items
            let next = curr + 1;

            if (gameTable[line][next] === 0) { // if NEXT === 0
                curr += modifier;

            } else if (gameTable[line][curr] === 0 ) { // if CURRENT === 0 && NEXT !== 0

                gameTable[line][curr] = gameTable[line][next];
                gameTable[line][next] = 0;
                curr = curr > start ? curr -= modifier : start;

            } else if (gameTable[line][curr] === gameTable[line][next]) { // if CURRENT === NEXT

                if (curr === lastLock) {
                    curr += modifier;
                    continue;
                }
                gameTable[line][curr] *= 2;
                gameTable[line][next] = 0;
                lastLock = curr;
                curr += modifier;

            } else { // if CURRENT !== NEXT && CURRENT !== 0
                curr += modifier;
            }

        }
    }
    Msg(MsgA(gameTable));
    return gameTable;
};





const moveLeftWithComments = (currentGameTable) => {
    const gameTable = currentGameTable; // link to obj
                                                                            // Msg(MsgA(gameTable));
    for (let line = 0; line <= 0; line++) { // run lines
        let curr = 0; // first current postion
        let currEdge = 3; // last checked item
        let lastLock = -1; // last locked item
                                                                            Msg(MsgA(gameTable[line]));
        while(curr < currEdge ) { // run items
            let next = curr + 1;                                            Msg('CURR ' + (curr+1) + ': ' + gameTable[line][curr]);

            if (gameTable[line][next] === 0) {                              Msg(['NEXT === 0']); // if NEXT === 0
                curr++;

            } else if (gameTable[line][curr] === 0 ) {                      Msg(['CURRENT === 0 && NEXT !== 0']); // if CURRENT === 0 && NEXT !== 0

                gameTable[line][curr] = gameTable[line][next];
                gameTable[line][next] = 0;
                curr = curr > 0 ? curr -= 1 : 0;

            } else if (gameTable[line][curr] === gameTable[line][next]) {   Msg(['CURRENT === NEXT']); // if CURRENT === NEXT

                if (curr === lastLock) {                                    Msg(['Sorry! Cur is Locked (' + lastLock + ')']);
                    curr++;                                                 Msg(MsgA(gameTable[line])); Msg('--------------------');
                    continue;
                }
                gameTable[line][curr] *= 2;
                gameTable[line][next] = 0;
                lastLock = curr;
                curr++;                                                     Msg(MsgA(gameTable[line])); Msg('--------------------');

            } else {                                                        Msg(['CURRENT !== NEXT && CURRENT !== 0']); // if CURRENT !== NEXT && CURRENT !== 0
                curr++;
            }

                                                                            Msg(MsgA(gameTable[line])); Msg('--------------------');
        }
    }
                                                                            // Msg(MsgA(gameTable));
    // GS.gameTable = gameTable;
    return gameTable;
};
// const moveLeftWithComments = (currentGameTable) => {
//     const gameTable = currentGameTable; // link to obj
//     Msg(MsgA(gameTable));
//     for (let row = 0; row <= 0; row++) { // run rows
//         let colCurr = 0;
//         let i = 0;
//         let lastLock = -1;
//         Msg(MsgA(gameTable[row]));
//         while(i <= 3 ) { // run column
//             let colPrev = colCurr + 1;
//             Msg('CURR ' + (colCurr+1) + ': ' + gameTable[row][colCurr]);
//             if (gameTable[row][colPrev] === 0) { // if Previous === 0
//                 Msg(['if Previous === 0']);
//                 colCurr++;
//             } else if (gameTable[row][colCurr] === 0 && colCurr !== 3) { // if Current === 0 && Previous !== 0
//                 Msg(['if Current === 0 && Previous !== 0']);
//                 gameTable[row][colCurr] = gameTable[row][colPrev];
//                 gameTable[row][colPrev] = 0;
//                 colCurr = colCurr >= 0 ? colCurr-- : 0;
//                 i = colCurr >= 0 ? i++ : i = 0;
//             } else if (gameTable[row][colCurr] === gameTable[row][colPrev]) { // if Current === Previous
//                 Msg(['if Current === Previous']);
//                 if (colCurr === lastLock) {
//                     Msg(['Sorry! Cur is Locked (' + lastLock + ')']);
//                     colCurr++;
//                     i++;
//                     Msg(MsgA(gameTable[row]));
//                     Msg('--------------------');
//                     continue;
//                 }
//                 gameTable[row][colCurr] *= 2;
//                 gameTable[row][colPrev] = 0;
//                 lastLock = colCurr;
//                 colCurr++;
//                 Msg(MsgA(gameTable[row]));
//                 Msg('--------------------');
//                 continue;
//             } else {  // if Current !== Previous && Current !== 0
//                 Msg(['if Current !== Previous && Current !== 0']);
//                 colCurr++;
//             }

//             i++;
//             Msg(MsgA(gameTable[row]));
//             Msg('--------------------');
//         }
//     }
//     Msg(MsgA(gameTable));
//     // GS.gameTable = gameTable;
//     return gameTable;
// };

// >----------------------------------------------------------------<
// >                            CONTROLS                            <
// >----------------------------------------------------------------<

const sendKey = (elem) => {
    // Msg(asm.getRandomNumber(1, 4))
    switch (elem.key) {
        case 'ArrowRight':
            moveRight(GS.gameTable);
        break;

        case 'ArrowLeft':
            moveLeft(GS.gameTable);
            // moveLeftWithComments(GS.gameTable);
        break;

        case 'ArrowUp':
            moveUp(GS.gameTable);
        break;

        case 'ArrowDown':
            moveUp(GS.gameTable);
        break;
        default: break;
    }
};

document.addEventListener('keyup', sendKey);
