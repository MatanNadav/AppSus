'use strict';

import  utilService  from "../../services/util.service.js";
import { emailService } from "../../services/email.service.js";

export default {
    template: `
    <section @submit.prevent="sendEmail" class="email-compose-container flex">
    <form class="email-compose-form-container"action="">
    <input class="email-subjet-input input" type="text" placeholder="subject" v-model="newEmail.subject">
    <input class="email-recipient-input input" type="email" placeholder="To" v-model="newEmail.emailAddress">
    <textarea class="email-body-input" name="" v-model="newEmail.body" cols="100" rows="40" placeholder="Email body"></textarea>
    <button class="email-send-btn btn" >Send</button>
    </form>
    </section>
`,
    data() {
        return {
            newEmail: {
                id: utilService.getRandomString(),
                firstName: '',
                lastName:'',
                emailAddress:'',
                subject:'',
                body: '',
                time:null,
                date: null,
                isStarred:false,
                isSent:true,
                isRead:false,
                isTrash:false
            },


        }
    },
    props: [],
    computed: {
    },
    methods: {
        sendEmail(){
            console.log(this.newEmail);
            let sentDate = new Date()
            this.newEmail.time = sentDate.toTimeString('he-IL');
            this.newEmail.date = sentDate.toLocaleDateString('he-IL');
            this.newEmail.id = utilService.getRandomString(6);
            emailService.add(this.newEmail);
            this.$router.push('/email')
        }
    },
    created() {
        console.log(this.$route)
        if(this.$route.query.id) emailService.getById(this.$route.query.id)
        .then(emailData => {
               console.log('data',emailData)
            this.newEmail.subject =`re:  ${emailData.subject}`;
            this.newEmail.emailAddress = emailData.emailAddress;
            this.newEmail.body =`



${emailData.body}
            `
        })
    }
}