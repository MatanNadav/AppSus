import canvasApp from '../cmps/canvas-cmps/canvas-main.cmp.js'


'use strict';
var msgInterval;
export default {
    template: `
    <section class="about-page-container">
        <h1 style="margin: 20px 20px;">{{txtAnimation}}</h1>
        <canvas-app></canvas-app>
    </section>
    `,

    data() {
        return {
            welcomeText: `Welcome to Yarin and Matan Appsus, an email and notes app. The project below is our first one together, featuring Canvas-fun`,
            txtAnimation: ''
        }
    },

    props: [],
    computed: {

    },
    components: {
        canvasApp
    },
    methods: {

    },

    created() {
        var textSplit = this.welcomeText.split(' ')
        var idx = 0;
        msgInterval = setInterval(()=>{
            if(idx === textSplit.length-1) clearInterval(msgInterval)
            this.txtAnimation += ' '+ textSplit[idx]
            idx++
        }, 300)
    }
}