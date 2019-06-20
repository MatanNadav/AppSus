'use strict';
import notesData from './data/mock-notes-data.js';
import {storageService} from './storage.service.js'
export const notesService = {
    query,
}
const NOTES_KEY = 'missNotes'
// console.log(notesData);
function query(filter){
     let notes =  storageService.load(NOTES_KEY);
     if(notes){
        notes = notesData.slice();
     }
     storageService.store(NOTES_KEY,notes);
     return Promise.resolve(notes);

}
function create() {
    return {
        id: 1,
        text: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        date: '1/3/2019',
        time: '',
        img: ''
    }

}