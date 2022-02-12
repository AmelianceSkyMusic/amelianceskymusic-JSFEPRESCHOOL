/* jshint esversion: 9 */
// /*jshint -W033 */

// ^................... ( Msg from console.log ) ....................

const Msg = msg => console.log(msg);

// >----------------------------------------------------------------<
// >                            GET DATA                            <
// >----------------------------------------------------------------<

// ^--------------------------- get data ----------------------------

const url =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=085ded34e7ba5e71fc4264485245f7f0&language=ru-RU&include_image_language=ru,null";

async function getMovieData(url, requestValue = '') {
    const res = await fetch(url);
    const data = await res.json();
    showMovieData(data, requestValue);
}

const showMovieData = (data, requestValue) => {

    const createElem = (parentName, divClass, element = 'div') => {
        const divName = document.createElement(element);
        divName.classList.add(divClass);
        parentName.append(divName);
        return divName;
    };

    const moviesContainer = document.querySelector('.movies-container'); // container for all cards
    const cards = document.querySelectorAll('.wrapper-card-decor');
    if (cards) {
        cards.forEach((elem) => {
            elem.remove();
        });
    }

    const oops = document.querySelector('.movie-card__oops');
    if (oops) {
        oops.remove();
    }


    if (data.results.length > 0) {
        let result = data.results.map((key) => {

            let posterImg;
            if (key.poster_path) {
                posterImg = `https://image.tmdb.org/t/p/w500${key.poster_path}`;
            } else {
                posterImg = './assets/img/poster-null.png';
            }

            // ----------------- card decoration element ----------------
            const wrapperCardDecor = createElem(moviesContainer, 'wrapper-card-decor', 'div');

                // ----------------------- card -------------------------
                const moviesContainerCard = createElem(wrapperCardDecor, 'movie-card', 'div'); // main card container

                    // ----------------------- image block -------------------------
                    const imageWrapper = createElem(moviesContainerCard, 'movie-card__image-wrapper', 'div'); // image decorate div

                        const image = createElem(imageWrapper, 'movie-card__image', 'img');
                        image.src = posterImg;

                        const imageDecore = createElem(imageWrapper, 'movie-card__image-decor', 'div');

                        const movieInfo = createElem(imageWrapper, 'movie-card__movie-info', 'p');
                        movieInfo.innerText = `${key.overview}`;
                        movieInfo.setAttribute('lang', 'ru');

                        // const imageBack = createElem(movieInfo, 'movie-card__image-back', 'img');

                        const imageBack = document.createElement('img');
                        imageBack.classList.add('movie-card__image-back');
                        movieInfo.prepend(imageBack);
                        imageBack.src = posterImg;


                    // ----------------------- text block -------------------------
                    const movieCardTextWrapper = createElem(moviesContainerCard, 'movie-card__text-wrapper', 'div');



                        // const date = document.createElement('p');
                        // date.classList.add('movie-card__date');
                        // const splitDate = key.release_date.split("-");
                        // date.innerText = splitDate[0];
                        // moviesContainerCard.append(date);
                        const moviesCardInfoTitleWrapper = createElem(movieCardTextWrapper, 'movie-card__info-titile-wrapper', 'div');

                            const moviesCardVoteWrapper = createElem(moviesCardInfoTitleWrapper, 'movie-card__vote-wrapper', 'div');

                                const voteIcon = createElem(moviesCardVoteWrapper, 'movie-card__vote-icon', 'div');
                                voteIcon.style.backgroundImage = 'url("./assets/svg/vote.svg")';

                                const vote = createElem(moviesCardVoteWrapper, 'movie-card__vote', 'p');
                                vote.innerText = key.vote_average;

                            const infoButtonWrapper = createElem(moviesCardInfoTitleWrapper, 'movie-card__info-button-wrapper', 'div');
                            const infoButton = createElem(infoButtonWrapper, 'movie-card__info-button', 'div');
                            const infoButtonText = createElem(infoButton, 'movie-card__info-button-text', 'p');
                            infoButtonText.innerText = 'i';

                            // const infoIcon = createElem(moviesCardInfoTitleWrapper, 'movie-card__info-icon', 'div');
                            // infoIcon.style.backgroundImage = 'url("./assets/svg/info.svg")';

                            infoButtonWrapper.addEventListener('click', () => {
                                image.classList.toggle('show-overview');
                                // imageDecore.classList.toggle('show-overview');
                                imageBack.classList.toggle('show-overview');
                                movieInfo.classList.toggle('show-overview');
                                infoButtonWrapper.classList.toggle('movie-card__button-click');
                                infoButton.classList.toggle('movie-card__button-click');
                                infoButtonText.classList.toggle('movie-card__button-click');
                            });


                        const title = createElem(movieCardTextWrapper, 'movie-card__title', 'p');
                        title.innerText = key.title;

        });
    } else {
        const oopsInfo = createElem(moviesContainer, 'movie-card__oops', 'p');
        oopsInfo.innerText = `Oops! Can't find anything on your query "${requestValue}"! =(`;
    }
};

getMovieData(url);

const search = document.querySelector('.header__search');
search.addEventListener('search', () => {
    const el = event.target;
    const value = el.value;
    let urlRequest;
    if (value) {
        urlRequest = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=085ded34e7ba5e71fc4264485245f7f0&language=ru-RU&include_image_language=ru,null`;
    } else {
        urlRequest =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=085ded34e7ba5e71fc4264485245f7f0&language=ru-RU&include_image_language=ru,null";
    }
    getMovieData(urlRequest, value);
});

window.addEventListener( 'load', () => {
    alert('В рамках учебного проекта автор разрешил себе некие вольноти в приоретете UI над UX, которых бы не допустил в реальной жизни!\n\nЕсли вы не заметили футер — пожалуйста, присмотритесь повнимательней!');
});
