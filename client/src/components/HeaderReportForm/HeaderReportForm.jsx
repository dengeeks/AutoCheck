import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import HelpModal from "../HelpModal/HelpModal"
import SearchIcon from '@mui/icons-material/Search';
import './HeaderReportForm.css'


const HeaderReportForm = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    return(
        <Box className='header-report-form-container'>
            <HelpModal open={isOpen} onClose={handleClose} />
            <TextField
                className='header-report-field'
                label='VIN/Госномер'
            />
            <Button className='header-report-btn'>
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default HeaderReportForm