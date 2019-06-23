'use strict';
import eventBus from '../../event-bus.js'
import editTodoNote from './add-todo-note.cmp.js'
export default {
    template: `
    <section class="edit-container">
        <section class="note-modal">
            <section  v-if="!selectedNote.type || selectedNote.type === 'text'" >
                    <input class="add-title-input" type="text" placeholder="Title" v-model="title"  />
                    <textarea class="update-note-text" v-model="selectedNote.text" cols="30" rows="10"></textarea>
                </section>
                <section class="note-modal"  v-if="selectedNote.type === 'todo'" >
                        <input class="add-title-input" type="text" placeholder="Title" v-model="title"  />
                <edit-todo-note :note="selectedNote"></edit-todo-note> 
            </section>
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
    components:{
        editTodoNote
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
        this.title = this.selectedNote.title;
        
    }
}