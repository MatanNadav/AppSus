'use strict';

export default {
    template: `
        <section class="note-filter-container">
            <input type="text" placeholder="Search note" class="filter-input input" v-model="filterBy.txt" @input="emitFilter" />
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