'use strict';
/* SERVICES IMPORTS*/
import './services/email.service.js'
import './services/notes.service.js'
import theRoutes from './routes.js'

const myRouter = new VueRouter({ routes: theRoutes })

new Vue({
    el:'#app',
    template:`
    
        <router-view></router-view>

    `,
    
    router: myRouter
})