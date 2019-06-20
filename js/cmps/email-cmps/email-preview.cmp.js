'use strict';

export default {
    template: `
    <section class="email-preview">
        <p>{{email.subject}}<span>{{email.date}} {{email.time}}</span></p>
    </section>
    `,

    data() {
        return {

        }
    },

    props:['email'],
    computed: {

    },

    methods: {

    },

    created() {

    }
}