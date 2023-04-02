Blockly.Blocks['mq_sample'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sample");
        this.appendDummyInput()
            .appendField("sample")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "sample");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setStyle("music_blocks");
    },

    generateOptions: function() {
        var options = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
            options.push([key, sessionStorage.getItem(key)])
        }
        return options
    }


}

Blockly.JavaScript['mq_sample'] = function(block) {
    const soundfile = block.getFieldValue('sample');

    const code = `new Audio("${soundfile}").play();\n`;

    return code;
}