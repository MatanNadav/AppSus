'use strict';
import { emailData, trashedEmails } from './data/mock-email-data.js'
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
let trashDB = trashedEmails;
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
    switch (page) {
        case 'inbox':
            return Promise.resolve(emails.slice(emailsPerPage * pageNumber, emailsPerPage * (pageNumber + 1)));
            case 'starred':
                let starredEmailsToShow = [];
            for (let i = 0; i < emails.length || starredEmailsToShow.length < emailsPerPage; i++) {
                if (emails[i].isStarred) starredEmailsToShow.push(emails[i]);
            }
            console.log(starredEmailsToShow);
            return Promise.resolve(starredEmailsToShow.slice(emailsPerPage * pageNumber, emailsPerPage * (pageNumber + 1)));
            case 'trash':
                return Promise.resolve(trashDB.slice(emailsPerPage * pageNumber, emailsPerPage * (pageNumber + 1)));
            }
            return Promise.resolve(emails);
            
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
    if(!isNaN(+id)) id = +id
    return emailsDB.findIndex(email => id === email.id);
}
function getById(id) {
    let idx = _getIDXById(id);
    return Promise.resolve(emailsDB[idx]);
}

function remove(id) {
    let idx = _getIDXById(id);
    let email = emailsDB.splice(idx, 1);
    console.log(email)
    trashedEmails.unshift(...email);
    storageService.store(MAIL_KEY, emailsDB)
    console.log(trashedEmails);
}

function toggleRead(id) {
    getById(id).then(email => {
        email.isRead = !email.isRead;
        storageService.store(MAIL_KEY, emailsDB);
    }
    )
}