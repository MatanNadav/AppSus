
'use strict';

import addTodoNote from './add-todo-note.cmp.js'

export default {
    template: `
    <section class="add-note-container">
        <input class="add-title-input" type="text" placeholder="Title..." v-model="newNote.title" />
        <section v-if="noteType === 'text'">
            <img class="note-img add" :src="newNote.img" alt="">
            <input class="add-note-input input" type="text" placeholder="Enter text" v-model="newNote.text" autofocus />
            <input class="add-note-image-url input" type="url" v-model="newNote.img" placeholder="Image url">
            <label id="add-img-label">📁
                <input class="add-img-input" type="file" ref="myImage" @change="getImageUrl">
            </label>
        </section>
        <add-todo-note @todos-changed="setTodos" v-if="noteType === 'todo'"></add-todo-note>
          <section v-if="noteType === 'video'">
            <input class="add-note-video-url input" type="url" placeholder="Video url" v-model="newNote.video"/>
          </section>
          <div class="add-note-btns-container">
              <input class="add-note-radio-btn" type="radio" name="note-type" value="text" v-model="noteType" >
              <input class="add-note-radio-btn" type="radio" name="note-type" value="todo" v-model="noteType" >
              <input class="add-note-radio-btn" type="radio" name="note-type" value="video" v-model="noteType" >
              <button class="submit-note" @click="submitNote" >Save</button>
        </div>
    </section>
    `,

    data() {
        return {
            noteType: 'text',
            newNote: {
                title: '',
                text: '',
                img: null,
                video: '',
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
            this.$emit('add-note', this.newNote)

        },
        setTodos(todos) {
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