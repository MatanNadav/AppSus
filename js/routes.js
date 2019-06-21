'use strict';
import homePageCmp from './pages/homepage.cmp.js'
import notesAppCmp from './pages/notes/notes-app.cmp.js'
import emailAppCmp from './pages/email/email-app.cmp.js'
import emailDetailsCmp from './pages/email/email-details.cmp.js';


export default [
    {path:'/',component: homePageCmp},
    {path:'/email',component: emailAppCmp},
    {path:'/email/:emailId',component:emailDetailsCmp},
    {path:'/notes',component: notesAppCmp},
    // {path:'/horse-dating',component: horseDatingAppCmp},
]