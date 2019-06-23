'use strict';

import { emailService } from '../../services/email.service.js';
import eventBus from '../../event-bus.js'
export default {
    template: `
      <section v-if="emailData">
          <h1>{{emailData.subject}}</h1>
          <h6>{{emailDirection}} {{emailData.firstName}} {{emailData.lastName}} {{emailData.emailAddress}}
           At : {{emailData.date}} {{emailData.time}}</h6>
          <pre>{{emailData.body}}</pre>
          <button @click="moveToCompose">reply</button> <button @click="onEmailDelete">Delete</button>
      </section>
    `,

    data() {
        return {
            emailData: null,
        }
    },

    props: [],
    computed: {
        emailDirection(){
            return (this.emailData.isSent)? 'To' : 'From';
        },
        

    },

    methods: {
        getEmailData() {
            emailService.getById(this.$route.params.emailId)
                .then(email => {
                    this.emailData = email;
                    if (!email.isRead) emailService.toggleRead(this.$route.params.emailId);
                    console.log(this.emailData)
                })
        },
        moveToCompose() {
        this.$router.push(`/email/compose?id=${this.emailData.id}`);
        },
        onEmailDelete(){
         emailService.remove(this.emailData.id);
            this.$router.push('/email');
        },

    },
    watch: {
        $route(to) {
            this.getEmailData();

        }
    },
    created() {
        this.getEmailData();
    }
}