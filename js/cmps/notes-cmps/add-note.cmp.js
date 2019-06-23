
'use strict';
import eventBus from '../../event-bus.js';

export default {
    template: `
    <section class="add-note-container">
            <input class="add-title-input" type="text" placeholder="Title..." v-model="newNote.title" />
            <img class="note-img add" src="" alt="">
            <input class="add-note-input input" type="text" placeholder="Enter text" v-model="newNote.text" autofocus />
            <label id="add-img-label">📁
                <input class="add-img-input" type="file" ref="myImage"  @change="getFile">
            </label>
            <button class="submit-note" @click="submitNote" >Save</button>
    </section>
    `,

    data() {
        return {
            newNote: {
                title: '',
                text: '',
                img: []
            },
        }
    },

    props:[],
    computed: {

    },

    methods: {
        getFile() {

            if(this.$refs.myImage.files[0]) {
                this.newNote.img = this.$refs.myImage.files[0];

                let file = this.newNote.img
                let reader  = new FileReader();
                reader.onload = function(ev)  {
                    var image = document.querySelector('.add-note-container img');
                    image.src = ev.target.result;
                 }
                reader.readAsDataURL(file);
            }

        },
        submitNote() {
           this.$emit('add-note',this.newNote)

        }
    },

    created() {
       
    },
    destroyed() {
        
        
  }
}