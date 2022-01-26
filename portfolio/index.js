/* jshint esversion: 6 */
// /*jshint -W033 */
import i18Obj from './translate.js';

/* ---------------------------------------------------------- */
const Msg = msg => console.log(msg);

/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
/* -------------------------- MENU -------------------------- */
/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
const icon = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav');
const blackout = document.querySelector('.blackout');

function addOpenClasstoMenu() {
    icon.classList.toggle('open');
    nav.classList.toggle('open');
    blackout.classList.toggle('open');
}

icon.addEventListener('click', addOpenClasstoMenu);
nav.addEventListener('click', addOpenClasstoMenu);

/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
/* ----------------------- PORTFOLIO ------------------------ */
/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
const portfolioImages = document.querySelectorAll('.portfolio__image');

const buttons = document.querySelector('.portfolio__buttons');

/* ---------------------------------------------------------- */
/* ---------------------- Cash Images ----------------------- */
/* ---------------------------------------------------------- */
function preloadImages() {
    for (let node of buttons.children) {

        //get folder name from button
        const activePortfolioPhotosFolder = node.dataset.season;

        //cash images
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${activePortfolioPhotosFolder}/${i}.jpg`;
        }
    }
  }

  preloadImages();


/* ---------------------------------------------------------- */
/* --------------------- Change Images ---------------------- */
/* ---------------------------------------------------------- */
function changeImages(event) {

    const el = event.target; // get element
    const activePortfolioPhotosFolder = el.dataset.season; // get data-<season> atribute value

    // is element our button - check if element have needed class
    if(el.classList.contains('portfolio__button')) {

        // chagne src patn
            portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/${activePortfolioPhotosFolder}/${index + 1}.jpg`;
        });
    }
}


/* ---------------------------------------------------------- */
/* ------------------ Change Button Class ------------------- */
/* ---------------------------------------------------------- */
function changeButtonsToPrimaryAndResetOthers(event) {
    const el = event.target; // get element
    const allButtons = el.parentElement.children; // get all cheldrens from element parrent

    // is element our button - check if element have needed class
    if(el.classList.contains('portfolio__button')) {

        // reset all button classes to secondary
        Array.from(allButtons).forEach((btn, index) => { // Array.from(allButtons) convert NodeObject ot array
            btn.classList.add('button-secondary');
            btn.classList.remove('button-primary');
        });

        // set active button class to primary
        el.classList.remove('button-secondary');
        el.classList.add('button-primary');

    }
}

/* ---------------------------------------------------------- */
buttons.addEventListener('click', changeImages);
buttons.addEventListener('click', changeButtonsToPrimaryAndResetOthers);

/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
/* ----------------------- LANGUAGE ------------------------- */
/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
const ruButton = document.querySelector('.language__ru');
const enButton = document.querySelector('.language__en');

/* ---------------------------------------------------------- */

function setLanguage(language) {
    const currentLanguageObj = i18Obj[language];
    const datai18 = document.querySelectorAll('[data-i18]');
    datai18.forEach( (elem, index) => {
        let elementDataAtribute = elem.dataset.i18;

        elem.textContent = currentLanguageObj[elementDataAtribute];

        // if (elem.placeholder) {
        //     currentElement.placeholder = // Ваш код
        //     currentElement.textContent = ''
        //   }
    } );



    // arr.forEach(function(item, index, array) {
    //     // ... делать что-то с item
    //   });
}
function setRu() {
    setLanguage('ru');
}
function setEn() {
    setLanguage('ru');
}

ruButton.addEventListener('click', setRu);
enButton.addEventListener('click', setEn);


// console.log("Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\nИтого: 85")
