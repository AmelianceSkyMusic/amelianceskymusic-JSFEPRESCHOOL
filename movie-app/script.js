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
