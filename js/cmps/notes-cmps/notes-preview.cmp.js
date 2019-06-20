'use strict';

export default {
    template: `
        <div  class = "note-preview" @click="emitNote">
            <h2>{{note.text}}</h2>
            <img :src="note.img" />

        </div>
    `,

    data() {
        return {

        }
    },

    props:['note'],
    computed: {

    },

    methods: {
        emitNote() {
            this.$emit('show-note', this.note)
        }
    },

    created() {
        console.log('created at notes-preview');
    }
}