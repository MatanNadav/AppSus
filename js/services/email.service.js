'use strict';
import emailData from './data/mock-email-data.js'
import { storageService } from './storage.service.js'
import utilService from './util.service.js';

const MAIL_KEY = 'emails'
let gSort;

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
        sortEmails(filter.sort);
        emails = emailsDB.filter(email => {
            let isIntxtFilter = (email.subject.toLowerCase().includes(filter.txt.toLowerCase()));
            let isInsortFilter;
            if (filter.byOpened === 'read') isInsortFilter = email.isRead;
            else if (filter.byOpened === 'unread') isInsortFilter = !email.isRead;
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
function sortEmails(sort) {
    if(sort === gSort) return;
     gSort = sort;
    if (!sort || sort === 'date') {
        emailsDB.sort((email1, email2) => {
            let date1 = email1.date.split('.');
            let date2 = email2.date.split('.');
            if (email1.date !== email2.date) {
                if (date1[2] !== date2[2]) return (date1[2] < date2[2]) ? 1 : -1
              else  if (date1[1] !== date2[1]) return (date1[1] < date2[1]) ? 1 : -1
               else  return (date1[0] < date2[0]) ? 1 : -1;
            } else return (email1.time < email2.time) ? 1 : -1
        })
    } else {
        emailsDB.sort((email1, email2) => {
            return (email1.subject.toLowerCase() > email2.subject.toLowerCase()) ? 1 : -1;
        })
    }
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
        'please verify your email', 'You go queen', 'I will get back to you on that'
        , 'You really wearing that ?', 'Damm girl', 'BuhBye', 'SHUT THE FK UP']
    let responseTime = new Date(Date.now());
    console.log(email.emailAddress)
    let response = {
        id: utilService.getRandomString(6),
        subject: 're: ' + email.subject,
        body: responseDB[utilService.getRandomInt(0, 11)] + `     
        
        
        
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