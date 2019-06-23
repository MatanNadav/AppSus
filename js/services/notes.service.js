'use strict';
import notesData from './data/mock-notes-data.js';
import { storageService } from './storage.service.js'
import util from './util.service.js'
import eventBus from '../event-bus.js'
eventBus.$on('update-note', ()=>{
    storageService.store(NOTES_KEY,notesDB);
})


let notesPerPage = 25;
// return notesDB.slice(page * notesPerPage, (page*1)*notesPerPage)
export const notesService = {
    query,
    create,
    getById,
    remove,
    update,
    save,

}
const NOTES_KEY = 'missNotes';
let notesDB;

function query(filter) {
    let notes;
    if (!notesDB) {
        notes = storageService.load(NOTES_KEY);
    }
    if (!notes && !notesDB) {
        notes = notesData;
    }
    if(notes) notesDB = notes;
    sortPinnedNotes()
    save(NOTES_KEY, notes)
    if(!filter) return Promise.resolve(notesDB);
    // else {
    //     return notes.filter(note => note.text.includes(filter.txt));
    // }

}

function sortPinnedNotes() {
    console.log('inside sorting pinned');
    
    notesDB.sort( note => (note.isPinned) ? -1 : 1)
    console.log(notesDB);
    
}

function save(key = NOTES_KEY, value = notesDB) {
    storageService.store(key, value);
}


function _getIDXById(id) {
    if (!notesDB) {
        query();
    }
    return notesDB.findIndex(note => id === note.id);
}
function getById(id) {
   let  idx = _getIDXById(id);
    return notesDB[idx];
}

function remove(id){
    let idx = _getIDXById(id);
    notesDB.splice(idx,1);
    save()
}

function update(id,txt){
    let note = getById(id);
    note.text = txt;
    note.time = new Date();
}


function create(note) {
    if (!notesDB) {
        query();
    }
    let newNote = {
        id: util.getRandomString(),
        text: note.text,
        time: new Date().toLocaleString(),
        img: null,
        title: note.title,
        bgColor: null,
        isPinned: false,
        type:note.type,
        todos:note.todos
    }
    if(typeof note.img === 'string') newNote.img = note.img
    notesDB.unshift(newNote);
    save()
}
