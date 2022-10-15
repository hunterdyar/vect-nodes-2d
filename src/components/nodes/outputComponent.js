import {Component, Input} from "rete";
import {PathSocket, ctx} from "@/components/Editor";

class OutputComponent extends Component {

    constructor(){
        super("Output");
    }

    builder(node) {
        var inp1 = new Input('path',"Path",PathSocket,true);

        return node
            .addInput(inp1)
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
        //Clear canvas
        clearCanvas(ctx.canvas);

        console.log("process output");
        if(inputs['path'])
        {
            //loop through and draw all of the paths in order.
            //todo: some way to sort? Get incoming node y position?
            inputs['path'].map(path => {
                path.draw(ctx);
            });

        }
    }
}

function clearCanvas(canvas)
{
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
export default OutputComponent;