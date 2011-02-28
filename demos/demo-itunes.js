/*
 * Author: Garrett Wilkin garrett.wilkin@gmail.com @garrettwilkin geethink.com/blog
 * Simple demonstration of the iTunes class. 
 */

require.paths.unshift(require('path').join(__dirname, '..','util'));

var Divider = require('divider').Divider;
var iTunes = require('itunes').iTunes;

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
 Example of reusing the iTunes object four times.
*/

function getAlbumStoreLinks() {
    var itunesClient = new iTunes();

    //Defining my callback function ahead of time
    function handleAlbum(error, album) {
        if (error) {
            inform.print('there was an error');
        } else {
            var itunesLink = album.storeUrl;
            inform.print('Retrieved this iTunes store link: ' + itunesLink);
        }
    }

    function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, handleAlbum);
    }

    var track1 = new Track('Miles Davis','Kind of Blue');
    var track2 = new Track('Smashing Pumpkins','Siamese Dream');
    var track3 = new Track('Aerosmith','Get a Grip');
    var lastTrack = new Track('Beastie Boys','Pauls Boutique');

    inform.print('About to fire off album requests!');
    var tracks = [track1,
                  track2,
                  track3,
                  lastTrack];
    for (i in tracks)
    {
        getStoreLink(tracks[i]);
    };
    inform.print('All album requests fired! Now we wait till the callbacks come home.');

};

getAlbumStoreLinks();
