'use strict';
import homePageCmp from './pages/homepage.cmp.js'
import notesAppCmp from './pages/notes/notes-app.cmp.js'
import emailAppCmp from './pages/email/email-app.cmp.js'
import emailDetailsCmp from './pages/email/email-details.cmp.js';
import emailComposeCmp from './cmps/email-cmps/email-compose.cmp.js';


export default [
    {path:'/',component: homePageCmp},
    {path:'/email',component: emailAppCmp},
    {path:'/email/compose',component:emailComposeCmp},
    {path:'/email/:emailId',component:emailDetailsCmp},
    {path:'/notes',component: notesAppCmp},
    // {path:'/horse-dating',component: horseDatingAppCmp},
]