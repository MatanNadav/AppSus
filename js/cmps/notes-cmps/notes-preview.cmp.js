'use strict';

export default {
    template: `
        <div class = "note-preview">
            <p>{{note.text}}</p>
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