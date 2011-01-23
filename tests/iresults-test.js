require.paths.unshift(require('path').join(__dirname, '..'));

var vows = require('vows');
    assert = require('assert');
    iTunes = require('itunes').iTunes;


var suite = vows.describe('iresults')
    .addBatch({})
    .export(module);
