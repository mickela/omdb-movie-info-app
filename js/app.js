$ = selector => document.querySelector(selector);

$("#form").addEventListener('submit', (e)=>{
    e.preventDefault();
    $("#result").innerHTML =`<img src="media/little-loader.gif" class="loader" alt="loading..."/>`;
    const movie = $("#search").value;
    const url = `http://www.omdbapi.com/?s=${movie}&apikey=caae1d51`;
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
            let year = '', rating = '', runtime = '', genre = '', plot = '', country = '';
            fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=caae1d51`)
            .then((res)=> res.json())
            .then((info)=>{
                year = info.Realeased;
                rating = info.Rated;
                runtime = info.Runtime;
                genre = info.Genre;
                plot = info.Plot;
                county = info.Country;
            })


 

            list += `
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <img class="card-img-top" src="${movie.Poster}" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Type: ${movie.Type}</p>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a href="#" class="btn btn-primary">More Details</a>
                    </div>
                </div>
            `
        })
        $("#totalnum").innerText = `Total results: ${resultsnum}`;
        $("#result").innerHTML = `
        ${list}
        `;
        // <p><a href="${movies.address}">See all</a></p>
    }) //end data's then
    .catch((err)=> {
        console.log(err);
        $("#result").innerHTML = `Oops!, something went wrong. ${err} Please try again.`;
    }) // end catch
}) // end submit function

