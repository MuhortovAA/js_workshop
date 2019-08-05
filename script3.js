// 1
const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    movie.innerHTML = '<div class="spinner"></div>';
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
    };
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru&query=' + searchText;

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
    console.log(this);
}