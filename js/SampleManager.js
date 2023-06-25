
const SampleManager = {
    multiPlayer : new Tone.Players({}).toDestination(),
    // Workaround to avoid adding the same player multiple times
    samplesHistory: [],
    samples: [],
    interval: "1s",

    addPlayers: function(samplesDict){
        this.samples = []
        for(var key in samplesDict){
            var dict = JSON.parse(sessionStorage.getItem(key));
            if(!this.samplesHistory.includes(key)){
                this.samplesHistory.push(key);
                this.multiPlayer.add(key, samplesDict[key]);
                this.samples.push(key);
                this.multiPlayer.player(key).disconnect();
                if(dict.effect != "none"){
                    this.multiPlayer.player(key).connect(this.getEffect(dict.effect));
                } else {
                    this.multiPlayer.player(key).toDestination();
                }      
            }  else {
                this.samples.push(key);    
                this.multiPlayer.player(key).disconnect();        
                if(dict.effect != "none"){
                    this.multiPlayer.player(key).connect(this.getEffect(dict.effect));
                } else {
                    this.multiPlayer.player(key).toDestination();
                }
            }
        }
        console.log(this.samples);
    },

    getSamples: function(){
        return this.samples;
    },

    setInterval: function(toSetInterval){
        Tone.Transport.loopEnd = toSetInterval;
    },

    removePlayer: function(playerName){
        const index = this.samples.indexOf(playerName);
        if (index > -1) {this.samples.splice(index, 1);}
    },

    resetPlayers: function() {
        this.multiPlayer = new Tone.Players({}).toDestination();
        this.samplesHistory = [];
        this.samples = [];
    },

    stopEverything: function(){
        this.multiPlayer.stopAll();
        this.multiPlayer.disconnect();
    },

    getEffect: function(effectName){
        if(effectName == "reverb"){
            reverb = new Tone.JCReverb({
                roomSize: 0.8, // Adjust the room size property 
                wet: 0.5 // Adjust the wet property
              }).toDestination();
            return reverb;
        }
        if(effectName == "delay"){
            delay = new Tone.PingPongDelay(0.5, 0.1)  
            .toDestination();
            return delay;
        }
        if(effectName == "distortion"){
            const distortion = new Tone.Distortion({
                distortion: 0.8, // Adjust the amount of distortion here
                oversample: '4x' // Set the oversampling for higher quality (optional)
              }).toDestination();
            return distortion;
        }
    },

    playSample: function(playerName){
        try{
            var dict = JSON.parse(sessionStorage.getItem(playerName));
            this.multiPlayer.player(playerName).playbackRate = dict.playback; // Set the playback rate
            this.multiPlayer.player(playerName).start(this.interval); // Set the start time (0 + interval)
        } catch (err) {
            console.log(err);
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