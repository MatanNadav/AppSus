'use strict';


export default {
    template: `
        <section>
            <input type="text" v-model="filterTxt" @input="emitFilter">
        </section>
    `,

    data() {
        return {
            filterTxt: '',
        }
    },

    props:[],
    computed: {

    },

    methods: {
     emitFilter(){
         this.$emit('email-filter',this.filterTxt);
     }
    },

    created() {

    }
}