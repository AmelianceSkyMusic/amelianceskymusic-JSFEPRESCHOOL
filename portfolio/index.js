/* jshint esversion: 6 */
// /*jshint -W033 */
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


var image = document.getElementsByClassName('zero-block__hero-bg');
new simpleParallax(image);

// console.log("Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\nИтого: 85")
