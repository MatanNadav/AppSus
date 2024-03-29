'use strict';
import emailPreview from './email-preview.cmp.js'
export default {
    template: `
    <section class="email-list-container flex">
        <email-preview v-for="email in emails" :email="email" :key="email.id"></email-preview>
    </section>
    `,

    data() {
        return {

        }
    },

    props: ['emails'],
    computed: {

    },
    components: {
        emailPreview
    },
    methods: {

    },

    created() {

    }
}