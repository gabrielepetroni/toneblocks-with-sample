Blockly.Blocks['mq_sample'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sample");
        this.appendDummyInput()
            .appendField("sample")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "sample");
        this.appendValueInput('PITCH')
            .setCheck('Number')
            .appendField("pitch")
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
    const pitch = block.getFieldValue('pitch');
    var soundfileName

    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(value == soundfile){
            soundfileName = key
        }
    }

    const code = `"${soundfileName}": "${soundfile}"\n`;

    // multiPlayer.add("${soundfileName}", "${soundfile}");

    return code;
}