/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

var Divider = require('./divider.js').Divider;

//Track total and completed instances of the class for debugging purposes.
var total = 0;
var complete = 0;


function iResults() {
    this.glob = '';
    this.numGlobs = 0;
    this.data = '';
    this.rawJSON = '';
    this.inform = new Divider('iResults');
    this.inform.print('New Result Set');
    total++;
};
exports.iResults = iResults;

//Debugging function.
iResults.prototype.stats = function () {
   this.inform.print('Completed result sets: ' + complete + '/' + total);
};

//Builds the intermediary string of results returned by the iTunes web service in pieces.
iResults.prototype.capture = function (data) {
    this.numGlobs++;
    this.glob += data;
};

/*
 iTunes returns a JSON that contains two elements:
    a count of the results
    a single element array containing a JSON of the result set.
 This function sets the self.data to the actual itunes data set and returns 1 if parsing was successful, 0 otherwise.
 In this way, the function can be used in an if statement.
 e.g. if (self.parse) {
        //analyze & process the data
      } else {
        //raise a warning
      }
 */

iResults.prototype.parse = function () {
    var self = this;
    complete++;
    self.stats();
    var success = 1;
    try
    {
        self.rawJSON= JSON.parse(self.glob);
        self.data = self.rawJSON.results[0];
        self.hits= self.rawJSON.resultCount;
        self.inform.print('iResults.parse JSON: ' + JSON.stringify(this.data));
    }
    catch (err)
    {
        self.inform.print('iResults.parse: error while parsing JSON \n' + self.glob);
        success = 0;
    }
    if (self.data == 'undefined') {
        self.inform.print('Parse error.  First element of results array is undefined');
    }
    return success;
};

/*
 Simple object to hold Album information.  This is included just for ease of understanding getAlbum.
 */

function Album(storeUrl, amgArtistId, itunesArtistId, name, artworkUrl60, artworkUrl100) {
    this.storeUrl = storeUrl;
    this.amgArtistId = amgArtistId;
    this.itunesArtistId = itunesArtistId;
    this.artworkUrl60 = artworkUrl60;
    this.artworkUrl100 = artworkUrl100;
    this.itunesArtistId = itunesArtistId;
    this.name = name;
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getAlbum = function() {
    var album = '';
    if (this.data.wrapperType == 'collection' && this.data.collectionType == 'Album') {
        var album = new Album(this.data.collectionViewUrl,
                              this.data.amgArtistId, 
                              this.data.artistId, 
                              this.data.collectionName,
                              this.data.artworkUrl60,
                              this.data.artworkUrl100);
    } else {
        this.inform.print('We did not parse an album set: ' + this.data.wrapperType + ' | ' + this.data.collectionType );
    }
    return album;
};

/*
 * Example result JSON from album query
 *
{
	"wrapperType":"collection",
        "collectionType":"Album",
        "artistId":1971863,
        "collectionId":14319958,
        "amgArtistId":10,
        "amgVideoArtistId":null,
        "artistName":"Beastie Boys",
	"collectionName":"Paul's Boutique",
	"collectionCensoredName":"Paul's Boutique",
        "artistViewUrl":"http://itunes.apple.com/us/artist/beastie-boys/id1971863?uo=4",
        "collectionViewUrl":"http://itunes.apple.com/us/album/pauls-boutique/id14319958?uo=4",
        "artworkUrl60":"http://a1.phobos.apple.com/us/r1000/017/Features/42/3b/dc/dj.pktszsjv.60x60-50.jpg",
        "artworkUrl100":"http://a1.phobos.apple.com/us/r1000/017/Features/42/3b/dc/dj.pktszsjv.100x100-75.jpg",
        "collectionPrice":6.99,
        "collectionExplicitness":"explicit",
        "contentAdvisoryRating":"Explicit",
        "trackCount":15,
        "copyright":"1989 Capitol Records, Inc.. All rights reserved.",
        "country":"USA",
        "currency":"USD",
        "releaseDate":"1989-07-31T07:00:00Z",
        "primaryGenreName":"Hip Hop/Rap"
}
*
*/
