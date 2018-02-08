var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
// var inquirer = require("inquirer");

var myTweets = function(newTweet){
var client = new Twitter(keys.twitter);
var params = {screen_name: 'cnn'};

  if(newTweet){
    console.log("you want a new tweet: " + newTweet);
    //user provides new tweet
    //else print the 20 latest tweets
  }else{
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
      var tweetCount = (tweets.length >= 20) ? 20 : tweets.length;
      for (var i = 0; i < tweetCount; i++){
        console.log(tweets[i].text);
        console.log("--------------------------------");

       console.log(tweets);
      };
     };
  });
}
  
  console.log("tweet tweet");
};

var mySong = function(song_name){

var spotify = new Spotify(keys.spotify);

  if(!song_name){
    song_name = "All That She Wants";
  }

  spotify.search({ type: 'track', query: song_name }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Song Name: " + data.tracks.items[0].name);
    // Song Name
    console.log("Artist's Name: " + data.tracks.items[0].album.artists[0].name);
    // Album Name
    console.log("Preview Link URL: " + data.tracks.items[0].preview_url);
    // Preview link
    console.log("Album Name: " + data.tracks.items[0].album.name)
  }); 
}; //closes spotify

var myMovie = function(movieName){
    if(!movieName){
      movieName = "Batman";
    };
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating); //rating
      console.log("<\n>")
      console.log("The movie's title: " + JSON.parse(body).Title); //title
      console.log("<\n>")
      console.log("The movie's year: " + JSON.parse(body).Year); //title
      console.log("<\n>")
      console.log("The movie's country of origin is: " + JSON.parse(body).Country);
      console.log("<\n>")
      console.log("The movie's default language is: " + JSON.parse(body).Language);
      console.log("<\n>")
      console.log("The movie's plot is: " + JSON.parse(body).Plot);
      console.log("<\n>")
      console.log("The movie's cast includes: " + JSON.parse(body).Actors);

      if(!JSON.parse(body).Ratings[1]){
        console.log("There is no Rotten Tomatoes Rating");
      } else {
        console.log("Rotten Tomatoes Rating " + JSON.parse(body).Ratings[1].Value) //Rotten Tomatoes Rating
      };
    };
  });
};

var myRequest = function(text){
  fs.readFile("random.txt", "utf8", function(error, data){
    if (error) {
    return console.log(error);
    };
  var dataArr = data.split(",");
  liriMagic(dataArr[0], dataArr[1])
  })
};

var liriMagic = function(mediaType, content){
  switch(mediaType){
    case "my-tweets":
      myTweets(content);
    break;

    case "spotify-this-song":
      mySong(content)
    break;

    case "movie-this":
      myMovie(content);
    break;

    case "do-what-it-says":
      myRequest(content);
    break;
    default:
      console.log("LIRI has no idea what you are doing?")
    break;
  };
  // fs.appendFile("log.txt", variable, function(err){
  //   if (err) {
  //   console.log(err);
  //   };
  // });
};

liriMagic(process.argv[2], process.argv[3]);