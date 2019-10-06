$ = selector => document.querySelector(selector);
const id = sessionStorage.getItem('movieId');
const url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=caae1d51`;
let output = '';
fetch(url)
.then((res)=> res.json())
.then((movie)=> {
    console.log(movie);
    $("#title").textContent = movie.Title;
    output +=   `
    <div class="col-md-3">
        <img src="${movie.Poster}" class="img-thumbnail shadow-lg" alt="${movie.Title} poster"/>
    </div>
    <div class="col-md-9">
        <p class="movie-heading dir">Director: <small>${movie.Director}</small></p> 
        <p class="movie-heading">Writer(s): <small>${movie.Writer}</small></p> 
        <p class="movie-heading">Actors: <small>${movie.Actors}</small></p> 
        <p class="movie-heading">Genre: <small>${movie.Genre}</small></p> 
        <p class="movie-heading">Released: <small>${movie.Released}</small></p> 
        <p class="movie-heading">Runtime: <small>${movie.Runtime}</small></p> 
        <p class="movie-heading">Rated: <small>${movie.Rated}</small></p> 
        <p class="movie-heading">Website: <small><a href="${movie.Website}" class="">${movie.Website}</a></small></p> 
        <p class="movie-heading">Language: <small>${movie.Language}</small></p> 
        <p class="movie-heading">Overview: 
        <p class="movie-desc">${movie.Plot}</p></p>
    </div>
    `;
    $("#row").innerHTML = output;
})
{/* <h3 class="movie-title">${}</h3> */}