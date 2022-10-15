import {Component, Input, Output} from "rete";
import {PositionSocket, NumSocket,PosControl} from "@/components/Editor";
// import PosControl from "@/components/PosControl";
class PositionComponent extends Component {
    constructor(){
        super("Position");
    }

    builder(node) {
        var x = new Input('x',"X",NumSocket);
        var y = new Input('y',"Y",NumSocket);
        var out1 = new Output('pos', "Position", PositionSocket);
        return node.addControl(new PosControl(this.editor, 'pos')).addOutput(out1).addInput(x).addInput(y);
    }

    worker(node, inputs, outputs) {
        var x1 = inputs['x'].length?inputs['x'][0]:node.data.x;
        var y1 = inputs['y'].length?inputs['y'][0]:node.data.y;
        console.log("pos output",{x:x1,y:y1});
        outputs['pos'] = {x:x1,y:y1};
    }
}

export default PositionComponent;