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
var LinkShare = require('./linkshare').LinkShare;

/*
 * Demo
 */

inform = new Divider('Demo');
inform.print('iTunes API Implementation in node.js');

/*
 This is now out of date and no longer works.  MetaMedia needs to be rewritten to use the changed iTunes class.
 */
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

/*
 Original theoretical code design:
 ---------------------------------
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

var itunesClient = new iTunes('garrett-the-tunes-broker-1234');

/*
 Actual implemented code design:
 ------------------------------
*/

function getStoreLink(track) {
    itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
        if (error) {
            pretty.print('there was an error');
        } else {
            track.itunesLink = album.storeUrl;
            inform.print(track.itunesLink);
        }
    });
}

/*
 Example of reusing the iTunes object twice 
 (pssst... its used in the getStoreLink function).
 */
 
function newer() {

    var qwantzTrack = new Track('Smashing Pumpkins','Siamese Dream');
    getStoreLink(qwantzTrack);

    var qwantzTrack = new Track('Miles Davis','Kind of Blue');
    getStoreLink(qwantzTrack);

    inform.print('Result of new design: ' + qwantzTrack.itunesLink);
}

/*
 Example of reusing the iTunes object four times, slightly differently.
 (pssst... its used in the getStoreLink function).
*/

function evenNewer() {

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

    function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                pretty.print('there was an error');
            } else {
                track.itunesLink = album.storeUrl;
                inform.print(track.itunesLink);
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

withLinkShare();
