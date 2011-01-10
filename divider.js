/*
 * 
 * Silly class for making debugging output easier on the eyes.
 * 
 */

function Divider() {
   this.bar = '========================';
};
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

