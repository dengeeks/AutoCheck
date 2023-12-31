import { Box, Typography, TextField, Button, IconButton } from "@mui/material"
import { useRef, useState, useContext } from "react";
import CheckIcon from '@mui/icons-material/Check';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import { validateFeedbackForm } from "./ValidateFeedbackForm";
import { sendFeedbackEmailApi } from "../../api/sendFeedbackEmailRequest";
import './FeedbackForm.css'
import AuthContext from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'


const FeedbackForm = () => {
    const fileInputRef = useRef(null);
    const [error, setError] = useState({ emailFrom: '', subject: '', message: '', selectedFiles: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [emailFrom, setEmailFrom] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const {authTokens} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const newFiles = Array.from(files).slice(0, 10 - selectedFiles.length);
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleAttachFileClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    if (success) {
        navigate('/')
    }

    const handleSubmitFeedback = () => {
        if (validateFeedbackForm(emailFrom, subject, message, selectedFiles, setError))  {
            sendFeedbackEmailApi({
                email_from: emailFrom, 
                subject: subject, 
                message: message, 
                files: selectedFiles,
                token: authTokens.access,
                setSuccess: setSuccess
            })
        }
    }

    return(
        <Box className='form-background-image'>
            <Box className='feedback-form-container'>
                <Typography className='feedback-title'>Помощь</Typography>

                <Typography className="feedback-second-title">Напишите нам, если есть вопросы</Typography>

                <TextField
                    className='feedback-form-field'
                    onChange={(e) => setEmailFrom(e.target.value)}
                    error={error.emailFrom}
                    helperText={error.emailFrom}
                    label='Ваша электронная почта'
                />
                <TextField
                    className='feedback-form-field'
                    onChange={(e) => setSubject(e.target.value)}
                    error={error.subject}
                    helperText={error.subject}
                    label='Тема'
                />
                <TextField
                    multiline
                    rows={4}
                    className='feedback-form-field'
                    onChange={(e) => setMessage(e.target.value)}
                    error={error.message}
                    helperText={error.message}
                    label='Сообщение'
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                    multiple
                />
                <Typography className='file-size-error'>{error.selectedFiles ? error.selectedFiles : ''}</Typography> 
                {selectedFiles.map((file, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Typography className='feedback-form-filename'>{file.name}</Typography>
                        <IconButton onClick={() => handleDeleteFile(index)}>
                            <ClearIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Box>
                ))}
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button className='feedback-file-button' onClick={handleAttachFileClick} startIcon={<UploadFileIcon />} >
                        {selectedFiles.length > 0 ? 'прикреплен ' : 'Прикрепить файл'} {selectedFiles.length > 0 && <CheckIcon sx={{ marginLeft: '5px', fontSize: '24px' }} />}
                    </Button>   

                    <Typography className='file-upload-text'>JPG, PNG, GIF или PDF — до 10 файлов общим размером до 20 МБ</Typography>
                </Box>
                <Box sx={{ display: 'block', marginBottom: '20px' }}>
                    <Button className='feedback-submit-button' onClick={handleSubmitFeedback}>Отправить</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FeedbackForm