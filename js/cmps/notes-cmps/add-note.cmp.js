
'use strict';

import addTodoNote from './add-todo-note.cmp.js'
// import eventBus from '../../event-bus.js';

export default {
    template: `
    <section class="add-note-container">
        <input class="add-title-input" type="text" placeholder="Title..." v-model="newNote.title" />
        <section v-if="noteType === 'text'">
            <img class="note-img add" :src="newNote.img" alt="">
            <input class="add-note-input input" type="text" placeholder="Enter text" v-model="newNote.text" autofocus />
            <input type="url" v-model="newNote.img" placeholder="Image url">
            <label id="add-img-label">📁
                <input class="add-img-input" type="file" ref="myImage" @change="getImageUrl">
            </label>
        </section>
        <add-todo-note @todos-changed="setTodos" v-if="noteType === 'todo'"></add-todo-note>

        
        <button class="submit-note" @click="submitNote" >Save</button>
     
            <input type="radio" name="note-type" value="text" v-model="noteType" >
            <input type="radio" name="note-type" value="todo" v-model="noteType" >
    </section>
    `,

    data() {
        return {
            noteType: 'text',
            newNote: {
                title: '',
                text: '',
                img: null,
                todos: []
            },
        }
    },

    props: [],
    computed: {

    },

    methods: {
        getImageUrl() {
            let imageFile = this.$refs.myImage.files;

            let url = (function makeUrl(image) {
                let [picture] = image
                return URL.createObjectURL(picture)
            })(imageFile)

            this.newNote.img = url

        },

        submitNote() {
            this.newNote.type = this.noteType;
            console.log('note addded',this.newNote)
            this.$emit('add-note', this.newNote)

        },
        setTodos(todos){
             this.newNote.todos = todos
        }
    },
    components: {
        addTodoNote
    },

    created() {

    },
    destroyed() {


    }
}