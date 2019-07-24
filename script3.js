// 1
const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru&query=' + searchText;
    movie.innerHTML = "Загрузка";
    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value.status);
            }
            return value.json();
        })
        .then(function(output) {
            console.log(output);
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `
                <div class="col-12 col-md-4 col-xl-3">
                <img src="${urlPoster+item.poster_path}" alt="${nameItem}">
                ${nameItem}
                </div>
                `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = "Что то пошло не так";
            console.error('error:' + reason);
        });
}

searchForm.addEventListener('submit', apiSearch);