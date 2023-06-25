Blockly.Blocks['mq_sample_loop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sample Loop");       
        this.appendValueInput('interval')
            .setCheck('Number')
            .appendField('interval');
        this.appendStatementInput('samples')
            .appendField('loop');
        this.setNextStatement(false);
        this.setPreviousStatement(false);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setStyle("music_blocks");
    },

    onchange: function(event) {
        try{
            const interval = (Blockly.JavaScript.valueToCode(this, 'interval', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1)
            const samples = Blockly.JavaScript.statementToCode(this, 'samples');
            const code = `const samplesDict = {
                `+samples+`
            }

            SampleManager.setInterval("${interval}");

            SampleManager.addPlayers(samplesDict);`  
           eval(code);
        } catch (err) {
            console.log(err)
        }
    }
};

Blockly.JavaScript['mq_sample_loop'] = function(block) {
    const interval = (Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1);
    const samplesCode = Blockly.JavaScript.statementToCode(block, 'samples');
    SampleManager.setInterval(String(interval)+"s");
    return code = `
    SampleManager.startLoop();

    run.addEventListener('click', () => {
        SampleManager.resetPlayers();
    });
    \n`;

    /** 

    const code = `const multiPlayer = new Tone.Players({
        `+samplesCode+`
    }).toDestination();

    function getLoadedSamples() {
        let list = []
        for (var i = 0; i < localStorage.length; i++){
            list.push(localStorage.key(i));
        }
        return list
    }

    function playSample(name) {
        try{
            var dict = JSON.parse(sessionStorage.getItem(name));
            multiPlayer.player(name).playbackRate = dict.playback;           
            multiPlayer.player(name).start();
        } catch (err) {}
    }

    Tone.loaded().then(() => {
        var loadedSamples = getLoadedSamples();
        var loop = new Tone.Loop(function(time)
            {   
                if(loadedSamples.length === 0){
                    loadedSamples = getLoadedSamples();
                }
                else {
                    playSample(loadedSamples.shift());
                }               
            },"${interval}s").start(0);
    });

    run.addEventListener('click', () => {
        multiPlayer.dispose();
    });
    \n`;
    return code;
    */
};
 
/** pitch_shift = new Tone.PitchShift({
                pitch: dict.pitch
                }).toDestination();
            multiPlayer.player(name).connect(pitch_shift); */