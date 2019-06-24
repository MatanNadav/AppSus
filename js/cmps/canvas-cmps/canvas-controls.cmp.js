'use strict';

export default {
    template: `
     <section @mouseup="mouseUpControls" class="canvas-control flex space-between">
        <input @change="onChangeColor"   type="color" class="color-brush" v-model="PaintStatus.strokeColor" >
        <section class="flex">
        <button class="random-canvas-color-btn" @click="toggleRainbowMode">Random</button>
        <button class="psyco-canvas-color-btn" @click="togglePsychMode">:)</button>
    </section>
        <select class="canvas-shape-select" v-model="PaintStatus.currElement" name="shape" >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
        </select>
        <div class="canvas-delay-container">
            <input type="range" class="shape-delay" min="0" max="150" value="30"  
            v-model="PaintStatus.shapeDelay" />
            <span class="delay-show">{{PaintStatus.shapeDelay}}</span>
        </div>
    </section>

`,
    data() {
        return {
            PaintStatus: {
                currElement: 'square',
                isMouseDown: false,
                timeout: null,
                strokeColor: '#222831',
                shapeDelay: 30,
                isPsych: false,
                isRainbow: false
            },
        }
    },
    props: [],
    computed: {
    },
    methods: {
        toggleRainbowMode() {
            this.PaintStatus.isRainbow = !this.PaintStatus.isRainbow;
        },
        togglePsychMode() {
            this.PaintStatus.isPsych = !this.PaintStatus.isPsych;
        },
      
        onChangeColor() {
            this.PaintStatus.isRainbow = this.PaintStatus.isPsych = false;
        },
        mouseUpControls() {
            if (this.PaintStatus.isMouseDown || this.PaintStatus.timeout) this.PaintStatus.isMouseDown = false;
        },
        

    },
    mounted(){
      this.$emit('status-change',this.PaintStatus)
    },
    created() {
    }
}