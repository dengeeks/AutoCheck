import { useRef, useState } from "react";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import './ChatForm.css'


const ChatForm = ({ id, handleMessageSubmit }) => {
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const newFiles = Array.from(files).slice(0, 10 - selectedFiles.length);
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleAttachFileClick = () => {
        fileInputRef.current.click();
    };

    return(
        <Box sx={{ marginTop: '20px', marginBottom: '15px' }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif, .mp4, .mp3"
                multiple
            />
            <Box className='send-message-container'>
                <TextField 
                    label='Сообщение'
                    onChange={(e) => setMessage(e.target.value)}             
                    fullWidth
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachmentIcon 
                                onClick={() => handleAttachFileClick()}
                                className='send-message-attachment'
                            />
                          </InputAdornment>
                        ),
                    }}
                />
                <Button
                    className='submit-message-btn'
                    onClick={() => handleMessageSubmit({ text: message, files: selectedFiles })}
                    disabled={(!message || !message.trim()) && selectedFiles.length === 0}
                >
                    <SendIcon />
                </Button>
            </Box>
            <Box className='upload-files-container'>
                {selectedFiles.map((file, index) => (
                    <Box 
                        key={index} 
                        className='upload-files-attached'
                    >
                        <IconButton onClick={() => handleDeleteFile(index)}>
                            <ClearIcon sx={{ color: '#000' }} />
                        </IconButton>
                        <Typography className='upload-file-text'>{file.name}</Typography>
                    </Box>                
                ))}                 
            </Box>
        </Box>
    )
}

export default ChatForm