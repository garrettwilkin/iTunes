/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var Divider = require('./divider').Divider;
var iTunes = require('./itunes').iTunes;
var LinkShare = require('./linkshare').LinkShare;

/*
 * Demo of iTunes class.
 */

inform = new Divider('Demo');
inform.print('iTunes API Implementation in node.js');

function Track(artist, album) {
    this.artist = artist;
    this.album = album;
    this.itunesLink = '';
};

/*
 Example use case: retrieving a iTunes store link for a particular album.
 ------------------------------
*/

function getStoreLink(track) {
    itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
        if (error) {
            inform.print('there was an error');
        } else {
            track.itunesLink = album.storeUrl;
            inform.print(track.itunesLink);
        }
    });
}

/*
 Example of reusing the iTunes object four times.
*/

function getAlbumStoreLinks() {
    var itunesClient = new iTunes();
    function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                inform.print('there was an error');
            } else {
                track.itunesLink = album.storeUrl;
                inform.print(track.itunesLink);
            }
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
        getStoreLink(tracks[i]);
    };

};

getAlbumStoreLinks();
