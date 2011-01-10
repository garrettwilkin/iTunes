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

iResults.prototype.clean = function (data) {
    var garbage = '';
    var sliced = data.split('\n');
    var length = sliced.length;
    pretty.print('Data has ' + length + ' rows.');
    pretty.print(sliced.toString());
    garbage = sliced.shift();
    garbage = sliced.shift();
    garbage = sliced.shift();
    garbage = sliced.pop();
    garbage = sliced.pop();
    garbage = sliced.pop();
    length = sliced.length;
    pretty.print('Data has ' + length + ' rows.');
    pretty.print(sliced.toString());
    return sliced.toString();
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
    this.obj = JSON.parse(this.glob);
    this.dataArray = this.obj.results;
    pretty.print('iResults.parse JSON: ' + JSON.stringify(this.dataArray));
};
