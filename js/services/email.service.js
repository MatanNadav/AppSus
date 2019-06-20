'use strict';
import emailData from './data/mock-email-data.js';
import { storageService } from './storage.service.js'

const MAIL_KEY = 'emails'
export const notesService = {
    query,
    create,
    getById,
    remove,

}
let emailsDB;
function query(filter) {
    let emails;
    if (!emailsDB) {
        emails = storageService.load(MAIL_KEY);
    }
    if (!emails) {
        emails = emailData.slice();
    }
    emailsDB = emails;
    console.log(emailsDB);
    storageService.store(MAIL_KEY, emails);
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
    return emailsDB.findIndex(email => id === email.id);
}
function getById(id) {
    let idx = _getIDXById(id);
    return emailsDB[idx];
}

function remove(id) {
    let idx = _getIDXById(id);
    emailsDB.splice(idx, 1);
}

