'use strict';
import emailList from '../../cmps/email-cmps/email-list.cmp.js'
import {emailService} from '../../services/email.service.js'
export default {
    template: `
        <section>
            <email-list v-if="emails" :emails="emails" ></email-list>
        </section>
    `,

    data() {
        return {
            emails : null ,
        }
    },
    
    props: [],
    computed: {
        
    },
    
    methods: {
        
    },
    components: {
        emailList
    },
    
    created() {
        emailService.query().then(emails => this.emails = emails)
        
    }
}