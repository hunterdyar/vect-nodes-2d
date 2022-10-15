import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket, PositionSocket} from "@/components/Editor";

class LineComponent extends Component
{
    constructor(){
        super("Line");
    }

    builder(node) {
        var start = new Input('start',"Start",PositionSocket);
        var end = new Input('end',"Start",PositionSocket);

        var out1 = new Output('path', "Path", PathSocket);
        return node.addOutput(out1)
            .addInput(start)
            .addInput(end);
    }

    worker(node, inputs, outputs) {
        if(inputs['start'].length && inputs['end'].length)
        {
            outputs['path'] = g.line(inputs['start'][0], inputs['end'][0]);//node.data.num;
        }
    }
}

export default LineComponent;