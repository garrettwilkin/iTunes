/*
 * 
 * Abstraction layer for logging.
 * My own wrapper class so that I can change logging packages if need be without changing all my debugging statements.
 * Currently using winston logging package.
 */
require.paths.unshift(require('path').join(__dirname));

var winston = require('winston');

function Divider(label) {
   this.label = label;
};
exports.Divider = Divider;

Divider.prototype.print = function (message) {
    var phrase = this.label + ' : ' + message + '\n';
    winston.info(phrase);
};
