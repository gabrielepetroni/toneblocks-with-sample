Blockly.Blocks['mq_sample_loop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sample Loop");       
        this.appendValueInput('INTERVAL')
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
};

Blockly.JavaScript['mq_sample_loop'] = function(block) {
    eval(`var multiPlayer = new Tone.Players({}).toDestination()`)
    const interval = (Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1);
    const samplesCode = Blockly.JavaScript.statementToCode(block, 'samples')
    if(samplesCode){
        console.log(samplesCode)
    }

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

    function playSample(name, pitch) {
        try{
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
            },${interval}).start(0);
    });
    \n`;
    return code;
};

/** Tone.Transport.scheduleRepeat((time) => {
    playSample(loadedSamples.shift()) }, 
    ${interval});},${interval}); */      