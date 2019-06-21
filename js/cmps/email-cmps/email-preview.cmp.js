'use strict';

import { emailService } from "../../services/email.service.js";

export default {
    template: `
    <section class="email-preview" @click="goToEmailDetails">
      <button @click.stop="onEmailDelete">x</button>  <p>{{email.subject}}<span>{{email.date}} {{email.time}}</span></p>
    </section>
    `,

    data() {
        return {

        }
    },

    props:['email'],
    computed: {

    },

    methods: {
    goToEmailDetails(){
        let emailUrl = `/email/${this.email.id}`
       this.$router.push(emailUrl);
    },
    onEmailDelete(){
        emailService.remove(this.email.id)
    }
    },

    created() {

    }
}