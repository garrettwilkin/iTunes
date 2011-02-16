/*
 * 
 * Silly class for making debugging output easier on the eyes.
 * 
 */
require.paths.unshift(require('path').join(__dirname));

var winston = require('winston');

function Divider(label) {
   this.bar = '========================';
   this.label = label;
};
exports.Divider = Divider;

Divider.prototype.print = function (message) {
    //New shiny winston logging.
    var phrase = this.label + ' : ' + message + '\n';
    winston.info(phrase);
    /*
     * Old Smelly Console logging.
    console.log(this.bar);
    console.log(this.label + " : " + message);
    console.log(this.bar);
     */
};

Divider.prototype.spacer = function (lines) {
    var i = 0;
    while (lines > i) {
        --lines;
        console.log(' ');
    };
};

