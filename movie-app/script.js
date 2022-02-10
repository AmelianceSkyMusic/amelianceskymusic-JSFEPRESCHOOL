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

    const createDiv = (divClass, parentName) => {
        const divName = document.createElement('div');
        divName.classList.add(divClass);
        parentName.append(divName);
        return divName;
    };

    const moviesContainer = document.querySelector('.movies-container'); // container for all cards

    let result = data.results.map((key) => {


        // const wrapperCardDecor = document.createElement('div');
        // wrapperCardDecor.classList.add('wrapper-card-decor');
        // moviesContainer.append(wrapperCardDecor);

        const wrapperCardDecor = createDiv('wrapper-card-decor', moviesContainer);

            const moviesContainerCard = createDiv('movie-card', wrapperCardDecor);

            // const moviesContainerCard = document.createElement('div');
            // moviesContainerCard.classList.add('movie-card');
            // wrapperCardDecor.append(moviesContainerCard);

                const image = document.createElement('img');
                image.classList.add('movie-card__image');
                image.src = `https://image.tmdb.org/t/p/w500${key.poster_path}`;
                image.alt = key.title;
                moviesContainerCard.append(image);

                const title = document.createElement('p');
                title.classList.add('movie-card__title');
                title.innerText = key.title;
                moviesContainerCard.append(title);

                // const date = document.createElement('p');
                // date.classList.add('movie-card__date');
                // const splitDate = key.release_date.split("-");
                // date.innerText = splitDate[0];
                // moviesContainerCard.append(date);

                // const moviesCardVoteWrapper = document.createElement('div');
                // moviesCardVoteWrapper.classList.add('movie-card__vote-wrapper');
                // moviesContainerCard.append(moviesCardVoteWrapper);

                const moviesCardVoteWrapper = createDiv('movie-card__vote-wrapper', moviesContainerCard);

                    const voteIcon = document.createElement('div');
                    voteIcon.classList.add('movie-card__vote-icon');
                    voteIcon.style.backgroundImage = 'url("./assets/svg/vote.svg")';
                    moviesCardVoteWrapper.append(voteIcon);

                    const vote = document.createElement('p');
                    vote.classList.add('movie-card__vote');
                    vote.innerText = key.vote_average;
                    moviesCardVoteWrapper.append(vote);



    });
};

getMovieData();
