'use strict';
import './services/email-service.js'

const myRouter = new VueRouter({ routes: theRoutes })

new Vue({
    el:'#app',
    template:`
    <h1>STOP YELLING</h1>
    <router-view></router-view>

    `,
    
    router: myRouter
})