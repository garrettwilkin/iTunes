require.paths.unshift(require('path').join(__dirname, '..','../util'));

var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('itunes').iTunes;
    Album = require('album').Album;
    Track = require('track').Track;
    Artist = require('artist').Artist;


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
        'lookupTrack Object': {                     //Sub-Context
        //Check to see that the asynchronous lookupTrack function returns an object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins', track:'I Am One'},this.callback)
            },
            'Returns Object': function(err,track) { //Vow
                assert.isObject(track);
            }
        },
        'lookupTrack Track': {                      //Sub-Context
        //Check to see that the asynchronous lookupTrack function returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins', track:'I Am One'},this.callback)
            },
            'Returns Track': function(err,track) { //Vow
                assert.instanceOf(track,Track);
            }
        },
        'lookupArtist Object': {                     //Sub-Context
        //Check to see that the asynchronous lookupArtist function returns an object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},this.callback)
            },
            'Returns Object': function(err,artist) { //Vow
                assert.isObject(artist);
            }
        },
        'lookupArtist Artist': {                      //Sub-Context
        //Check to see that the asynchronous lookupArtist function returns an instance of the Artist  object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},this.callback)
            },
            'Returns Artist': function(err,artist) { //Vow
                assert.instanceOf(artist,Artist);
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
