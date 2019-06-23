'use strict';
import eventBus from '../../event-bus.js'

export default {
    template: `
    <section class="edit-container">
        <section class="note-modal">
            <input class="add-title-input" type="text" placeholder="Title" v-model="title"  />
          <textarea class="update-note-text" v-model="selectedNote.text" cols="30" rows="10"></textarea>
        </section>
        <div class="screen" @click="closeModal">
            </div>   
        </section>
    `,

    data() {
        return {
            title:''
        }
    },

    props: ['selectedNote'],
    
    computed: {

    },

    methods: {
      closeModal(){
          this.selectedNote.title = this.title
          eventBus.$emit('update-note',this.selectedNote)
          this.$emit('close-modal')
      }
    },

    created() {
        console.log('inside edit', this.selectedNote);
        
    }
}