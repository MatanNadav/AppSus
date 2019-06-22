'use strict';

import  utilService  from "../../services/util.service.js";
import { emailService } from "../../services/email.service.js";

export default {
    template: `
    <section @submit.prevent="sendEmail" class="email-compose">
    <form action="">
    <input type="text" placeholder="subject" v-model="newEmail.subject">
    <input type="email" placeholder="To" v-model="newEmail.email">
    <textarea name="" v-model="newEmail.body" cols="100" rows="40" placeholder="Email body"></textarea>
    <button >Send</button>
    </form>
    </section>
`,
    data() {
        return {
            newEmail: {
                id: '' ,
                firstName: '',
                lastName: '',
                email: '',
                date: '',
                time: '',
                lat: 0 ,
                lng: 0,
                subject: '',
                body: '',
                isRead: false,
                isStarred: false,
            }
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
    }
}