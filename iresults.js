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
 prints debugging statements but will not return an error, forcing the programmer to check for 'undefined' in other places.
 */

iResults.prototype.parse = function () {
    var self = this;
    complete++;
    self.stats();
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
    }
    if (self.data == 'undefined') {
        self.inform.print('Parse error.  First element of results array is undefined');
    }
};

/*
 Simple object to hold Album information.  This is included just for ease of understanding getAlbum.
 */

function Album(storeUrl, amgArtistId, itunesArtistId, name) {
    this.storeUrl = storeUrl;
    this.amgArtistId = amgArtistId;
    this.itunesArtistId = itunesArtistId;
    this.name = name;
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getAlbum = function() {
    var album = '';
    if (this.data.wrapperType == 'collection' && this.data.collectionType == 'Album') {
        var album = new Album(this.data.collectionViewUrl, this.data.amgArtistId, this.data.artistId, this.data.collectionName);
    } else {
        this.inform.print('We did not parse an album set: ' + this.data.wrapperType + ' | ' + this.data.collectionType );
    }
    return album;
};
