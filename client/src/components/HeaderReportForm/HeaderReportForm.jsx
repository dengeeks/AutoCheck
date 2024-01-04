import { Box, Input, Button, TextField } from "@mui/material"
import { useState } from "react";
import HelpModal from "../HelpModal/HelpModal"
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import './HeaderReportForm.css'

const HeaderReportForm = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClickHelpIcon = () => {
        setIsOpen(true)
    }

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
            <Button 
                className='header-report-btn'
            >
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default HeaderReportForm