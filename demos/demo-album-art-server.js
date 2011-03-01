/*
 * Author: Garrett Wilkin garrett.wilkin@gmail.com @garrettwilkin geethink.com/blog
 * A simple webserver that demonstrates practical use of the iTunes library.
 * Currently it looks up the album art for several hard coded albums.
 * Point your browser to 'localhost:8005/test'.
 */

require.paths.unshift(require('path').join(__dirname, '..','util'));

var http = require('http');
var url = require('url');
var iTunes = require('itunes').iTunes;

var Divider = require('divider').Divider;
inform = new Divider('Demo');
inform.print('Simple webserver implementation making use of iTunes and Linkshare libraries.');
inform.print('Point a web browser to http://localhost:8005/test to start the test.');

var lastPath = '';

function Track(artist, album) {
    this.artist = artist;
    this.album = album;
    this.itunesLink = '';
};

function showArt(response) {
    response.write('showArt');
    var itunesClient = new iTunes();

    function getArt(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                response.write('Could not find album ' + track.album + ' by ' + track.artist);
            } else {
                imgCode  = '<img src="' + album.artworkUrl100+ '">';
                var artyLinky = imgCode;
                var token = '51513f78fd1448d3e722ccf3cd4d79d5af7ac710b4badea2f1bd0a685bd2b85e';
                var merchantId = '13508';
                var artyLinky = '<a href="' + album.storeUrl + '">' + artyLinky + '<a>'
                response.write(artyLinky);
            };
        });
    }

    var track1 = new Track('Miles Davis','Kind of Blue');
    var track2 = new Track('Smashing Pumpkins','Siamese Dream');
    var track3 = new Track('Aerosmith','Get a Grip');
    var lastTrack = new Track('Beastie Boys','Pauls Boutique');

    var tracks = [track1,
                  track2,
                  track3,
                  lastTrack];
    for (i in tracks)
    {
        getArt(tracks[i]);
    };

};


function handleWebRequest(request, response) {
  var responseHeaders  = {
    'Content-Type': 'text/html'
  };
  response.writeHead(200, responseHeaders);
  var path = url.parse(request.url).pathname;
  
  setTimeout(function() {

    if (path == '/') {
      response.write('home page');
    } else {
      response.write('you asked for ' + path);
      response.write('<p>the last path requested was ' + lastPath);

      response.write('<p>Demoing Itunes Album Art ');

      showArt(response);
      
      response.write('<p>And we lived happily ever after,');
      response.write('<p>The End.');
    }

    //Commenting out response.end() allows the album art to 
    //pop into the page when the callbacks complete!
    //response.end();

    if (path != '/favicon.ico') {
      lastPath = path;
    }
  }, 5000);
};

var server = http.createServer(handleWebRequest);

server.listen(8005);

