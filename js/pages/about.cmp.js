import canvasApp from '../cmps/canvas-cmps/canvas-main.cmp.js'


'use strict';

export default {
    template: `
<canvas-app></canvas-app>
    `,

    data() {
        return {

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
        console.log('inside about');

    }
}