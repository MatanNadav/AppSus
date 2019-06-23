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
    createNewNote

}
const NOTES_KEY = 'missNotes';
let notesDB;
// console.log(notesData);
function query(filter) {
    let notes;
    if (!notesDB) {
        notes = storageService.load(NOTES_KEY);
    }
    if (!notes) {
        notes = notesData.slice();
    }
    notesDB = notes;
    save(NOTES_KEY, notes)
    if(!filter) return Promise.resolve(notes);
    else {
        return notes.filter(note => note.text.includes(filter.txt));
    }

}

function save(key = NOTES_KEY, value = notesDB) {
    storageService.store(key, value);
}

function pinNote(noteToPin) {
    // let idx = notesDB.findIndex(note => note.id === noteToPin.id)
    // let pinnedNote = notesDB.splice(idx, 1)
    // notesDB.unshift(pinnedNote)
    // console.log('inside service note to pin', notesDB);
    // query()
}

function create(txt, imgUrl) {
    if (!notesDB) {
        query();
    }
    notesDB.push({
        id: notesDB[notesDB.length - 1].id + 1,
        text: txt,
        date: new Date(),
        time: new Date(),
        img: imgUrl || null,
    });
    storageService.store(NOTES_KEY, notesDB);
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
}

function update(id,txt){
    let note = getById(id);
    note.text = txt;
    note.time = new Date();
}

function createNewNote(note) {
    let newNote = {
        id: util.getRandomString(),
        text: note.text,
        time: new Date().toLocaleString(),
        img: note.img,
        title: note.title,
        bgColor: null
    }
    notesDB.unshift(newNote)
    save()
    console.log(notesDB);
    
}
