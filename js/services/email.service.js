'use strict';
import emailData from './data/mock-email-data.js'
import { storageService } from './storage.service.js'

const MAIL_KEY = 'emails'

export const emailService = {
    query,
    add,
    getById,
    remove,
    toggleRead

}
let emailsDB;
function query(filter, page, emailsPerPage, pageNumber) {
    let emails;
    if (!emailsDB) {
        emails = storageService.load(MAIL_KEY);
    } else {
        emails = emailsDB;
    }
    if (!emails && !emailsDB) {
        emails = emailData.slice();
    }
    emailsDB = emails;
    storageService.store(MAIL_KEY, emails);
    if (filter) {
        emails = emailsDB.filter(email => email.subject.toLowerCase().includes(filter));
        console.log(emails)
    }
    let startingIdx = pageNumber * emailsPerPage;
    let endIdx = (pageNumber + 1) * emailsPerPage;
    let emailsToShow = [];
    if (page === 'inbox') {
        return Promise.resolve(emails.slice(startingIdx, endIdx));
    } else {
        for (let i = startingIdx; i < emails.length && emailsToShow.length < emailsPerPage; i++) {
            if (page === 'starred' && emails[i].isStarred) emailsToShow.push(emails[i]);
            if (page === 'trash' && emails[i].isTrash) emailsToShow.push(emails[i])
            if (page === 'sent' && emails[i].isSent) emailsToShow.push(emails[i])
        }
    }
    console.log(emailsToShow);
    return Promise.resolve(emailsToShow.slice());
    // case 'trash':
    //     for (let i = startingIdx; i < emails.length && emailsToShow.length < emailsPerPage; i++) {
    //         console.log(emailsToShow)
    //     }
    //     return Promise.resolve(emailsToShow.slice());
    //     case 'sent' : 
    //             for (let i = startingIdx; i < emails.length && emailsToShow.length < emailsPerPage; i++) {
    //                 console.log(emailsToShow)
    //             }

    // return Promise.resolve(emails);

}

function add(email) {
    if (!emailsDB) {
        query();
    }
    // email.id = emailsDB[emailsDB.length - 1].id + 1;
    emailsDB.unshift(email);
    storageService.store(MAIL_KEY, emailsDB);
}

function _getIDXById(id) {
    if (!emailsDB) {
        query();
    }
    if (!isNaN(+id)) id = +id
    return emailsDB.findIndex(email => id === email.id);
}
function getById(id) {
    let idx = _getIDXById(id);
    return Promise.resolve(emailsDB[idx]);
}

function remove(id) {
    let idx = _getIDXById(id);
    let email = emailsDB.splice(idx, 1);
    email.isTrash = true;
    console.log(email)
    storageService.store(MAIL_KEY, emailsDB)
}

function toggleRead(id) {
    getById(id).then(email => {
        email.isRead = !email.isRead;
        storageService.store(MAIL_KEY, emailsDB);
    }
    )
}