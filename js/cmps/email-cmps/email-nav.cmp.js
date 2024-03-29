'use strict';

export default {
    template: `
    <section  class="email-nav-container" :class="{open : isOpen}">
        <button class="responsive-btn" @click="openNav"></button>
        <nav>
            <ul class="email-nav-items-container">
                <li class="email-nav-item" @click="changePage('inbox')">Inbox</li>
                <li class="email-nav-item" @click="changePage('starred')">Starred</li>
                <li class="email-nav-item" @click="changePage('sent')">Sent</li>
                <li class="email-nav-item" @click="changePage('trash')">Trash</li>
            </ul>
        </nav>
    </section>
    `,

    data() {
        return {
            isOpen: false
        }
    },

    props:['unreadPrecentage'],
    computed: {

    },

    methods: {
          changePage(selectedPage){
             this.$emit('page-select',selectedPage)
          },
          openNav() {
              this.isOpen = !this.isOpen
              this.$emit('open-nav')
          }
    },

    created() {
    },
}