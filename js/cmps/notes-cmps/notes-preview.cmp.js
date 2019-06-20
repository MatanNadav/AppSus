'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
    <div  class = "note-preview flex wrap space-between" @click="emitNote('show-note')" >
            <p>{{textRender}}</p>
            <!-- <img :src="note.img" /> -->
            <div class="note-command flex space-between" @click.stop="" >
            <label class="color-input">
                <input @change="changeColor" id="note-color-input" type="color"/>
            </label>
            <button class="pinned-note"></button>
            <button class="share-note"></button>
            <button class="remvove-note" @click="emitNoteOnBus('remove-note')"></button>
            </div>  
    </div>
    `,

    data() {
        return {
        
        }
    },

    props: ['note'],

    computed: {
        changeColor() {
            console.log('inside change color', this.note.bgColor);
            
            //  return this.note.bgColor = ev.target.value
        },
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
    },

    created() {
       
    }
}