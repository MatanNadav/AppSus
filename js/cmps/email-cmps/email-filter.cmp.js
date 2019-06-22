'use strict';


export default {
    template: `
        <section>
            <input type="text" v-model="filter.txt" @input="emitFilter">
            <select @change="emitFilter" v-model="filter.sort">
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            </select>
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