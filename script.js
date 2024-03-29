const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    server = 'https:/api.themoviedb.org/3/search/multi?api_key=25d88f055e7a91d25fd272f3fd287165&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            movie.innerHTML = "загрузка";

            return;
        }
        if (request.status !== 200) {
            movie.innerHTML = "Что то пошло не так";
            console.log('error:' + request.status);
            return;
        }


        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            //console.log(nameItem);
            inner += '<div class="col-12 col-md-4 col-xl-3">' + nameItem + '</div>';
        });
        movie.innerHTML = inner;
        //console.log(output);
    });

}


//console.log(searchForm);