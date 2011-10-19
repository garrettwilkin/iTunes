/*
 * 
 * Simple stopwatch like class.  I noticed that the requests seemed to lag.
 * Now I can easily monitor how much they are lagging without clouding up
 * my code.
 *
 * 'inform' lines can be uncommented for timing debugging purposes. 
 * 
 */

var Divider = require('./divider').Divider;

function Timer(name) {
    this.date = new Date();
    this.bigBang = this.date.getTime();
    this.lastTime = 0;
    this.name = name;
//    this.inform = new Divider('Timer');
};
exports.Timer = Timer;

Timer.prototype.set = function() {
    var now = new Date();
    this.lastTime = now.getTime();
}

Timer.prototype.elapsed = function( phase ) {
    var millsPerSecond = 1000;
    var now = new Date();
    var nowMills = now.getTime();
    var elapsedMills = nowMills - this.lastTime;
    var elapsedSeconds = elapsedMills / millsPerSecond;
 //   this.inform.print(this.name +  ' - ' + phase + ' elapsed : ' + elapsedSeconds);
    return elapsedSeconds;
};
