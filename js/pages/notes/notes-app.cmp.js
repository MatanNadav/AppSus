'use strict';
import { notesService } from '../../services/notes.service.js';
import eventBus from '../../event-bus.js';
import notesList from '../../cmps/notes-cmps/notes-list.cmp.js';
import notesFilter from '../../cmps/notes-cmps/notes-filter.cmp.js';
import addNote from '../../cmps/notes-cmps/add-note.cmp.js'

export default {
    template: `
    <section class="notes-app">
        <div class="note-action-container flex space-around">
            <notes-filter @set-filter="setFilter"></notes-filter>
            <button @click="newNoteModal" class="add-note btn">+</button>
        </div> 
        <div class="add-note-screen" @click="noteModal = !noteModal" v-if="noteModal"></div>
        <add-note @add-note="addNote" v-if="noteModal"></add-note>
        <notes-list :notes="notesToShow"> </notes-list>
    </section>
        `,

    data() {
        return {
            notes: null,
            filter: null,
            noteModal: false
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
        },
        newNoteModal() {
            this.noteModal = !this.noteModal;
        },
        addNote(newNote) {
            notesService.createNewNote(newNote)
        },
    },

    created() { 
        notesService.query().then(res => {
            this.notes = res;
        }),
        eventBus.$on('remove-note', (note) => {
            notesService.remove(note.id)
            
        })

    },

    components: {
        notesList,
        notesFilter,
        addNote
    }

}
