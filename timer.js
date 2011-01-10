/*
 * 
 * Simple stopwatch like class.  I noticed that the requests seemed to lag.
 * Now I can easily monitor how much they are lagging without clouding up
 * my code.
 * 
 */

function Timer() {
    this.date = new Date();
    this.bigBang = this.date.getTime();
    this.lastTime = 0;
};
exports.Timer = Timer;

Timer.prototype.set = function() {
    var now = new Date();
    this.lastTime = now.getTime();
}

Timer.prototype.elapsed = function() {
    var millsPerSecond = 1000;
    var now = new Date();
    var nowMills = now.getTime();
    var elapsedMills = nowMills - this.lastTime;
    var elapsedSeconds = elapsedMills / millsPerSecond;
    pretty.print('Time elapsed: ' + elapsedSeconds);
    return elapsedSeconds;
};
