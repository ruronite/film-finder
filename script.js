const tmdbKey = API_KEY;

//console.log(tmdbKey);

const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse =  await response.json()
      //console.log(jsonResponse)
      const genres = jsonResponse.genres;
      return genres
    }
  }
  catch(error){
    console.log(error)
  }

};

const getMovies = async() => {
    //generates random page number 
  //const randomPageNumber = Math.ceil(Math.random() * 1000);
  //console.log(randomPageNumber); 
  const selectedGenre = getSelectedGenre();
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  //const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPageNumber}`;
  const discoverMovieEndpoint = "/discover/movie";
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try{
    const response = await fetch(urlToFetch);
    //console.log("status",response.status)
    if (response.status === 422){
      getMovies()
    }
    else if(response.ok){
      const jsonResponse = await response.json()
      //console.log(jsonResponse);
      const movies = jsonResponse.results;
      //console.log(movies)
      return movies
    }
  }
  catch(error){
    console.log(error)
  }
};

const getMovieInfo = async (movie) => {
  //console.log("random movie",movie)
  const movieId = movie.id;
  //console.log("move_id", movieId)
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try{
    const response =  await fetch(urlToFetch);
    if (response.ok){
      const movieInfo = await response.json();
      //console.log("movieinfo", movieInfo);
      return movieInfo;
    }
  }
  catch(error){
    console.log(error)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
  
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;