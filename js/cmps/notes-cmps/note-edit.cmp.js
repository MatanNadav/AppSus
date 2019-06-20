'use strict';

export default {
    template: `
    <div class="screen" >
        <section class="note-modal">
            <h1>note modal</h1>
        </section>
    </div>   
    `,

    data() {
        return {

        }
    },

    props: ['selectedNote'],
    computed: {

    },

    methods: {

    },

    created() {
        console.log('inside edit', this.selectedNote);

    }
}