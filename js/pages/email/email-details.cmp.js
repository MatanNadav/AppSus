'use strict';

import { emailService } from '../../services/email.service.js';
import eventBus from '../../event-bus.js'
export default {
    template: `
      <section class="email-details-container flex" v-if="emailData">
        <div class="email-details-btn-container">
            <button class="email-details-reply btn" @click="moveToCompose">reply</button>
            <button class="email-details-delete btn" @click="onEmailDelete">Delete</button>
        </div>

          <h1 class="email-subject-header"><span class="email-details-subject">Subject:</span> {{emailData.subject}}</h1>

          <h4 class="email-info-header"><span class="email-details-direction">{{emailDirection}}</span>
          {{emailData.firstName}} {{emailData.lastName}} --  {{emailData.emailAddress}}
           <span class="email-details-date">{{emailData.date}} {{emailData.time}}</span></h4>
           
          <pre  class="email-body-parag">{{emailData.body}}</pre>
         
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
            return (this.emailData.isSent)? 'To:' : 'From:';
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