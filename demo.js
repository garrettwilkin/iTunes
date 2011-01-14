/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var MetaMedia = require('./metamedia').MetaMedia;
var Divider = require('./divider').Divider;
var iTunes = require('./itunes').iTunes;

/*
 * Demo
 */

inform = new Divider('Demo');
inform.print('iTunes API Implementation in node.js');

function old() {

    artistData = new MetaMedia();
    artistData.getArtist('Bon Iver');

    artistData2 = new MetaMedia();
    artistData2.getArtist('Smashing Pumpkins');

    artistData3 = new MetaMedia();
    artistData3.getArtist('We Are Scientists');

    artistData4 = new MetaMedia();
    artistData4.getArtist('John Coltrane');

}


function Track(artist, album) {
    this.artist = artist;
    this.album = album;
    this.itunesLink = '';
};

function Album(url) {
    this.storeUrl = url;
};

/*
function getStoreLink(track) {
    itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
        if (error) {
            pretty.print('there was an error');
        } else {
            track.itunesLink = album.storeUrl;
            track.emit('storeLink');
        }
    });
}
*/
 
function newer() {
   var itunesClient = new iTunes('garrett-the-tunes-broker-1234');

   function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                pretty.print('there was an error');
            } else {
                track.itunesLink = album.storeUrl;
                //track.emit('storeLink');
            }
        });
    }

    var qwantzTrack = new Track('Smashing Pumpkins','Siamese Dream');
    getStoreLink(qwantzTrack);

    inform.print('Result of new design: ' + qwantzTrack.itunesLink);
}

newer();
