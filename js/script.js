
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;
        //const newFilmCircumcised = newFilm.slice(22) + '...';
        if (newFilm) { // if (newFilm.length < 22)

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);

            sortArr(movieDB.movies); 

            createMovieList(movieDB.movies, movieList);

         } 
         //else {

        //     movieDB.movies.push(newFilmCircumcised) ;

        //     sortArr(movieDB.movies); 

        //     createMovieList(movieDB.movies, movieList);
        // }

        event.target.reset();

    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };


    const makeChanges = () => {
        genre.textContent = 'Драма'; // только текст

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


    const sortArr = (arr) => {
        arr.sort();
    };
 

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        // добавляем сортировку
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                 </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) =>{
            // где btn - корзина, i - номер фильма по порядку в массиве
            btn.addEventListener('click', () => {// навешиваем клик
                btn.parentElement.remove();// удаляем родителя
                movieDB.movies.splice(i, 1); // удаляем из БД
                // где i-номер c кот. удаляем, 1- сколько элементов удалить
                //применим рекурсию для изменения нумерации
                createMovieList(films, parent);

            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});