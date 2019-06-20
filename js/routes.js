'use strict';
import homePageCmp from './pages/homepage.cmp.js'
import notesAppCmp from './pages/notes/notes-app.cmp.js'
import emailAppCmp from './pages/email/email-app.cmp.js'


export default [
    {path:'/',component: homePageCmp},
    {path:'/email',component: emailAppCmp},
    {path:'/notes',component: notesAppCmp},
    // {path:'/horse-dating',component: horseDatingAppCmp},
]