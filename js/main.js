'use strict';

/* SERVICES IMPORTS*/
import './services/email.service.js'
import './services/notes.service.js'
import appHeader from './cmps/app-header.cmp.js'
import theRoutes from './routes.js'

const myRouter = new VueRouter({ routes: theRoutes })

new Vue({
    el:'#app',
    template:`
    <section> 
        <app-header></app-header>
        <router-view></router-view>
    </section>
    
    `,
    components: {
        appHeader
    },
    
    router: myRouter
})