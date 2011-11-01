var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('../itunes').iTunes;
    Album = require('../album').Album;
    Track = require('../track').Track;
    Artist = require('../artist').Artist;
    iError = require('../ierror').iError;

var api = {
    track: function (target) {
        return function () {
            new iTunes().lookupTrack({artist:target.artist,track:target.track}, this.callback);
        };
    }
};

function trackValidator(title){
    return function (error, track) {
            assert.isNull(error);
            assert.isNotNull(track);
            assert.isObject(track);
            assert.instanceOf(track,Track);
            assert.equal(title.toLowerCase(),
                         track.name.toLowerCase());
    }
};

var suite = vows.describe('itunes')
.addBatch({
    'iTunes Object': {
        'The Beatles - Let it be': {
            topic: api.track({artist:'The Beatles',track:'Let it be'}),
            'Let it Be': trackValidator('Let It Be')
        },
        'Smashing Pumpkins - I Am One': {
            topic: api.track({artist:'Smashing Pumpkins',
                              track:'I Am One'}),
            'I Am One': trackValidator('I Am One')
        },
        'The Eels - Dog Faced Boy': {
            topic: api.track({artist:'The Eels',
                              track:'The Dog Faced Boy'}),
            'Dog Faced Boy': trackValidator('Dog Faced Boy')
        },
        'Corinne Bailey Rae - Like A Star': {
            topic: api.track({artist:'Corinne Bailey Rae',
                              track:'Like A Star'}),
            'Like a Star': trackValidator('Like A Star')
        },
        'Basic Components': {
            topic : new iTunes(),
            'getQuery returns String': function (topic) {
                assert.isString(topic.getQuery()); 
            }
        }
    }
})
.export(module);
