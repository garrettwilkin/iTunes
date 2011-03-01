/*
 * 
 * Abstraction layer for logging.
 */
require.paths.unshift(require('path').join(__dirname));

function Divider(label) {
   this.label = label;
};
exports.Divider = Divider;

Divider.prototype.print = function (message) {
    var phrase = this.label + ' : ' + message + '\n';
    console.log(phrase);
};
