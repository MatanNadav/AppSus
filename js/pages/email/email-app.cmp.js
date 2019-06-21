'use strict';
import emailList from '../../cmps/email-cmps/email-list.cmp.js'
import { emailService } from '../../services/email.service.js'
import emailFilter from '../../cmps/email-cmps/email-filter.cmp.js'
import emailNav from '../../cmps/email-cmps/email-nav.cmp.js'
import eventBus from '../../event-bus.js';

export default {
    template: `
        <section class="email-app">
            <email-filter @email-filter="setFilter"></email-filter>
            <section class="flex">
                <email-nav @page-select="changePage"></email-nav>
                <email-list v-if="emailsToShow" :emails="emailsToShow" ></email-list>
            </section>
        </section>
    `,

    data() {
        return {
            emailsToShow: null,
            selectedPage: 'inbox',
            pageNumber: 0,
            emailsPerPage: 25,
            filter: null
        }
    },

    props: [],
    name: 'emailApp',
    computed: {

    },

    methods: {
        setFilter(filter) {
            this.filter = filter;
            emailService.query(filter).then(emails => this.emails = emails);
        },
        changePage(selectedPage) {
            this.selectedPage = selectedPage;
            emailService.query(this.filter, selectedPage, this.emailsPerPage, this.pageNumber)
                .then(emails => this.emailsToShow = emails);
        }
    },
    components: {
        emailList,
        emailFilter,
        emailNav
    },

    created() {
        emailService.query(this.filter, this.selectedPage, this.emailsPerPage, this.pageNumber)
            .then(emails => this.emailsToShow = emails)
        eventBus.$on('delete-email', id => {
            emailService.remove(id)
            this.changePage(this.selectedPage)
        })
        eventBus.$on('toggle-read', emailService.toggleRead)

    }
}