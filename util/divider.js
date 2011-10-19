/*
 * 
 * Abstraction layer for logging.
 */

function Divider(label) {
   this.label = label;
};
exports.Divider = Divider;

Divider.prototype.print = function (message) {
    var phrase = this.label + ' : ' + message + '\n';
    console.log(phrase);
};
