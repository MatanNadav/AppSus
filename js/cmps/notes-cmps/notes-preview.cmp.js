'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
        <li class="note-container" @click="emitNote('show-note')" >
            <a class="note-link" :style="note.bgColor" :class="{important: isImportant}">
                <h4>{{note.title}}</h4>
                <p>{{textRender}}</p>
                <img class="note-img" :src="note.img" alt="" v-if="isImg"/>
                <div class="note-command flex space-between" @click.stop=""> 
                    <label class="color-input" title="Color">
                        <input @change="changeColor" id="note-color-input" type="color"/>
                    </label>
                    <button class="pinned-note" @click = "tagNote"title="Important"></button>
                    <button class="share-note" title="Share"></button>
                    <button class="remvove-note" @click="emitNoteOnBus('remove-note')" title="Remove"></button>
                </div>
            </a>
        </li>

    `,

    data() {
        return {
           isImportant: false,
           isImg: true
        }
    },
    props: ['note'],

    computed: {
        textRender() {
            if (this.note.text.length > 25) return this.note.text.substring(0, 25) + '...'
            else return this.note.text
        }
    },

    methods: {
        changeColor(ev) {
            console.log('inside change color',this.note.bgColor);
            this.note.bgColor = "background-color:"+ev.target.value
            this.emitNoteOnBus('update-note')
            return this.note.bgColor
        },
        pinNote() {
            // this.emitNoteOnBus('pin-note')
        },
        emitNote(identfier) {
            this.$emit(identfier, this.note)
        },
        emitNoteOnBus(identfier) {
            eventBus.$emit(identfier, this.note);
        },
        tagNote() {
            this.isImportant = !this.isImportant;
        }
    },

    created() {

    }
}