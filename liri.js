require("dotenv").config();

// variables, using the reqiure command to call things from other files
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var fs = require("fs");
// user can choose a command, either concert-this, spotify-this-song, movie-tihs, do-what-it-says
var userChoice = process.argv[2];
// after the user types their choice of command they will type in their input that will be input to the appropriate API
var inputs = process.argv[3];

userInputs(userChoice, inputs);

// validating userChoice and attributing the correct function with the input
function userInputs(userChoice, inputs) {
    switch (userChoice) {
        case 'concert-this':
            showConcertInfo(inputs);
            break;
        case 'spotify-this-song':
            showSongInfo(inputs);
            break;
        case 'movie-this':
            showMovieInfo(inputs);
            break;
        case 'do-what-it-says':
            showSomeInfo();
            break;
        default:
            // error message, userChoice validation
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// concert function; user inputs artist name to find concerts, it will print as many as the API can find
function showConcertInfo(inputs) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("--- Event Info ---");
                console.log(i);
                console.log("Name of the Venue: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.city);
                console.log("Date of the Event: " + concerts[i].datetime);
                console.log("----------------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}

// spotify function; user inputs song title or key word to find songs, it will print as many as the API can find
function showSongInfo(inputs) {
    if (inputs === undefined) {
        // The sign is the default if nothing is entered
        inputs = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: inputs
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("--- Song Info ---");
                console.log(i);
                console.log("Song name: " + songs[i].name);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("----------------------------");
            }
        }
    );
};

// movie function; user inputs move name to find movie info, it will print as many as the API can find
function showMovieInfo(inputs) {
    if (inputs === undefined) {
        // Mr. Nobody is the default if nothing is found wtih a link to it's information and suggestion to watch on Netflix
        inputs = "Mr. Nobody"
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=5ac16e77";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movies = JSON.parse(body);
            console.log("--- Movie Info ---");
            console.log("Title: " + movies.Title);
            console.log("Release Year: " + movies.Year);
            console.log("IMDB Rating: " + movies.imdbRating);
            console.log("Country of Production: " + movies.Country);
            console.log("Language: " + movies.Language);
            console.log("Plot: " + movies.Plot);
            console.log("Actors: " + movies.Actors);
            console.log("----------------------------");
        } else {
            console.log('Error occurred.');
        }

    });
}

// do what is says function; user inputs the command without an argument to see the output; this will call the spotify call in the random.txt
function showSomeInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        userInputs(dataArr[0], dataArr[1]);
    });
}

