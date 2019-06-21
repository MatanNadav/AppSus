'use strict';
import emailList from '../../cmps/email-cmps/email-list.cmp.js'
import { emailService } from '../../services/email.service.js'
import emailFilter from '../../cmps/email-cmps/email-filter.cmp.js'
import eventBus from '../../event-bus.js';

export default {
    template: `
        <section class="email-app">
            <email-filter @email-filter="setFilter"></email-filter>
            <email-list v-if="emails" :emails="emails" ></email-list>
        </section>
    `,

    data() {
        return {
            emails: null,
        }
    },

    props: [],
    name:'emailApp',
    computed: {

    },

    methods: {
        setFilter(filter) {
            emailService.query(filter).then(emails => this.emails = emails);
        }
    },
    components: {
        emailList,
        emailFilter
    },

    created() {
        emailService.query().then(emails => this.emails = emails)
        eventBus.$on('delete-email',emailService.remove)
        eventBus.$on('toggle-read',emailService.toggleRead)
        
    }
}