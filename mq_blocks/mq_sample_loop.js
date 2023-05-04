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
    const interval = (Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1)*1000;
    const samplesCode = Blockly.JavaScript.statementToCode(block, 'samples')
    if(samplesCode){
        console.log(samplesCode)
    }

    const code = `const multiPlayer = new Tone.Players({
        `+samplesCode+`
    }).toDestination();
    multiPlayer._players.forEach(player => player.play())
    console.log(multiPlayer._buffers)
    \n`;
    return code;
};