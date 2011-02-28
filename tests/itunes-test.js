require.paths.unshift(require('path').join(__dirname, '..','../util'));

var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('itunes').iTunes;
    Album = require('album').Album;


var suite = vows.describe('itunes')
.addBatch({                                         //Batch
    'iTunes Object': {                              //Context
    //Make vows on the iTunes class
        'lookupAlbum Object': {                     //Sub-Context
        //Check to see that the asynchronous lookupAlbum function returns an object.
            topic : function () {                   //topic
                new iTunes().lookupAlbum({artist:'Smashing Pumpkins', album:'Gish'},this.callback)
            },
            'Returns Object': function(err,album) { //Vow
                assert.isObject(album);
            }
        },
        'lookupAlbum Album': {                      //Sub-Context
        //Check to see that the asynchronous lookupAlbum function returns an instance of the Album  object.
            topic : function () {                   //topic
                new iTunes().lookupAlbum({artist:'Smashing Pumpkins', album:'Gish'},this.callback)
            },
            'Returns Album': function(err,album) { //Vow
                assert.instanceOf(album,Album);
            }
        },
        'Basic Components': {
        //Assert that the getQuery method on the iTunes object returns a string 
            topic : new iTunes(),
            'getQuery returns String': function (topic) {
                assert.isString(topic.getQuery()); 
            }
        }
    }
})
.export(module);
