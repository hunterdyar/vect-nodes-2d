import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket} from "@/components/Editor";

class ColorizeComponent extends Component {
    constructor(){
        super("Colorize");
    }

    builder(node) {
        var inp1 = new Input('shape',"Path", PathSocket);
        var out = new Output('shape', "Colorized", PathSocket);

        // inp1.addControl(new NumControl(this.editor, 'num'))

        return node
            .addInput(inp1)
            // .addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        // var path = inputs['inPath'][0];
        // g.colorize(path,'lavenderblush','black',0);
        // g.colorize(path,'lavenderblush','black',0);
        var path = g.colorize(inputs['shape'][0], node.data.color);
        // this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['shape'] = path;
    }
}
export default ColorizeComponent;

//make a color picker vue component. use vue-color?