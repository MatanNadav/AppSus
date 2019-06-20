'use strict';

export default {
    template: `
        <section class="note-modal">
            <h1>note modal</h1>
        </section>
    `,

    data() {
        return {

        }
    },

    props:['selectedNote'],
    computed: {

    },

    methods: {

    },

    created() {
        console.log('inside edit',this.selectedNote);
        
    }
}