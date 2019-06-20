'use strict';

export default {
    template: `
    <section class="edit-container">
        <section class="note-modal">
            <h1>note modal</h1>
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