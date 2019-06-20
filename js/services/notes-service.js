'use strict';
import notesData from './data/mock-notes-data.js';
import storageService from './storage.service.js'

const NOTES_KEY = 'missNotes'
console.log(notesData);
function query(filter){
     let notes =  storageService.load(NOTES_KEY);
     if(notes){
         notesData = notes;
     }
     storageService.store(NOTES_KEY,notesData);
     return Promise.resolve(notesData);

}
function create(){
return  {
     id: 1,
     text: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 
     date: '1/3/2019',
      time: '',
      img:''
     }

}