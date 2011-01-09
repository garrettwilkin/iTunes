/*
 * 
 * Silly class for making debugging output easier on the eyes.
 * 
 */
var sys = require('sys');
var sys = require('util');
var sys = require('path');

function Divider() {
   this.bar = '========================';
};
sys.inherits(Divider);
exports.Divider = Divider;

Divider.prototype.print = function (section) {
    console.log(this.bar);
    console.log(section);
    console.log(this.bar);
};

Divider.prototype.spacer = function (lines) {
    var i = 0;
    while (lines > i) {
        --lines;
        console.log(' ');
    };
};

