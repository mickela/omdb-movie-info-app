$ = selector => document.querySelector(selector);

let pagenum = 0;

$("#form").addEventListener('submit', (e)=>{
    e.preventDefault();
    pagenum++;
    $("#totalnum").innerText = ``;
    $("#result-title").style.display = 'none';
    $("#result").innerHTML =`<img src="media/loader.gif" class="loader" alt="loading..."/>`;
    const movie = $("#search").value;
    const url = `http://www.omdbapi.com/?s=${movie}&page=${pagenum}&apikey=caae1d51`;
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data);
        const movies = data.Search;
        const resultsnum = data.totalResults;
        console.log(movies);
        let list = '';
        movies.forEach(movie => {
            const movieId = movie.imdbID;
            list += `
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <img class="card-img-top" src="${movie.Poster}" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Type: ${movie.Type}</p>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a href="#" onclick="selectMovie('${movie.imdbID}')" class="btn btn-primary">More Details</a>
                    </div>
                </div>
            `;
        })
        $("#totalnum").innerText = `Total results: ${resultsnum}`;
        $("#result").innerHTML = `${list}`;
        $("#pagination").innerHTML =  `
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center shadow-sm">
                <li class="page-item"><a class="page-link" onclick="go(-)" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" onclick="go(1)" href="#">1</a></li>
                <li class="page-item"><a class="page-link" onclick="go(2)" href="#">2</a></li>
                <li class="page-item"><a class="page-link" onclick="go(3)" href="#">3</a></li>
                <li class="page-item"><a class="page-link" onclick="go(+)" href="#">Next</a></li>
            </ul>
        </nav>
        `;
        $("#result-title").style.display = 'block';
        // <p><a href="${movies.address}">See all</a></p>
    }) //end data's then
    .catch((err)=> {
        console.log(err);
        $("#totalnum").innerHTML = `Oops!, something went wrong. ${err} Please try again.`;
        $("#result").innerHTML = ``;
    }) // end catch
}) // end submit function

function selectMovie(id){
    sessionStorage.setItem('movieId', id);
    // window.location = "details.html";
    $("#movies").style.width = '0vw';
    $("#detail").style.width = '100vw';
    $("#movies").style.display = 'none';
    $("#detail").style.display = 'block';
    $("#backbtn").addEventListener('click', ()=>{
        $("#detail").style.width = '0vw';
        $("#movies").style.width = '100vw';
        $("#movies").style.display = 'block';
        $("#detail").style.display = 'none';
    })
}



function go (num){
    const movie = $("#search").value;

    let url = '';
    if(num == "-"){
        pagenum--;
        url = `http://www.omdbapi.com/?s=${movie}&page=${pagenum}&apikey=caae1d51`;
    }
    else if (num == "+"){
        pagenum++;
        url = `http://www.omdbapi.com/?s=${movie}&page=${pagenum}&apikey=caae1d51`;
    }
    else{
        pagenum = num;
        url = `http://www.omdbapi.com/?s=${movie}&page=${pagenum}&apikey=caae1d51`;
    }
 
    
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data);
        const movies = data.Search;
        console.log(movies);
        let list = '';
        movies.forEach(movie => {
            const movieId = movie.imdbID;
            list += `
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <img class="card-img-top" src="${movie.Poster}" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Type: ${movie.Type}</p>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a href="#" onclick="selectMovie('${movie.imdbID}')" class="btn btn-primary">More Details</a>
                    </div>
                </div>
            `;
        })
        // const listdiv = document.createElement('DIV');
        // listdiv.innerHTML = list;
        $("#result").innerHTML += list;
    }).catch((e)=> {console.log(e)})
}