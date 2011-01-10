/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

function iResults() {
    this.dataString = '';
};
exports.iResults = iResults;

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

//    this.dataString = this.clean(data);
    this.dataString = data;
    this.obj = JSON.parse(this.dataString);
    this.dataArray = this.obj.results;
    pretty.print(JSON.stringify(this.dataArray));

};
