/* jshint esversion: 6 */
// /*jshint -W033 */
const icon = document.querySelector('.header__float-menu');
const iconClose = document.querySelector('.header__float-menu-close');
const nav = document.querySelector('.nav');

function addOpenClassToMenu() {
    nav.classList.toggle('open');
}

function closeMenu(event){
    if (event.target.classList.contains('menu__link')) {
        nav.classList.remove('open');
    }
}

icon.addEventListener('click', addOpenClassToMenu);
iconClose.addEventListener('click', addOpenClassToMenu);

nav.addEventListener('click', closeMenu);


// console.log("Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20\nИтого: 110")
