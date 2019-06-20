'use strict';
/* SERVICES IMPORTS*/

//https://docs.google.com/spreadsheets/d/1auLB41duGN0XU-QukBQEdOe67yRLtSVWCiWPOX5aPfs/edit?usp=sharing
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