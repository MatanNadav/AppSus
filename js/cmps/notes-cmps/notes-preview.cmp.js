'use strict';

export default {
    template: `
    <div class = "note-preview flex wrap space-between" @click="emitNote">
            <p>{{textRender}}</p>
            <!-- <img :src="note.img" /> -->
            <div class="note-command flex space-between" @click.stop="">
            <label class="color-input" for="note-color-input"></label> <input id="note-color-input" type="color"/> <button class="pinned-note"></button><button class="color">S</button>  <button class="remvove-note"></button>
            </div>            
    </div>
    `,

    data() {
        return {

        }
    },

    props: ['note'],
    computed: {
        textRender() {
            if (this.note.text.length > 50) return this.note.text.substring(0, 50) + '...'
            else return this.note.text
        }
    },

    methods: {
        emitNote() {
            this.$emit('show-note', this.note)
        }
    },

    created() {
    }
}