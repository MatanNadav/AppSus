'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
        <li class="note-container" @click="emitNote('show-note')" :style="noteStyle" >
            <a class="note-link" href="#">
                <h2></h2>
                <p>{{textRender}}</p>
                <div class="note-command flex space-between" @click.stop=""> 
                    <label class="color-input">
                        <input @change="changeColor" id="note-color-input" type="color" value="#eeeeee"/>
                    </label>
                    <button class="pinned-note"></button>
                    <button class="share-note"></button>
                    <button class="remvove-note" @click="emitNoteOnBus('remove-note')"></button>
                </div>
            </a>
        </li>




    <!-- <div  class = "note-preview flex wrap space-between" @click="emitNote('show-note')" :style="noteStyle" >
            <p>{{textRender}}</p>
            <div class="note-command flex space-between" @click.stop="" >
            <label class="color-input">
                <input @change="changeColor" id="note-color-input" type="color" value="#eeeeee"/>
            </label>
            <button class="pinned-note"></button>
            <button class="share-note"></button>
            <button class="remvove-note" @click="emitNoteOnBus('remove-note')"></button>
            </div>  
    </div> -->
    `,

    data() {
        return {
            noteStyle: {
                backgroundColor: null,
            }
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
        changeColor(ev) {
            console.log('inside change color', this.noteStyle.backgroundColor);

            return this.noteStyle.backgroundColor = ev.target.value
        },
        emitNote(identfier) {
            this.$emit(identfier, this.note)
        },
        emitNoteOnBus(identfier) {
            eventBus.$emit(identfier, this.note);
        },
        changeColor(ev) {
            console.log('inside changing color', ev);
            this.noteStyle.backgroundColor = ev.target.value
        },
    },

    created() {

    }
}