require.paths.unshift(require('path').join(__dirname));
var http = require('http');
var url = require('url');
var iTunes = require('itunes').iTunes;
var LinkShare = require('linkshare').LinkShare;

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
                var linkshare = new LinkShare(token,merchantId,album.storeUrl);
                linkshare.getLink(function(link) {
                    artyLinky = '<a href="' + link + '">' + artyLinky + '<a>'
                    response.write(artyLinky);
                });
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

    //Commenting out response.end() allows the album art to pop into the page when the callbacks complete!
    //response.end();

    if (path != '/favicon.ico') {
      lastPath = path;
    }
  }, 5000);
};

var server = http.createServer(handleWebRequest);

server.listen(8005);

