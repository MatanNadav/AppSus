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
    <section> 
        <nav class="nav-container">
            <li class="nav-item"><router-link class="nav-link" exact to="/">Home</router-link> </li>
            <li class="nav-item"><router-link class="nav-link" exact to="/email">email</router-link></li>
            <li class="nav-item"><router-link class="nav-link" exact to="/notes">Notes</router-link></li>
            <li class="nav-item"><router-link class="nav-link" exact to="/about"><span class="knight-emoji">♘</span></router-link></li>
        </nav>
        <router-view></router-view>
    </section>
    
    `,
    router: myRouter
})