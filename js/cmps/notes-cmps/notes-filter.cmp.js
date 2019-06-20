'use strict';

export default {
    template: `
        <section class="book-filter">
            <input placeholder="Filter" type="text" v-model="filterBy.txt" @input="emitFilter" />
        </section>
    `,

    data() {
        return {
            filterBy: {
                txt: null
            }
        }
    },

    props:[],
    computed: {

    },

    methods: {
        emitFilter() {            
            this.$emit('set-filter', this.filterBy);
        }
    },

    created() {

    }
}