import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

export const NoteView = () => {
  const dispatch = useDispatch()
  const {noteActive, messageSaved, isSaving} = useSelector(state => state.journal)
  const {body, title, date, onInputChange, formState,} = useForm(noteActive)

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString()
    return newDate
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota Actualizada', messageSaved, 'success')
    }
  }, [messageSaved])
  

  function onSaveNote() {
    dispatch(startSaveNote())
  }

  function onDelete() {
    dispatch(startDeletingNote())
  }

  function onFileInputChange({target}) {
    if (target.files === 0) return

    dispatch(startUploadingFiles(target.files))
    }

  return (
    <>
     <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}  className="animate__animated animate__fadeIn animate__faster">
        <Grid item>
            <Typography fontSize={38} fontWeight='light'>{dateString}</Typography>
        </Grid>

        <Grid item>
            <input type="file" multiple onChange={onFileInputChange} style={{display: 'none'}} ref={fileInputRef} />

            <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()} >
              <UploadOutlined />
            </IconButton>
            <Button color="primary" sx={{padding: 2}} onClick={onSaveNote} disabled={isSaving}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField type="text" variant="filled" fullWidth placeholder="Enter a Title" label='Title' sx={{mb:1, border: 'none'}} name="title" value={title} onChange={onInputChange} />
            <TextField type="text" variant="filled" multiline fullWidth placeholder="What Happened Today?" minRows={5} sx={{mb:1, border: 'none'}} name="body" value={body} onChange={onInputChange} />
        </Grid>

        <Grid container justifyContent='end' >
          <Button onClick={onDelete} sx={{mt: 2}} color="error">
            <DeleteOutline />
            Delete
          </Button>
        </Grid>
        
        <ImageGallery images={noteActive.imageUrls} />
     </Grid>   
    </>
  )
}
