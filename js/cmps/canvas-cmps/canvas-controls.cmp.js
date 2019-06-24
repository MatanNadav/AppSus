'use strict';

export default {
    template: `
     <section @mouseup="mouseUpControls" class="canvas-control flex space-between">
        <input   type="color" class="color-brush" v-model="PaintStatus.strokeColor" >
        <section class="flex">
        <button @click="toggleRainbowMode">Random colors</button>
        <button @click="togglePsychMode">:)</button>
    </section>
        <select v-model="PaintStatus.currElement" name="shape" class="shape" >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
        </select>
        <div class="delay-container">
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
                strokeColor: '#393e46',
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