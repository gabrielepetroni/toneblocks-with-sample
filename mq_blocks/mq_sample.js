Blockly.Blocks['mq_sample'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sample");
        this.appendDummyInput()
            .appendField("sample")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "sample");
        this.appendValueInput('pitch')
            .setCheck('Number')
            .appendField("pitch");
        this.appendValueInput("playback")
            .setCheck('Number')
            .appendField("playback")
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setStyle("music_blocks");
    },

    generateOptions: function() {
        var options = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            options.push([key, localStorage.getItem(key)])
        }
        return options
    }
}

Blockly.JavaScript['mq_sample'] = function(block) {
    const soundfile = block.getFieldValue('sample');
    const valuePitch = (Blockly.JavaScript.valueToCode(block, 'pitch', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1);
    const valuePlayback = (Blockly.JavaScript.valueToCode(block, 'playback', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1);
    var soundfileName

    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(value == soundfile){
            soundfileName = key
        }
    }

    const code = `${soundfileName}: "${soundfile}",\n`;

    var dict = {
        pitch: valuePitch,
        playback: valuePlayback,
    }

    sessionStorage.setItem(soundfileName, JSON.stringify(dict));

    // multiPlayer.add(${soundfileName}, "${soundfile}");

    return code;
}