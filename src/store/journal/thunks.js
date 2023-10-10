import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth
        console.log(uid);

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const setDocResp = await setDoc(newDoc, newNote)

        newNote.id = newDoc.id
        console.log(newDoc);

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))


    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const {uid} = getState().auth
        const {noteActive} = getState().journal

        const noteToFirestore = {...noteActive}
        delete noteToFirestore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`)
        await setDoc(docRef, noteToFirestore, {merge: true})

        dispatch(updateNote(noteActive))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())

        // await fileUpload(files[0])

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photosUrls))
    }
}
export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth
        const {noteActive: note} = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        
        dispatch(deleteNoteById(note.id))
    }
}