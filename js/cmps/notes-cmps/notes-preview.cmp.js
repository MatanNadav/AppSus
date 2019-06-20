'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
    <div  class = "note-preview flex wrap space-between" @click="emitNote('show-note')" :style="style">
            <p>{{textRender}}</p>
            <!-- <img :src="note.img" /> -->
            <div class="note-command flex space-between" @click.stop="">
            <label class="color-input" for="note-color-input" ></label> <input @change="changeColor" id="note-color-input" type="color"/> <button class="pinned-note"></button><button class="share-note"></button>  <button class="remvove-note" @click="emitNoteOnBus('remove-note')"></button>
            </div>            
    </div>
    `,

    data() {
        return {
            style: null
        }
    },

    props: ['note'],
    computed: {
        textRender() {
            if (this.note.text.length > 35) return this.note.text.substring(0, 35) + '...'
            else return this.note.text
        }
    },

    methods: {
        emitNote(identfier) {
            this.$emit(identfier, this.note)
        },
        emitNoteOnBus(identfier) {
            eventBus.$emit(identfier, this.note);
        },
        changeColor(ev) {
            console.log('inside change color',ev.target.value);
            
           return this.style = `background-color = "${ev.target.value}"` ;
            
        }
    },

    created() {
    }
}