'use strict';
import { notesService } from '../../services/notes.service.js';
import notesList from '../../cmps/notes-cmps/notes-list.cmp.js'

export default {
    template: `
    <section class="notes-app">

        <h1>Notes app</h1>
        <!-- <notes-filter @set-filter="setFilter"></notes-filter> -->

        <notes-list :notes="notes"> </notes-list>

    </section>
        `,

    data() {
        return {
            notes: null,
            filter: null,
        }
    },

    props: [],
    computed: {
        notesToShow() {
            if (!this.filter) return this.books;
            var filtered =  this.books.filter(book => book.title.includes(this.filter.txt))
            return filtered            
        },
    },

    methods: {

    },

    created() {
        // console.log('inside created notes app');
        
        this.notes = notesService.query().then(res => {
            return res;
        })
        

    },

    components: {
        notesList
    }

}