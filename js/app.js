const $ = selector => document.querySelector(selector);

let pagenum = 0;

$("#form").addEventListener('submit', (e)=>{
    e.preventDefault();
    if($("#search").value == '') alert('Please input the title of the movie you want to search for');
    else{
        pagenum++;
        $("#tip").style.display = 'none';
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
            const resultsnum = data.totalResults; //if <= 9, do not display pagination
            console.log(movies); 
            let list = '';
            // if movie.poster doesn't exist, use custom image
            let Alt = 'https://via.placeholder.com/300.png/808080/ff0000?text=Not+Available';
            movies.forEach(movie => {
                const movieId = movie.imdbID;
                list += `
                    <div class="card text-secondary" style="width: 18rem; margin: 1rem;">
                        <img class="card-img-top" src="${movie.Poster == 'N/A' ? Alt : movie.Poster}" alt="${movie.Title}"/>
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <p class="card-text">Type: ${movie.Type}</p>
                            <p class="card-text">Year: ${movie.Year}</p>
                            <a href="#" onclick="selectMovie('${movie.imdbID}')" class="btn btn-primary">More Details</a>
                        </div>
                    </div>
                `;
            })
            $("#totalnum").innerText = `No. of movies found: ${resultsnum}`;
            $("#result").innerHTML = `${list}`;
            if (resultsnum > 9){
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
            }
            $("#result-title").style.display = 'block';
        }) //end data's then
        .catch((err)=> {
            console.log(err);
            $("#totalnum").innerHTML = `Oops!, something went wrong. ${err} Please try again.`;
            $("#result").innerHTML = ``;
        }) // end catch
    } // the big else statement
}) // end submit function



function slide (direction){
    if(direction == 'left'){
        $("#movies").style.width = '0vw';
        $("#detail").style.width = '100vw';
        $("#movies").style.display = 'none';
        $("#detail").style.display = 'block';
    }
    else if(direction == 'right'){
        $("#detail").style.width = '0vw';
        $("#movies").style.width = '100vw';
        $("#movies").style.display = 'block';
        $("#detail").style.display = 'none';
    }
}

$("#backbtn").addEventListener('click', ()=> slide('right'));

// fix the go function
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
        $("#result").innerHTML += list;
    }).catch((e)=> {console.log(e); $("#result").innerHTML += e;})
} // end go function

document.addEventListener('keydown', (e)=>{
    // console.log(e.which);
    if(e.ctrlKey && e.which == 39) slide('left');
    else if(e.ctrlKey && e.which == 37) slide('right');
})
// sessionStorage.removeItem('movieId');

$("#theme-controller").addEventListener('click', ()=>{
    $("body").classList.toggle('dark-mode');
    $("nav").classList.toggle('dark-mode');
})

$(".navbar-toggler").addEventListener('click', ()=>{
    $(".navbar-collapse").classList.toggle('show');
})