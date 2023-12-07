import { Input, Button, Box, Typography } from "@mui/material"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './CustomTextField.css'
import { Link } from "react-router-dom";
import HelpModal from "../HelpModal/HelpModal";
import { useState } from "react";


const CustomTextField = () => { 
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

    const handleTextInput = (e) => {
        console.log(e.target.value)
    }

    const handleClickHelpIcon = () => {
        setIsHelpModalOpen(!isHelpModalOpen)
    }

    const handleCloseHelpModal = () => {
        setIsHelpModalOpen(false);
    };

    return (
        <Box>
            <HelpModal open={isHelpModalOpen} onClose={handleCloseHelpModal} />
            <Input 
                className="custom-text-field"
                disableUnderline={true}
                placeholder="Введите VIN или госномер"
                endAdornment={<HelpOutlineOutlinedIcon onClick={handleClickHelpIcon} />}
                onChange={(e) => handleTextInput(e)}
            />
            <Button className="submit-field-button" endIcon={<SearchIcon />}>Проверить</Button>
            <Box sx={{ display: 'flex', justifyContent: 'inline' }}>
                <Link>
                    <Typography sx={{ marginRight: '15px' }} className="link-under-field">история запросов</Typography>
                </Link>
                <Link>
                    <Typography  className="link-under-field">пример отчета</Typography>
                </Link>
            </Box>
        </Box>

    )
}

export default CustomTextField