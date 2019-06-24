'use strict';


export default {
    template: `
     <section class="email-filter-container flex">
            <input class ="email-search-input input" placeholder="search mail" type="text" v-model="filter.txt" @input="emitFilter">
            <div class="email-sort-container">
                <select class = "email-sort-input" @change="emitFilter" v-model="filter.sort">
                    <option class="email-sort-option" value="all">All</option>
                    <option class="email-sort-option" value="unread">Unread</option>
                    <option class="email-sort-option" value="read">Read</option>
                </select>
                <select class = "email-sort-input " @change="emitFilter" v-model="filter.sort">
                    <option class="email-sort-option" value="all">All</option>
                    <option class="email-sort-option" value="unread">Unread</option>
                    <option class="email-sort-option" value="read">Read</option>
                </select>
            </div>
     </section>
            
    `,

    data() {
        return {
            filter: {
                txt:'',
                sort:'all'
            }
        }
    },

    props: [],
    computed: {

    },

    methods: {
        emitFilter() {
            this.$emit('email-filter', this.filter);
        }
    },

    created() {

    }
}