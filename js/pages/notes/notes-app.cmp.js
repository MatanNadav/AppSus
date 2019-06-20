'use strict';
import { notesService } from '../../services/notes.service.js'

export default {
    template: `
    <section class="notes-app">

        <h1>Notes app</h1>
        <!-- <notes-filter @set-filter="setFilter"></notes-filter> -->

        <notes-list> </notes-list>

    </section>
        `,

    data() {
        return {
            notes: null,
        }
    },

    props: [],
    computed: {

    },

    methods: {

    },

    created() {
        this.notes = notesService.query()
        console.log(this.notes);
        
    },

    components: {

    }

}