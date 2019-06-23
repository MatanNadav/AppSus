
'use strict';
// import eventBus from '../../event-bus.js';

export default {
    template: `
    <section class="add-note-container">
            <input class="add-title-input" type="text" placeholder="Title..." v-model="newNote.title" />
            <img class="note-img add" :src="newNote.img" alt="">
            <input class="add-note-input input" type="text" placeholder="Enter text" v-model="newNote.text" autofocus />
            <label id="add-img-label">📁
                <input class="add-img-input" type="file" ref="myImage" @change="getImageUrl">
            </label>
            <button class="submit-note" @click="submitNote" >Save</button>
    </section>
    `,

    data() {
        return {
            newNote: {
                title: '',
                text: '',
                img: null
            },
        }
    },

    props:[],
    computed: {
    
    },

    methods: {
        getImageUrl() {            
            let imageFile = this.$refs.myImage.files;

            let url = ( function makeUrl(image) {  
                let [picture] = image
                return URL.createObjectURL(picture)
            })(imageFile)

            this.newNote.img = url
            
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