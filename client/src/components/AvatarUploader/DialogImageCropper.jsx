import { useEffect, useState } from 'react';
import {Typography, DialogTitle, DialogContent, Dialog, Box} from "@mui/material";
import AvatarUpload from "./AvatarUpload";
import './AvatarUploader.css'


const DialogImageCrop = ({ selectedImage }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // when user choose some image open dialog for crop-select
        if (selectedImage) {
            setOpen(true)
        }
    }, [selectedImage])

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className='upload-avatar-title'>Редактирование аватарки</Typography>
                </DialogTitle>
                <DialogContent>
                    <AvatarUpload
                        onClose={handleClose}
                        selectedImage={selectedImage}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default DialogImageCrop