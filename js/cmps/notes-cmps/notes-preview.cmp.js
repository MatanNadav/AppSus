'use strict';

export default {
    template: `
    <div class = "note-preview">
            <p>{{note.text}}</p>
            <!-- <img :src="note.img" /> -->
        <div class="note-command">
            <input class="color-input" type="color"> 
        </div>
    </div>
    `,

    data() {
        return {

        }
    },

    props: ['note'],
    computed: {

    },

    methods: {
        emitNote() {
            this.$emit('show-note', this.note)
        }
    },

    created() {
    }
}