'use strict';

export default {
    template: `
    <div class = "note-preview flex wrap space-between" @click="emitNote">
            <p>{{textRender}}</p>
            <!-- <img :src="note.img" /> -->
            <div class="note-command flex space-between" @click.stop="">
                 <input class="color-input" type="color"><button class="btn">P</button><button class="btn">S</button>  <button class="remvove-note"></button>
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