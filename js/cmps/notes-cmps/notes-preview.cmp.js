'use strict';

export default {
    template: `
        <div class = "note-preview">
            <h2>note</h2>
            <h3>noter</h3>
            <img :src="note.img" />
        </div>
    `,

    data() {
        return {

        }
    },

    props:['note'],
    computed: {

    },

    methods: {

    },

    created() {
        console.log('created at notes-preview');
    }
}