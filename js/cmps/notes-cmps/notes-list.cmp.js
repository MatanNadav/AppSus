'use strict';
import notesPreview from './notes-preview.cmp.js';
import notesEdit from './note-edit.cmp.js';

export default {
    template: `
    <section class="list-container">
        <notes-preview @show-note="onSelectedNote" :key="notes.id" v-for="note in notes" :note="note" >
        </notes-preview>
        <notes-edit @close-modal="selectedNote=null" :selectedNote="selectedNote" v-if="selectedNote"></notes-edit>
    </section>
    `,

    data() {
        return {
            selectedNote: null
        }
    },

    props:['notes'],
    computed: {
      
    },

    methods: {
        onSelectedNote(note) {
            this.selectedNote = note;
        }
    },

    created() {
        
    },
    components: {
        notesPreview,
        notesEdit
    }
}