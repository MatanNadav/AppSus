'use strict';

import eventBus from "../../event-bus.js";

export default {
    template: `
    <section class="email-preview-container flex " :class="{opened : email.isRead}" @click="goToEmailDetails">
      <div class="email-command-container flex space-around">
        <button class="email-star preview-btn" :class="{star: email.isStarred}" @click.stop="emitToggleStar"></button>
        <button class="email-read preview-btn" :class="{read: email.isRead}" @click.stop="emitToggleRead"></button> 
        <button class="email-delete preview-btn" @click.stop="onEmailDelete"></button>
      </div>
      <div class="email-text-container flex space-between">
        <p class="email-text">{{textRender}}</p> <p class="email-date">{{email.date}} {{email.time}}</p>
      </div>
    </section>
    `,
    
    data() {
        return {

        }
    },

    props:['email'],
    computed: {
      textRender() {
        if (this.email.subject.length > 55) return this.email.subject.substring(0, 55) + '...'
        else return this.email.subject
    },
    },

    methods: {
    goToEmailDetails(){
        let emailUrl = `/email/${this.email.id}`
       this.$router.push(emailUrl);
    },
    onEmailDelete(){
        eventBus.$emit('on-delete-email',this.email.id);
    },
    emitToggleRead(){
      eventBus.$emit('toggle-read',this.email.id);
    },
    emitToggleStar(){
      eventBus.$emit('toggle-star',this.email.id);
    }
    },

    created() {

    }
}