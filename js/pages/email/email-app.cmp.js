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
            <section class="email-body-container flex">
                <email-nav @page-select="setPageFilter"></email-nav>
                <email-list v-if="emailsToShow" :emails="emailsToShow" ></email-list>
            </section>
            <button class="email-prev-page btn" v-if="pageNumber > 0" @click="movePage(-1)"><</button> 
            <button class="email-compose-btn" @click="moveToComposePage">Compose</button>
            <button class="email-next-page btn" v-if="emailsToShow && emailsToShow.length === 25" @click="movePage(1)">></button>
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
            this.getEmailsToShow();
        },
        getEmailsToShow() {
            emailService.query(this.filter, this.selectedPage, this.emailsPerPage, this.pageNumber)
                .then(emails => this.emailsToShow = emails);
        },
        setPageFilter(selectedPage) {
            this.selectedPage = selectedPage;
            this.pageNumber = 0;
            this.getEmailsToShow();
        },
        movePage(diff) {
            this.pageNumber += diff;
            this.getEmailsToShow();
        },
        moveToComposePage() {
            this.$router.push('/email/compose');
        },
        onEmailDelete(id) {
            emailService.remove(id);
            this.getEmailsToShow();
        },
        onToggleRead(id) {
            emailService.toggleRead(id);
        },
        onToggleStar(id) {
            emailService.toggleStarred(id)
            .then(()=> this.getEmailsToShow())
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
        eventBus.$on('on-delete-email', this.onEmailDelete)
        eventBus.$on('toggle-read', this.onToggleRead)
        eventBus.$on('toggle-star', this.onToggleStar)
        
    },
    afterCreated(){
          console.log('bitt')
    },
    mounted(){
                if(this.$route.fullPath.includes('starred')){
                    this.selectedPage ='starred'
                }

    },
    beforeDestroy() {
        eventBus.$off('on-delete-email', this.onEmailDelete)
        eventBus.$off('toggle-read', this.onToggleRead)
        eventBus.$off('toggle-star', this.onToggleStar)
}
}