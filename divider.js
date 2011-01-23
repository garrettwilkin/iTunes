/*
 * 
 * Silly class for making debugging output easier on the eyes.
 * 
 */
require.paths.unshift(require('path').join(__dirname));

function Divider(label) {
   this.bar = '========================';
   this.label = label;
};
exports.Divider = Divider;

Divider.prototype.print = function (message) {
    console.log(this.bar);
    console.log(this.label + " : " + message);
    console.log(this.bar);
};

Divider.prototype.spacer = function (lines) {
    var i = 0;
    while (lines > i) {
        --lines;
        console.log(' ');
    };
};

