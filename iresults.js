/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

var Divider = require('./divider.js').Divider;
var total = 0;
var complete = 0;


function iResults() {
    this.glob = '';
    this.numGlobs = 0;
    this.inform = new Divider('iResults');
    this.inform.print('New Result Set');
    total++;
};
exports.iResults = iResults;


iResults.prototype.stats = function () {
   this.inform.print('Completed result sets: ' + complete + '/' + total);
};

iResults.prototype.capture = function (data) {
    this.numGlobs++;
    this.glob += data;
};

iResults.prototype.parse = function () {
    var self = this;
    complete++;
    self.stats();
    try
    {
        self.obj = JSON.parse(self.glob);
        self.dataArray = self.obj.results;
        self.inform.print('iResults.parse JSON: ' + JSON.stringify(this.dataArray));
    }
    catch (err)
    {
        self.inform.print('iResults.parse: error while parsing JSON \n' + self.glob);
    }
};

iResults.prototype.getAlbum = function() {
    //var albumInfo = {album: "Siamese Dream", artist: "Smashing Pumpkins",  storeUrl: "http://itunes.apple.com/store/location/pumpkins"};
    var albumInfo = new Object();
    var link = '';
    if (this.obj.wrapperType == 'collection' && this.obj.collectionType == 'Album') {
        albumInfo.storeUrl = this.obj.collectionViewUrl;
        albumInfo.amgArtistId = this.obj.amgArtistId;
        albumInfo.itunesArtistId = this.obj.artistId;
        albumInfo.name = this.obj.collectionName;
    } else {
        this.inform.print('We did not parse an album set');
    }
    return albumInfo
};
