'use strict';

export default {
    template: `
        <div class = "note-preview">
            <h2>{{note.text}}</h2>
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
    }
}