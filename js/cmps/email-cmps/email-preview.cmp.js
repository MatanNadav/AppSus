'use strict';

export default {
    template: `
    <section class="email-preview">
        <h1>{{email.subject}}</h1>
        <p>{{email.body}}</p>
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