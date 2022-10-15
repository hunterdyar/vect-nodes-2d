import {Component, Input, Output} from "rete";
import {PositionSocket, NumSocket} from "@/components/Editor";
import {NumControl} from "@/components/Editor";

class PositionComponent extends Component {
    constructor(){
        super("Position");
    }

    builder(node) {
        var x = new Input('x',"X",NumSocket);
        var y = new Input('y',"Y",NumSocket);
        var out1 = new Output('pos', "Position", PositionSocket);

        x.addControl(new NumControl(this.editor, 'x'));
        y.addControl(new NumControl(this.editor, 'y'));

        return node.addOutput(out1).addInput(x).addInput(y);
    }

    worker(node, inputs, outputs) {
        var x1 = inputs['x'].length?inputs['x'][0]:node.data.x;
        var y1 = inputs['y'].length?inputs['y'][0]:node.data.y;
        //g.makePoint(?)
        outputs['pos'] = {x:x1,y:y1};
    }
}

export default PositionComponent;