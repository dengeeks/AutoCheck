import { Box, Typography, TextField, Button, IconButton } from "@mui/material"
import { useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';


const TicketSystemCreate = () => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

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
        <Box>
            <Typography>Ваши запрос</Typography>
            <TextField label='Тема запроса'/>
            <TextField label='Обращение в тех. поддержку'/>
            <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                    multiple
            />
            {selectedFiles.map((file, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <Typography className='feedback-form-filename'>{file.name}</Typography>
                    <IconButton onClick={() => handleDeleteFile(index)}>
                        <ClearIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            ))}
            <Button className='feedback-file-button' onClick={handleAttachFileClick} startIcon={<UploadFileIcon />} >
                {selectedFiles.length > 0 ? 'прикреплен ' : 'Прикрепить файл'} 
                {selectedFiles.length > 0 && <CheckIcon sx={{ marginLeft: '5px', fontSize: '24px' }} />}
            </Button>
        </Box>
    )
}

export default TicketSystemCreate