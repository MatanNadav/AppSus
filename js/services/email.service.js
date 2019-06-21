'use strict';
import {emailData , trashedEmails} from './data/mock-email-data.js'
import { storageService } from './storage.service.js'



const MAIL_KEY = 'emails'

export const emailService = {
    query,
    create,
    getById,
    remove,

}
let emailsDB;
let trashDB = trashedEmails;
function query(filter) {
    let emails;
    if (!emailsDB) {
        emails = storageService.load(MAIL_KEY);
    }
    if (!emails) {
        emails = emailData.slice();
    }
    emailsDB = emails;
    storageService.store(MAIL_KEY, emails);
    if(filter){
      return Promise.resolve(emailsDB.filter(email => email.subject.toLowerCase().includes(filter)));
    }
    console.log(emailsDB);
    return Promise.resolve(emails);

}

function create(firstName,lastName,email) {
    if (!emailsDB) {
        query();
    }
    emailsDB.push(
        {
            id: emailsDB[emailsDB.length-1],
            firstName ,
            lastName,
            email,
            date: new Date(),
        },

    );
    storageService.store(MAIL_KEY, emailsDB);
}

function _getIDXById(id) {
    if (!emailsDB) {
        query();
    }
    return emailsDB.findIndex(email => +id === email.id);
}
function getById(id) {
    let idx = _getIDXById(id);
    return Promise.resolve(emailsDB[idx]);
}

function remove(id) {
    let idx = _getIDXById(id);
    let email = emailsDB.splice(idx, 1);
    trashedEmails.unshift(email);
    console.log(trashedEmails);
}
