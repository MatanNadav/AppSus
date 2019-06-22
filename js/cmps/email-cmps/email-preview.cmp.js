'use strict';

import eventBus from "../../event-bus.js";

export default {
    template: `
    <section class="email-preview" :class="{opened : email.isRead}" @click="goToEmailDetails">
     <button @click.stop="emitToggleRead">u</button> <button @click.stop="onEmailDelete">x</button>  <p>{{email.subject}}<span>{{email.date}} {{email.time}}</span></p>
    </section>
    `,
    
    data() {
        return {

        }
    },

    props:['email'],
    computed: {

    },

    methods: {
    goToEmailDetails(){
        let emailUrl = `/email/${this.email.id}`
       this.$router.push(emailUrl);
    },
    onEmailDelete(){
        console.log(this.email.id)
        eventBus.$emit('delete-email',this.email.id);
    },
    emitToggleRead(){
      eventBus.$emit('toggle-read',this.email.id);
    }
    },

    created() {

    }
}