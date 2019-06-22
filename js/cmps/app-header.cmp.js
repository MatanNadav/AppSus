

'use strict';

export default {
    template: `
        <nav class="nav-container">
            <li class="nav-item"><router-link class="nav-link" exact to="/">Home</router-link> </li>
            <li class="nav-item"><router-link class="nav-link" exact to="/email">email</router-link></li>
            <li class="nav-item"><router-link class="nav-link" exact to="/notes">Notes</router-link></li>
            <li class="nav-item"><router-link class="nav-link" exact to="/about"><span class="knight-emoji">♘</span></router-link></li>
        </nav>
    `,

    data() {
        return {

        }
    },

    props:[],
    computed: {

    },

    methods: {

    },

    created() {

    }
}