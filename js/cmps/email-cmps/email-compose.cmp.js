'use strict';

export default {
    template: `
    <section @submit.prevent="sendEmail" class="email-compose">
    <form action="">
    <input type="text" placeholder="subject" v-model="newEmail.sbuject">
    <input type="email" placeholder="To" v-model="newEmail.email">
    <textarea name="" v-model="newEmail.body" cols="100" rows="40" placeholder="Email body"></textarea>
    <button >Send</button>
    </form>
    </section>
`,
    data() {
        return {
            newEmail: {
                id: 1,
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
            console.log(this.newEmail)
        }
    },
    created() {
    }
}