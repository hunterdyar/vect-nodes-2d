import {Component, Output} from "rete";
import g from "g.js";
import {PathSocket} from "@/components/Editor";

class EllipseComponent extends Component
{
    constructor(){
        super("Ellipse");
    }

    builder(node) {
        var out1 = new Output('shape', "Ellipse", PathSocket);
        return node.addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['shape'] = g.ellipse(0, 0, 100, 100);//node.data.num;
    }
}

export default EllipseComponent;