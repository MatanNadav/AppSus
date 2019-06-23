'use strict';
import emailData from './data/mock-email-data.js'
import { storageService } from './storage.service.js'
import utilService from './util.service.js';

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
    console.log(page)
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
        emails = emailsDB.filter(email => {
            let isIntxtFilter = (email.subject.toLowerCase().includes(filter.txt.toLowerCase()));
            let isInsortFilter;
            if (filter.sort === 'read') isInsortFilter = email.isRead;
            else if (filter.sort === 'unread') isInsortFilter = !email.isRead;
            else isInsortFilter = true;
            return isInsortFilter && isIntxtFilter;
        });
    }
    let startingIdx = pageNumber * emailsPerPage;
    let emailsToShow = [];
    for (let i = startingIdx; i < emails.length && emailsToShow.length < emailsPerPage; i++) {
        if (page === 'inbox' && !emails[i].isTrash && !emails[i].isSent) emailsToShow.push(emails[i])
        else if (page === 'starred' && emails[i].isStarred) emailsToShow.push(emails[i]);
        else if (page === 'trash' && emails[i].isTrash) emailsToShow.push(emails[i])
        else if (page === 'sent' && emails[i].isSent) emailsToShow.push(emails[i])
    }
    return Promise.resolve(emailsToShow.slice());
}

function add(email) {
    if (!emailsDB) {
        query();
    }
    emailsDB.unshift(email);
    createRandomResponse(email);
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
    return getById(id).then(email => {
        email.isStarred = !email.isStarred;
        storageService.store(MAIL_KEY, emailsDB);
    })
}

function createRandomResponse(email) {
    let responseDB = ['Got it', 'im on it', 'Nice to meet you', 'Unsubcribe', 'GOD DAMM STOP SPAMMING ME ',
        'please verify your email', 'You go queen', 'I will get back to you on that']
    let responseTime = new Date(Date.now());
    console.log(email.emailAddress)
    let response = {
        id: utilService.getRandomString(6),
        subject: 're:' + email.subject,
        body: responseDB[utilService.getRandomInt(0, 7)] + `     
        
        
        
${email.body}
                    `,
        emailAddress: email.emailAddress,
        time: responseTime.toTimeString('he-IL'),
        date: responseTime.toLocaleDateString('he-IL'),
        isStarred: false,
        isSent: false,
        isRead: false,
        isTrash: false
    };
    emailsDB.unshift(response);

}