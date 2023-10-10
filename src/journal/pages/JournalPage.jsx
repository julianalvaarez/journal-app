import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoSelectedView, NoteView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { useDispatch, useSelector } from "react-redux"
import { addNewEmptyNote, savingNewNote } from "../../store/journal/journalSlice"

export const JournalPage = () => {
  const dispatch = useDispatch()
  const {isSaving, noteActive} = useSelector(state => state.journal)
  function onClickNewNote() {
    dispatch(savingNewNote())
    dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      {!!noteActive ?  <NoteView/> : <NoSelectedView/>}
      <IconButton disabled={isSaving} size="large" sx={{color: 'white', backgroundColor: 'error.main', ':hover': {backgroundColor: 'error.main',opacity: 0.9}, position: 'fixed', right: 50, bottom: 50}} onClick={onClickNewNote}>
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}
