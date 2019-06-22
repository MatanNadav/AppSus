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
                <email-nav @page-select="setPageFilter"></email-nav>
                <email-list v-if="emailsToShow" :emails="emailsToShow" ></email-list>
            </section>
            <button v-if="pageNumber > 0" @click="movePage(-1)"><</button> 
            <button @click="moveToComposePage">Send Email</button>
            <button v-if="emailsToShow && emailsToShow.length === 25" @click="movePage(1)">></button>
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
            // emailService.query(filter).then(emails => this.emailsToShow = emails);
            this.getEmailsToShow();
        },
        getEmailsToShow() {
            emailService.query(this.filter, this.selectedPage, this.emailsPerPage, this.pageNumber)
                .then(emails => this.emailsToShow = emails);
        },
        setPageFilter(selectedPage){
            this.selectedPage = selectedPage;
            this.pageNumber = 0;
             this.getEmailsToShow();           
        },
        movePage(diff){
            this.pageNumber += diff;
            this.getEmailsToShow();
        },
        moveToComposePage(){
            this.$router.push('/email/compose');
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
            this.getEmailsToShow()
        })
        eventBus.$on('toggle-read', id => {
            emailService.toggleRead(id);
            this.getEmailsToShow();
        })

    }
}