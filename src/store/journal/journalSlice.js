import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        imageUrls: [],
        noteActive: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.noteActive = action.payload
            state.messageSaved = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })
            state.messageSaved = `"${action.payload.title}", actualizada correctamente.`
        },
        setPhotosToActiveNote: (state, action) => {
            state.noteActive.imageUrls = [...state.noteActive.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.noteActive = null
        },
        deleteNoteById: (state, action) => {
            state.noteActive = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, clearNotesLogout, deleteNoteById } = journalSlice.actions;