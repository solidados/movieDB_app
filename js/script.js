// * --- Task-6(1)
document.addEventListener('DOMContentLoaded', () => {

    "use strict";

    const movieDB = {
        movies: [
            "Шерлок Холмс и доктор Ватсон",
            "Корабль-призрак",
            "Ла-ла лэнд",
            "Скотт Пилигрим против...",
            "Одержимость",
        ]
    };

    // ! --- Main events handler ->
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),

        // * --- Task-6(1, 4, 5)
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        // ! -- Important: this is to prevent page reload ->
        event.preventDefault();

        const newFilm = addInput.value;
        const favorite = checkbox.checked;

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
    });


    // ? -- Function to delete advertizing
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };


    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = "url('img/bg.jpg')";
    };


    const sortArr = (arr) => {
        arr.sort();
    };


    function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }

    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);
    createMovieList(movieDB.movies, movieList);

});


