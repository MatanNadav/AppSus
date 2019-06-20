'use strict';
import notesPreview from './notes-preview.cmp.js';

export default {
    template: `
    <section class="list-container">
        <notes-preview :key="notes.id" v-for="note in notes" :note="note" >
        </notes-preview>
    </section>
    `,

    data() {
        return {

        }
    },

    props:['notes'],
    computed: {

    },

    methods: {

    },

    created() {
        console.log('created at notes-list', this.notes);
        
    },
    components: {
        notesPreview
    }
}