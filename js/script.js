// "use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false,

    start: () => {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },

    rememberMyFilms: () => {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', '').trim(),
                b = prompt("На сколько оцените его?").trim();

            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b;
                console.log('done');
            } else {
                console.log('Error');
                i--;
            }
        }
    },

    detectPersonalLevel: () => {
        if (personalMovieDB.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            console.log("Вы - киноман!");
        } else {
            console.log("Произошла ошибка");
        }
    },

    showMyDB: (hidden) => {
        if (!hidden) console.log(personalMovieDB);
    },

    toggleVisibleMyDB: () => {
        if (personalMovieDB.private) {
            personalMovieDB.private = false;
        } else {
            personalMovieDB.private = true;
        }
    },

    writeYourGenres: () => {
        for (let i = 1; i < 2; i++) {
            // ! --- Variant 1 ---
            /* let genre = prompt(`Ваш любимый жанр под номером ${i}`, '').trim();

            if (genre === '' || genre == null) {
                console.log('Вы ввели некорректные данные, или не ввели их вообще');
                i--;
            } else {
                personalMovieDB.genres[i - 1] = genre;
            } */
            // ! --- Variant 2 ---
            let genres = prompt(`Введите ваши любимые жанры через запятую`, '').toLowerCase().trim();

            if (genres === '' || genres == null) {
                console.log('Вы ввели некорректные данные, или не ввели их вообще');
                i--;
            } else {
                personalMovieDB.genres = genres.split(', ').sort();
            }
        }

        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        });
    }
};

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Скотт Пилигрим против...",
        "Одержимость",
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre');
movieList = document.querySelector('.promo__interactive-list');

adv.forEach(item => {
    item.remove();
});

genre.textContent = 'драма';
poster.style.backgroundImage = "url('img/bg.jpg')";

// ?
movieList.innerHTML = '';
movieDB.movies.sort();
movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
    `;
});