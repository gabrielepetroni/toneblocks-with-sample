
const SampleManager = {
    multiPlayer : new Tone.Players({}).toDestination(),
    // Workaround to avoid adding the same player multiple times
    samplesHistory: [],
    samples: [],
    interval: "1s",

    addPlayers: function(samplesDict){
        this.samples = []
        for(var key in samplesDict){
            if(!this.samplesHistory.includes(key)){
                this.samplesHistory.push(key);
                this.multiPlayer.add(key, samplesDict[key]);
                this.samples.push(key);
            }  else {
                this.samples.push(key);
            }
        }
        console.log(this.samples);
    },

    getSamples: function(){
        return this.samples;
    },

    setInterval: function(toSetInterval){
        this.interval = toSetInterval;
    },

    removePlayer: function(playerName){
        const index = this.samples.indexOf(playerName);
        if (index > -1) {this.samples.splice(index, 1);}
    },

    stopEverything: function(){
        this.multiPlayer.stopAll();
    },

    playSample: function(playerName){
        try{
            var dict = JSON.parse(sessionStorage.getItem(playerName));
            this.multiPlayer.player(playerName).playbackRate = dict.playback;
            this.multiPlayer.player(playerName).sync();           
            this.multiPlayer.player(playerName).start();
        } catch (err) {
            console.log(err)

        }
    },

    startLoop: function() {
        var queue = [];
        Tone.loaded().then(() => {
            var loop = new Tone.Loop((time) =>
                {   
                    loop.interval = this.interval;
                    if(!queue.length){
                        queue = this.samples.slice();
                    }
                    else {
                        this.playSample(queue.shift());
                    }
                              
                },this.interval).start(0);
        }); 
    }
}