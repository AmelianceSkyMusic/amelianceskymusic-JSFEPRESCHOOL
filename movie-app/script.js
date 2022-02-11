/* jshint esversion: 9 */
// /*jshint -W033 */

// ^................... ( Msg from console.log ) ....................

const Msg = msg => console.log(msg);

// >----------------------------------------------------------------<
// >                            GET DATA                            <
// >----------------------------------------------------------------<

// ^--------------------------- get data ----------------------------

const url =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=085ded34e7ba5e71fc4264485245f7f0&language=ru-RU&include_image_language=ru,null";

async function getMovieData() {
    const res = await fetch(url);
    const data = await res.json();
    Msg(data.results);
    showMovieData(data);
}

const showMovieData = (data) => {

    const createElem = (parentName, divClass, element = 'div') => {
        const divName = document.createElement(element);
        divName.classList.add(divClass);
        parentName.append(divName);
        return divName;
    };

    const moviesContainer = document.querySelector('.movies-container'); // container for all cards

    let result = data.results.map((key) => {

        // ----------------- card decoration element ----------------
        const wrapperCardDecor = createElem(moviesContainer, 'wrapper-card-decor', 'div');

            // ----------------------- card -------------------------
            const moviesContainerCard = createElem(wrapperCardDecor, 'movie-card', 'div'); // main card container

                // ----------------------- image block -------------------------
                const imageWrapper = createElem(moviesContainerCard, 'movie-card__image-wrapper', 'div'); // image decorate div

                    const image = createElem(imageWrapper, 'movie-card__image', 'img');
                    image.src = `https://image.tmdb.org/t/p/w500${key.poster_path}`;
                    image.alt = key.title;

                    const imageDecore = createElem(imageWrapper, 'movie-card__image-decor', 'div');

                    const movieInfo = createElem(imageWrapper, 'movie-card__movie-info', 'p');
                    movieInfo.innerText = `${key.overview}`;


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
                            imageDecore.classList.toggle('show-overview');
                            infoButtonWrapper.classList.toggle('movie-card__button-click');
                            infoButton.classList.toggle('movie-card__button-click');
                            infoButtonText.classList.toggle('movie-card__button-click');
                        });


                    const title = createElem(movieCardTextWrapper, 'movie-card__title', 'p');
                    title.innerText = key.title;

    });
};

getMovieData();
