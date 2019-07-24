const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = 'https:/api.themoviedb.org/3/search/multi?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru&query=' + searchText;
    movie.innerHTML = "Загрузка";
    requestApi(server)
        .then(function ViewData(result) {
            const output = JSON.parse(result);
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += '<div class="col-12 col-md-4 col-xl-3">' + nameItem + '</div>';
            });
            movie.innerHTML = inner;
        })
        .catch(function ViewMessage(reason) {

            movie.innerHTML = "Что то пошло не так";
            console.log('error:' + reason.status);
        });
}

searchForm.addEventListener('submit', apiSearch);





function requestApi(url) {
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener('load', function() {
            if (request.status !== 200) {
                reject({ status: request.status });
                return;
            }
            resolve(request.response);
        });
        request.addEventListener('error', function() {
            reject({ status: request.status });
        });
        request.send();
    });
}