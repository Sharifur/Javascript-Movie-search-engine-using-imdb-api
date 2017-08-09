
    $(document).ready(function($){

    	$('#searchForm').on('submit',function(e){
    		var  searchText = $('#searchText').val();
    		getMovies(searchText);
    		e.preventDefault();
    	});
    });

function getMovies(searchText){
	axios.get('https://www.googleapis.com/youtube/v3/search/'+searchText)
	.then(function(response){
		var movies = response.data.Search;
		 var output = ''
		 $.each(movies,function(index,movie){
		 	output += `
				<div class="col-md-3">
				<div class="well text-center custom">
				<img src="${movie.Poster}" alt="Movie Poster" width="200" />
				<h5>${movie.Title}</h5>
				<button class="btn btn-info" onclick="movieSelected('${movie.imdbID}')" id="goDetails">Movie Details</button>
				</div>
				</div>
		 	`;
		 });

		 $('#movies').html(output);
	})
	.catch(function(error){
		console.log(error);
	});
}
    function getMovieDetails(){
    	var moviesid = sessionStorage.getItem("mid");
    	axios.get('http://www.omdbapi.com/?i='+moviesid+'&apikey=thewdb').then(function(response){
    		var mDetails = response.data;
    		var output = `
			<div class="col-md-4">
			<div class="padding-20"></div>
			<img src="${mDetails.Poster}" alt="Movie Image" />
			
			
			</div>
			<div class="col-md-8">
			<div class="padding-20"></div>
			<h1>${mDetails.Title}</h1>
			<ul class="list-group">
				<li class="list-group-item"><strong>Actor: </strong>${mDetails.Actors}</li>
				<li class="list-group-item"><strong>Genre:</strong>${mDetails.Genre}</li>
				<li class="list-group-item"><strong>Reseased: </strong>${mDetails.Released}</li>
				<li class="list-group-item"><strong>Language: </strong>${mDetails.Language}</li>
				<li class="list-group-item"><strong>Director: </strong>${mDetails.Director}</li>
				<li class="list-group-item"><strong>Writer: </strong>${mDetails.Writer}</li>
				<li class="list-group-item"><strong>Production: </strong>${mDetails.Production}</li>
				<li class="list-group-item"><strong>Run Time: </strong>${mDetails.Runtime}</li>
				<li class="list-group-item"><strong>Type: </strong>${mDetails.Type}</li>
				<li class="list-group-item"><strong>IMDB Rating: </strong>${mDetails.imdbRating}</li>
			</ul>
			</div>
			<div class="row">
				<div class="well">
					<h4>
					<strong>Plot</strong> 
						<hr />
						${mDetails.Plot}
					</h4>
					<hr>
					<a href="http://www.imdb.com/title/${mDetails.imdbID}" class="btn btn-success">View In IMDB</a>
					<a href="index.html" class="btn btn-info">Back To Search</a>
				</div>
			</div>
    		`;
    		$('#movie').html(output);
    	});
    };

            
