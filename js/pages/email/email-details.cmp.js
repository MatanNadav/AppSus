'use strict';

import { emailService } from "../../services/email.service.js";

export default {
    template: `
      <section v-if="emailData">
          <h1>{{emailData.subject}}</h1>
          <h6>from : {{emailData.firstName}} {{emailData.lastName}} {{emailData.email}} {{emailData.date}} {{emailData.time}}</h6>
          <p>{{emailData.body}}</p>
      </section>
    `,

    data() {
        return {
        emailData : null,
        }
    },

    props:[],
    computed: {

    },

    methods: {
        getEmailData(){
            console.log(this.$route.params);
            emailService.getById(this.$route.params.emailId)
            .then(email =>this.emailData = email)
        }

    },
    watch:{
          $route(to){
              this.getEmailData();

          }
    },
    created() {
        this.getEmailData();
    }
}