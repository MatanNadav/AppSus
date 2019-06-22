'use strict';
import emailData from './data/mock-email-data.js'
import { storageService } from './storage.service.js'

const MAIL_KEY = 'emails'

export const emailService = {
    query,
    add,
    getById,
    remove,
    toggleRead,
    toggleStarred

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
    }
    let startingIdx = pageNumber * emailsPerPage;
    let endIdx = (pageNumber + 1) * emailsPerPage;
    let emailsToShow = [];
    for (let i = startingIdx; i < emails.length && emailsToShow.length < emailsPerPage; i++) {
        if (page === 'inbox' && !emails[i].isTrash) emailsToShow.push(emails[i])
        else if (page === 'starred' && emails[i].isStarred) emailsToShow.push(emails[i]);
        else if (page === 'trash' && emails[i].isTrash) emailsToShow.push(emails[i])
        else if (page === 'sent' && emails[i].isSent) emailsToShow.push(emails[i])
    }
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
    emailsDB.unshift(email);
    storageService.store(MAIL_KEY, emailsDB);
}

function _getIDXById(id) {
    if (!emailsDB) {
        query();
    }
    return emailsDB.findIndex(email => id === email.id);
}
function getById(id) {
    let idx = _getIDXById(id);
    return Promise.resolve(emailsDB[idx]);
}

function remove(id) {
    let idx = _getIDXById(id);
   console.log(idx,id)
    if (emailsDB[idx].isTrash) {
        emailsDB.splice(idx, 1);
    } else {
        emailsDB[idx].isTrash = true;
    }
    storageService.store(MAIL_KEY, emailsDB);
}

function toggleRead(id) {
    getById(id).then(email => {
        email.isRead = !email.isRead;
        storageService.store(MAIL_KEY, emailsDB);
    }
    )
}

function toggleStarred(id) {
    getById(id).then(email => {
        email.isStarred = !email.isStarred;
        storageService.store(MAIL_KEY, emailsDB);
    })
}