'use strict';
import { notesService } from '../../services/notes.service.js';
import notesList from '../../cmps/notes-cmps/notes-list.cmp.js'
import notesFilter from '../../cmps/notes-cmps/notes-filter.cmp.js'

export default {
    template: `
    <section class="notes-app">
        <h1>Notes app</h1>

        <notes-filter @set-filter="setFilter"></notes-filter>
        
        <notes-list :notes="notesToShow"> </notes-list>
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
            if (!this.filter) return this.notes;
            var filtered =  this.notes.filter(note => note.text.includes(this.filter.txt))
            return filtered            
        },
    },

    methods: {
        setFilter(filter) {
            this.filter = filter; 
        }
    },

    created() {
        
        notesService.query().then(res => {
            this.notes = res;
        })
        

    },

    components: {
        notesList,
        notesFilter
    }

}