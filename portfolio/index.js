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
/* --------------------- set language ----------------------- */
/* ---------------------------------------------------------- */
function setLanguage(language) {
    const currentLanguageObj = i18Obj[language];
    const datai18 = document.querySelectorAll('[data-i18]');
    datai18.forEach( (elem) => {
        let elementDataAtribute = elem.dataset.i18;

        if (currentLanguageObj.hasOwnProperty(elementDataAtribute)) {

            elem.textContent = currentLanguageObj[elementDataAtribute];

            if (elem.placeholder) {
                elem.placeholder = currentLanguageObj[elementDataAtribute];
                elem.textContent = '';
            }
            console.log('true');
        } else {
            console.log('false');
            console.log(elementDataAtribute);

        }
    } );

}
/* ---------------------------------------------------------- */
/* ---------------- change language to ru  ------------------ */
/* ---------------------------------------------------------- */
function setRu(event) {
    const langButtons = document.querySelectorAll('.language__item');
    langButtons.forEach( (elem) => {
        elem.classList.remove('language-active');
    });
    event.target.classList.add('language-active');
    setLanguage('ru');
}

ruButton.addEventListener('click', setRu);

/* ---------------------------------------------------------- */
/* ---------------- change language to en  ------------------ */
/* ---------------------------------------------------------- */
function setEn(event) {
    const langButtons = document.querySelectorAll('.language__item');
    langButtons.forEach( (elem) => {
        elem.classList.remove('language-active');
    });
    event.target.classList.add('language-active');
    setLanguage('en');
}

enButton.addEventListener('click', setEn);

/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */
/* --------------------- CHANGE THEME ----------------------- */
/* ---------------------------------------------------------- */
/* ---------------------------------------------------------- */

const ChangebleElemetnAll = [
    // 'body',
    // '.skills',
    // '.portfolio',
    // '.video',
    // '.price',
    // '.button-secondary',
    '.skills-section-title',
    '.portfolio-section-title',
    '.video-section-title',
    '.price-section-title',
    // '.line-decoration',

    '.skills_card_title',
    '.skills_card_text',
    '.price-card__header',
    '.price-card-list-item',

];

const ChangebleElemetnDarkBg = [
    '.line-decoration',
    '.footer',
];
const ChangebleElemetnButtons = [
    '.button-secondary',
];

function changeElementThemeAll() {
    ChangebleElemetnAll.forEach(item => {
        const elem = document.querySelectorAll(item);
        elem.forEach( el => {
            el.classList.toggle('light-theme');
        });
    //     // elem.classList.toggle('light-theme');
    });
}

function changeElementThemeDarkBg() {
    ChangebleElemetnDarkBg.forEach(item => {
        const elem = document.querySelectorAll(item);
        elem.forEach( el => {
            el.classList.toggle('light-theme-dark-bg');
        });
    });
}

function changeElementThemeButtons() {
    ChangebleElemetnButtons.forEach(item => {
        const elem = document.querySelectorAll(item);
        elem.forEach( el => {
            el.classList.toggle('light-theme-buttons');
        });
    });
}
const iconTheme = document.querySelector('.theme__icon');
function changeTheme() {
    document.querySelector('body').classList.toggle('light-theme-light-bg');
    changeElementThemeAll();
    changeElementThemeDarkBg();
    changeElementThemeButtons();
    if (document.querySelector('.light-theme')) {
        iconTheme.src = `./assets/svg/dark.svg`;
    } else {
        iconTheme.src = `./assets/svg/light.svg`;
    }
}


iconTheme.addEventListener('click', changeTheme);

// console.log("Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\nИтого: 85")


// function changeElementTheme() {
//     ChangebleBlocks.forEach(item => {
//         const elem = document.querySelectorAll(item);
//         elem.forEach( el => {
//             el.classList.add('light-theme');
//         });
//     });
// }
