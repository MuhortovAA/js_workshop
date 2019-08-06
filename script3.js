// 1
const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;

    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';
    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output) {
            console.log(output);
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">По вашему запросу ничего не найдено</h2>';
            }
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpg';
                let dataInfo = '';
                if (item.media_type !== 'person')
                    dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;

                inner += `
                <div class="col-6 col-md-4 col-xl-3 item">
                <img src="${poster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
                ${nameItem}
                </div>
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();


        })
        .catch(function(reason) {
            // movie.innerHTML = "Что то пошло не так";
            console.error('error:' + reason);
        });
}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
    const media = movie.querySelectorAll('img[data-id]');
    media.forEach(function(elem) {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}



function showFullInfo() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru';
    } else if (this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru';
    } else {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Произошла ошибка повторите поже</h2>';
    }
    fetch(url)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output) {
                movie.innerHTML = `
            <h4 class="col-12 text-center text-info">${output.name||output.title}</h4>
            <div class="col-4">
            <img src='${urlPoster+output.poster_path}' alt='${output.name||output.title}'>
            ${(output.homepage)? `<p class='text-center'><a href="${output.homepage}" target="_blank"> Официальная страница </a></p>`:''}
            ${(output.homepage)? `<p class='text-center'><a href="https://imdb.com/title/ ${output.imdb_id}" target="_blank"> Страница на IMDB.com </a></p>`:''}
            
            </div>
            <div class="col-8">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Статус: ${output.status}</p>
            <p>Премьера: ${output.first_air_date || output.release_date}</p>
            ${(output.last_episode_to_air)?`<p>${output.number_of_seasons} сезонов ${output.last_episode_to_air.episode_number} серий вышло</p>` : ''}
            <p>Описание: ${output.overview}</p>

            </div>
            `;
        })
        .catch(function(reason) {
            console.error('error:' + reason);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru')
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output) {
            console.log('output:' + output);
            let inner = '<h4 class="col-12 text-center text-info">Популярны фильмы:</h4>';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">По вашему запросу ничего не найдено</h2>';
            }
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpg';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                inner += `
            <div class="col-6 col-md-4 col-xl-3 item">
            <img src="${poster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
            ${nameItem}
            </div>
            `;
            });
            movie.innerHTML = inner;

            addEventMedia();


        })
        .catch(function(reason) {
            console.error('error:' + reason);
        });
});