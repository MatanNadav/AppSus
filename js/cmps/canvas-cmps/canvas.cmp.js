'use strict'

import canvasControls from "./canvas-controls.cmp.js";




export default {
    template: `
    <section style="background-color:white;">
     <canvas-controls @status-change="updateStatus"></canvas-controls>
        <section class="container">
            <canvas ref="canvas" class="canvas"  height="300" @mousedown="onCanvasClick"
            @mousemove="onCanvasHoverMovement" @mouseup="onCanvasRelease"
            ></canvas>
            
        </section>
    </section>

    `,
    data() {
        return {
            canvas: null,
            ctx: null,
            PaintStatus:null,

            shapeSize: null,

            prevPos: {
                x: null,
                y: null
            },
            canvasWidth: null,
        }
    },
    props: [],
    computed: {
    },
    methods: {
        onCanvasClick() {
            this.PaintStatus.isMouseDown = true;
        },

        onCanvasHoverMovement(ev) {
            if (this.PaintStatus.isMouseDown && ev.buttons == 1) {
                this.PaintStatus.isMouseDown = false;
                this.PaintStatus.timeout = setTimeout(this.onCanvasClick, this.PaintStatus.shapeDelay);
                this.ctx.save()
                const { offsetX, offsetY } = ev;
                if (this.prevPos.x) {
                    var diff = Math.abs(((this.prevPos.x - offsetX) + (this.prevPos.y - offsetY)) * 20)
                    this.shapeSize = (diff / 15);
                }

                this.prevPos.x = offsetX
                this.prevPos.y = offsetY
                switch (this.PaintStatus.currElement) {
                    case 'square':
                        this.drawRect(offsetX, offsetY);
                        break;
                    case 'circle':
                        this.drawCircle(offsetX, offsetY)
                        break;
                }
            }
            this.ctx.restore()
        },


        drawCircle(x, y) {
            if (!this.PaintStatus.isPsych) {
                this.ctx.beginPath();
            }
            this.ctx.moveTo(x + this.shapeSize, y);
            this.ctx.arc(x, y, this.shapeSize, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white'
            this.ctx.strokeStyle = (this.PaintStatus.isRainbow || this.PaintStatus.isPsych) ? this.getRandomColor() : this.PaintStatus.strokeColor
            this.ctx.stroke();
            if (!this.PaintStatus.isPsych) {
                this.ctx.closePath();
            }
        },

        onCanvasRelease() {
            clearTimeout(this.PaintStatus.timeout);
            this.PaintStatus.isMouseDown = false;
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
     



        drawRect(x, y) {
            if (!this.PaintStatus.isPsych) {
                this.ctx.beginPath();
            }
            this.ctx.rect(x, y, this.shapeSize, this.shapeSize)
            this.ctx.fillStyle = 'white'
            this.ctx.strokeStyle = (this.PaintStatus.isRainbow || this.PaintStatus.isPsych) ? this.getRandomColor() : this.PaintStatus.strokeColor;
            this.ctx.stroke()
            if (!this.PaintStatus.isPsych) {
                this.ctx.closePath();
            }
        },
        updateStatus(status){
            this.PaintStatus = status;
        }
 
        
    },
    mounted() {
        console.log(this.$refs)
        this.canvas = this.$refs.canvas,
            this.ctx = this.$refs.canvas.getContext('2d');
            this.ctx.canvas.width = window.innerWidth;
    },
    components:{
        canvasControls
    }
}

