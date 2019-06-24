'use strict';

import { emailService } from "../services/email.service.js";
import { notesService } from "../services/notes.service.js";
import emailPreview from "../cmps/email-cmps/email-preview.cmp.js"
import notePreview from "../cmps/notes-cmps/notes-preview.cmp.js"

export default {
    template: `
    <section>
        <div class="homepage-letters-container">
            <span class="letter" data-letter="A">A</span>
            <span class="letter" data-letter="p">p</span>
            <span class="letter" data-letter="p">p</span>
            <span class="letter" data-letter="s">s</span>
            <span class="letter" data-letter="u">u</span>
            <span class="letter" data-letter="s">s</span>
        </div>
        <section class="home-preview-container preview-container">
<email-preview @click.native="goToMail" v-if="email" :email="email"></email-preview>
<note-preview @click.native="goToNotes"v-if="note" :note="note"></note-preview>
        </section>

    </section>
        `,

    data() {
        return {
          email:null,
          note:null,
        }
    },

    props: [],
    computed: {

    },
    components:{
      emailPreview,
      notePreview
    },

    methods: {
        goToMail(){
            this.$router.push('/email')
        },
        goToNotes(){
            this.$router.push('/notes')
        }

    },

    created() {
       emailService.getLatest().then(email => this.email = email)
       notesService.getLatest().then(note => this.note = note)
    }
}