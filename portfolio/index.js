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

const buttons = document.querySelector('.portfolio__tab-buttons');

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
    if(el.classList.contains('portfolio__tab-button')) {

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
    if(el.classList.contains('portfolio__tab-button')) {

        // reset all button classes to secondary
        Array.from(allButtons).forEach((btn, index) => { // Array.from(allButtons) convert NodeObject ot array
            btn.classList.add('tab-button-secondary');
            btn.classList.remove('tab-button-primary');
        });

        // set active button class to primary
        el.classList.remove('tab-button-secondary');
        el.classList.add('tab-button-primary');

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
const black = '#000000';
const white = '#ffffff';
const gold = '#bdae82';
const transparent = 'transparent';

const iconTheme = document.querySelector('.theme__icon');
let root = document.documentElement;

const ChangebleElemetnAll = [
    '.skills-section-title',
    '.portfolio-section-title',
    '.video-section-title',
    '.price-section-title',
    '.skills_card_title',
    '.skills_card_text',
    '.price-card__header',
    '.price-card-list-item',
    // '.portfolio__tab-button',

    // '.line-decoration',
];

function setElementTheme() {
    ChangebleElemetnAll.forEach(item => {
        const elem = document.querySelectorAll(item);
        elem.forEach( el => {
            el.classList.toggle('light-theme');
        });
    });
}
function changeTabTheme() {
    if(document.querySelector('.light-theme')) {
        console.log('Light on');
        root.style.setProperty('--body-color', white);

        root.style.setProperty('--line-decoration-bg', black);

        // root.style.setProperty('--tab-prm-bg', gold);
        // root.style.setProperty('--tab-prm-bg-hover', transparent);
        // root.style.setProperty('--tab-prm-border', gold);
        // root.style.setProperty('--tab-prm—txt:', white);
        // root.style.setProperty('--tab-prm—txt-hover', black);

        root.style.setProperty('--tab-sec-bg', transparent);
        root.style.setProperty('--tab-sec-bg-hover', gold);
        root.style.setProperty('--tab-sec-border', gold);
        root.style.setProperty('--tab-sec—txt', black);
        root.style.setProperty('--tab-sec—txt-hover', white);
    } else {
        console.log('Light off');
        root.style.setProperty('--body-color', black);

        root.style.setProperty('--line-decoration-bg', gold);

        // root.style.setProperty('--tab-prm-bg', gold);
        // root.style.setProperty('--tab-prm-bg-hover', transparent);
        // root.style.setProperty('--tab-prm-border', gold);
        // root.style.setProperty('--tab-prm—txt:', white);
        // root.style.setProperty('--tab-prm—txt-hover', black);

        root.style.setProperty('--tab-sec-bg', transparent);
        root.style.setProperty('--tab-sec-bg-hover', transparent);
        root.style.setProperty('--tab-sec-border', gold);
        root.style.setProperty('--tab-sec—txt', gold);
        root.style.setProperty('--tab-sec—txt-hover', white);
    }
}
function changeIconTheme() {
    if (document.querySelector('.light-theme')) {
        iconTheme.src = `./assets/svg/dark.svg`;
    } else {
        iconTheme.src = `./assets/svg/light.svg`;
    }
}

function changeTheme() {
    // document.querySelector('body').classList.toggle('light-theme');
    setElementTheme();

    // const elem = document.querySelectorAll('.light-theme');
    // elem.forEach( el => {
    //     el.style.backgroundColor = white;
    //     el.style.color = black;
    //     console.log(el);

    // });

    changeTabTheme();
    changeIconTheme();
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
