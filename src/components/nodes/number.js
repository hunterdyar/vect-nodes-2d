import {Component, Output} from "rete";
import {NumControl, NumSocket} from "@/components/Editor";

class NumComponent extends Component {

    constructor(){
        super("Number");
    }

    builder(node) {
        var out1 = new Output('num', "Number", NumSocket);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

export default NumComponent;