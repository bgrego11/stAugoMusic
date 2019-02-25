var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:type/:name', function(req, res, next) {
  name = req.params.name
  type = req.params.type

  // add if statement, if track then search if artist then search and request
  //endpoint for artists top tracks
  // https://api.spotify.com/v1/artists/{id}/top-tracks

  // spotify
  // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  // .then(function(data) {
  //   console.log(data); 
  // })
  // .catch(function(err) {
  //   console.error('Error occurred: ' + err); 
  // });
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: "9e55a3b5d09b4ed099b6902845422e83",
    secret: "bc5a2992517540df8f81d51839e9f594"
  });

  if (type === 'track') {
    console.log(type + "\n"+ name)
    

    spotify.search({ type: type, query: name }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    let tracks = data.tracks.items
    cleanTracks = []
    for (i in tracks) {
      artist = tracks[i].artists[0].name
      title = tracks[i].name
      prevUrl = tracks[i].preview_url
      uri = tracks[i].uri
      cleanTracks.push({
        artist: artist,
        title: title,
        prevUrl: prevUrl,
        uri: uri
      })
    }

    res.json({tracks: cleanTracks})
  })
} else if (type === 'artist') {
  spotify.search({ type: type, query: name }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    imgUrl = data.artists.items[0].images[0].url
    artId = data.artists.items[0].id

    apiUrl = "https://api.spotify.com/v1/artists/" + artId + "/top-tracks/?country=US"

  spotify
  .request(apiUrl)
  .then(function(data) {
    console.log(data); 
    tracks = data.tracks
    cleanTracks = []

    for (i in tracks) {
      artist = tracks[i].artists[0].name
      title = tracks[i].name
      prevUrl = tracks[i].preview_url
      uri = tracks[i].uri
      cleanTracks.push({
        artist: artist,
        title: title,
        prevUrl: prevUrl,
        uri: uri
      })
    }

    res.json({tracks: cleanTracks})
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });




    
  })
}
else {
  res.json({"error": "bad url parameter"})
}




});

module.exports = router;
