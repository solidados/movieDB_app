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
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        // ! -- Important: this is to prevent page reload ->
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`;
            }
            if (favorite) {
                alert(`Фильм "${newFilm}" будет добавлен в категорию Избранное`);
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
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

    // ? -- Function to sort any array (as an argument)
    const sortArr = (arr) => {
        arr.sort();
    };

    const createMovieList = (films, parent) => {
        parent.innerHTML = "";  // parental element will be cleared

        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    };

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});


