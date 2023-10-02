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

window.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      "Шерлок Холмс и доктор Ватсон",
      "Корабль-призрак",
      "Ла-ла лэнд",
      "Скотт Пилигрим против...",
      "Одержимость",
    ]
  };

  const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = document.querySelector('.adding__input'),
    checkBox = document.querySelector('[type="checkbox"]');

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkBox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`
      }

      if (favorite) {
        alert('Movie marked as Favorite')
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);

      createMovieList(movieDB.movies, movieList);
    }

    event.target.reset()
  })

  const deleteAdv = (arr) => {
    arr.forEach(item => {
      item.remove();
    });
  }

  const makeChanages = () => {
    genre.textContent = 'драма';
    poster.style.backgroundImage = "url('img/bg.jpg')";
  }

  const sortArr = (arr) => arr.sort();

  function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);

    films.forEach((film, i) => {
      parent.innerHTML += `
      <li class="promo__interactive-item">${i + 1}. ${film}
        <div class="delete"></div>
      </li>
      `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(films, parent)
      })
    })
  }

  deleteAdv(adv);
  makeChanages();
  createMovieList(movieDB.movies, movieList);
})