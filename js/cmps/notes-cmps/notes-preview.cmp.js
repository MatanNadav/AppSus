'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
        <li class="note-container" @click="emitNote('show-note')" >
            <a class="note-link" :style="note.bgColor" :class="{important: note.isPinned}">
                <h4>{{note.title}}</h4>
                <p @click="printImageFile">{{textRender}}</p>
                <img class="note-img" :src="note.img" alt="" />
                <div class="note-command flex space-between" @click.stop=""> 
                    <label class="color-input" title="Color">
                        <input @change="changeColor" id="note-color-input" type="color"/>
                    </label>
                    <button class="pinned-note" @click = "tagNote" title="Important" :class="{important: note.isPinned}"></button>
                    <button class="share-note" title="Share"></button>
                    <button class="remvove-note" @click="emitNoteOnBus('remove-note')" title="Remove"></button>
                </div>
            </a>
        </li>

    `,

    data() {
        return {
            
        }
    },
    props: ['note'],

    computed: {
        textRender() {
            if (this.note.text.length > 25) return this.note.text.substring(0, 25) + '...'
            else return this.note.text
        },
    
    },

    methods: {
        printImageFile() {
            if(!this.note.img) return

            let image = this.$refs.previewImage

            let file = this.note.img
            let reader  = new FileReader();
            reader.onload = function(ev)  {
                console.log(image);
                image.src = ev.target.result;
             }
            reader.readAsDataURL(file);
        },

        changeColor(ev) {
            console.log('inside change color', this.note.bgColor);
            this.note.bgColor = "background-color:" + ev.target.value
            this.emitNoteOnBus('update-note')
            return this.note.bgColor
        },
        emitNote(identfier) {
            this.$emit(identfier, this.note)
        },
        emitNoteOnBus(identfier) {
            eventBus.$emit(identfier, this.note);
        },
        tagNote() {
            this.note.isPinned = !this.note.isPinned;
            this.emitNoteOnBus('pin-note', this.note)
        }
    },

    created() {
        
    }
}