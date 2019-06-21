'use strict';

export default {
    template: `
    <section>
        <nav>
            <ul>
                <li @click="changePage('inbox')">Inbox</li>
                <li @click="changePage('starred')">Starred</li>
                <li @click="changePage('sent')">Sent</li>
                <li @click="changePage('trash')">Trash</li>
            </ul>
        </nav>
    </section>
    `,

    data() {
        return {

        }
    },

    props:[],
    computed: {

    },

    methods: {
          changePage(selectedPage){
             this.$emit('page-select',selectedPage)
          }
    },

    created() {

    }
}