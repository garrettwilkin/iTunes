/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

var Divider = require('./divider.js').Divider;
var pretty = new Divider();
var total = 0;
var complete = 0;


function iResults() {
    this.glob = '';
    this.numGlobs = 0;
    total++;
};
exports.iResults = iResults;


iResults.prototype.stats = function () {
   pretty.print('iResults.prototype.stats ' + complete + '/' + total);
};

iResults.prototype.capture = function (data) {
    this.numGlobs++;
    pretty.print('iResults.capture ' + this.numGlobs + ' : \n' + data);
    this.glob += data;
};

iResults.prototype.parse = function () {
    complete++;
    iResults.prototype.stats();
    pretty.print('iResults.parse : ' + this.glob);
    try
    {
        this.obj = JSON.parse(this.glob);
        this.dataArray = this.obj.results;
        pretty.print('iResults.parse JSON: ' + JSON.stringify(this.dataArray));
    }
    catch (err)
    {
        pretty.print('error while parsing JSON \n' + this.glob);
    }
};
