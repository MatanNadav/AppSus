'use strict';

export default {
    template: `
    <section class="edit-container">
        <section class="note-modal">
            <p>{{selectedNote.text}}</p>
          <textarea class="edit-text" v-model="selectedNote.text" cols="30" rows="10"></textarea>
        </section>
        <div class="screen" @click="closeModal">
            </div>   
        </section>
    `,

    data() {
        return {

        }
    },

    props: ['selectedNote'],
    
    computed: {

    },

    methods: {
      closeModal(){
          this.$emit('close-modal')
      }
    },

    created() {
        console.log('inside edit', this.selectedNote);
        
    }
}