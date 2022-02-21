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
const gameTable = [
    [2, 0, 0, 4,],
    [0, 4, 4, 0,],
    [0, 0, 2, 0,],
    [4, 0, 2, 2,],
];


// >----------------------------------------------------------------<
// >                            CONTROLS                            <
// >----------------------------------------------------------------<
const sendKey = (elem) => {
    // Msg(asm.getRandomNumber(1, 4))
    switch (elem.key) {
        case 'ArrowRight': Msg('r');
            Msg(MsgA(gameTable));
            for (let row = 3; row <= 3; row++) { // run rows
                // Msg(MsgA(gameTable[row]));
                let colCurr = 3;
                let i = 0;
                let lastLock = -1;
                while(i <= 3 ) { // run column
                    Msg(MsgA(gameTable[row]));
                    let colPrev = colCurr - 1;
                    Msg('curr: ' + colCurr)
                    // Msg(gameTable[row][colCurr])
                    // Msg(gameTable[row][colPrev], gameTable[row][colCurr])
                    if (gameTable[row][colPrev] === 0) { // if  Previous === 0
                        colCurr--;
                        Msg('if  Previous === 0')
                    } else if (gameTable[row][colCurr] === 0 && colCurr !== 0) { // if Current === 0
                        gameTable[row][colCurr] = gameTable[row][colPrev];
                        gameTable[row][colPrev] = 0;
                        colCurr ++;
                        i = 0;
                        Msg('if Current === 0')
                    } else if (gameTable[row][colCurr] === gameTable[row][colPrev]) { // if Current === Previous
                        Msg('WAS: ' + lastLock)
                        if (colCurr === lastLock) {
                            Msg('if Current === Previous !!!-LOCKED:' + lastLock)
                            Msg('-----------')
                            colCurr--;
                            i++;
                            continue;
                        }
                        gameTable[row][colCurr] *= 2;
                        gameTable[row][colPrev] = 0;
                        lastLock = colCurr;
                        colCurr--;
                        Msg('Locked: ' + lastLock)
                        Msg('if Current === Previous')
                        Msg('-----------')
                        continue;
                    } else {
                        Msg('next')
                        colCurr--;
                    }

                    i++;
                    Msg('-----------')
                }
            }
            Msg(MsgA(gameTable));
        break;
        case 'ArrowLeft': Msg('l');

        break;
        case 'ArrowUp': Msg('u');

        break;
        case 'ArrowDown': Msg('d');

        break;
        default: break;
    }
};

document.addEventListener('keyup', sendKey);
