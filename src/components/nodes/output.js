import {Component, Input} from "rete";
import {PathSocket, ctx} from "@/components/Editor";

class OutputComponent extends Component {

    constructor(){
        super("Output");
    }

    builder(node) {
        var inp1 = new Input('shape',"Path",PathSocket,true);

        return node
            .addInput(inp1)
    }

    // eslint-disable-next-line no-unused-vars
    worker(node, inputs, outputs) {
        //Clear canvas
        clearCanvas(ctx.canvas);

        console.log("process output");
        if(inputs['shape'])
        {
            //loop through and draw all of the paths in order.
            //todo: some way to sort? Get incoming node y position?
            inputs['shape'].map(path => {
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