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
 * Demo
 */

inform = new Divider('Demo');
inform.print('iTunes API Implementation in node.js');

function Track(artist, album) {
    this.artist = artist;
    this.album = album;
    this.itunesLink = '';
};

/*
 Original theoretical code design:
 ---------------------------------
function getStoreLink(track) {
    itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
        if (error) {
            inform.print('there was an error');
        } else {
            track.itunesLink = album.storeUrl;
            track.emit('storeLink');
        }
    });
}
*/


/*
 Actual implemented code design:
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
 Example of reusing the iTunes object four times, slightly differently.
 (pssst... its used in the getStoreLink function).
*/

function evenNewer() {
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

function withLinkShare() {
    var itunesClient = new iTunes();

    function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                inform.print('Could not find album ' + track.album + ' by ' + track.artist);
            } else {
                track.itunesLink = album.storeUrl;
                inform.print(track.itunesLink);
                inform.print(track.albumUrl60);
                inform.print(track.albumUrl100);
                var token = '51513f78fd1448d3e722ccf3cd4d79d5af7ac710b4badea2f1bd0a685bd2b85e';
                var merchantId = '13508';
                var linkshare = new LinkShare(token,merchantId,track.itunesLink);
                linkshare.getLink(function(link) {
                    inform.print('LinkShare URL: ' + link);
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
        getStoreLink(tracks[i]);
    };

};

evenNewer();
//withLinkShare();
