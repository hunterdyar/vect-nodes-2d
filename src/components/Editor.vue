<template>
  <div>
    <div class="wrapper">
      <canvas id="c" ref="canvas"></canvas>
      <div class="node-editor" ref="nodeEditor"></div>
      <div class="dock" ref="dock"></div>
    </div>
  </div>
</template>

<script>
import { Socket, NodeEditor, Control, Engine } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import VueNumControl from './NumControl.vue';
import VuePosControl from './PosControl.vue';

import OutputComponent from "@/components/nodes/output";
import EllipseComponent from "@/components/nodes/ellipse.js";
import ColorizeComponent from "@/components/nodes/colorize";
import LineComponent from "@/components/nodes/line";
import PositionComponent from "@/components/nodes/position";
import NumComponent from "@/components/nodes/number";
import AddComponent from "@/components/nodes/add";

export var PositionSocket = new Socket('Position value');
export var PathSocket = new Socket('Shape value');
export var NumSocket = new Socket('Number value');
export var ctx;

export class NumControl extends Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
export class PosControl extends Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VuePosControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

export default {
  data() {
    return {
      editor: null
    };
  },
  async mounted() {
    var canvas = this.$refs.canvas;
    ctx = canvas.getContext('2d',{willReadFrequently: true});
    // c.width = window.innerWidth; c.height = window.innerHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // var pathSocket = new Socket('Path value');


    var container = this.$refs.nodeEditor;
    var components = [new NumComponent(), new AddComponent(), new EllipseComponent(), new OutputComponent(), new ColorizeComponent(), new LineComponent(), new PositionComponent()];

    var editor = new NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin);//todo: this is broken
    editor.use(AreaPlugin);
    editor.use(DockPlugin, {
      container: document.querySelector('.dock'),
      itemClass: 'dock-item',
      plugins: [VueRenderPlugin], // render plugins
    });
    var engine = new Engine('demo@0.1.0');

    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    var ellipse = await components[2].createNode();
    var output = await components[3].createNode();
    var colorize = await components[4].createNode({color: 'teal'});


    output.position = [450,400];
    ellipse.position = [-50, 200];
    colorize.position = [200,300];
    // editor.addNode(n1);
    // editor.addNode(n2);
    // editor.addNode(add);
    editor.addNode(ellipse);
    editor.addNode(output);
    editor.addNode(colorize);

    editor.connect(ellipse.outputs.get('shape'),colorize.inputs.get('shape'));
    editor.connect(colorize.outputs.get('shape'), output.inputs.get('shape'));


    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      console.log('process');
        await engine.abort();
        //todo start on output node.
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
  }
};
</script>

<style>
.node-editor {
  text-align: left;
  height: 70vh;
  width: 100vw;
}

.node .control input, .node .input-control input {
  width: 140px;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}

.dock {
  height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.dock-item {
  display: inline-block;
  vertical-align: top;
  transform: scale(0.8);
  transform-origin: 50% 0;
}
.socket.shape-value {
  background: #B5D6B2
}
.socket.position-value {
  background: #FFEFBD
}
.socket.number-value {
  background: #5A464C
}
</style>
