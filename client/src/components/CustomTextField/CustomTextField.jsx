import { Input, Button, Box, Typography, InputLabel } from "@mui/material"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './CustomTextField.css'
import { Link, useNavigate } from "react-router-dom";
import HelpModal from "../HelpModal/HelpModal";
import { codeValidation } from "../../utils/FieldValidation";
import { useContext, useEffect, useState } from "react";
import { createReportRequest } from "../../api/Reports/CreateReportRequest";
import AuthContext from "../../context/AuthContext";


const CustomTextField = () => { 
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
    const [code, setCode] = useState()
    const [error, setError] = useState()
    const {user, authTokens} = useContext(AuthContext)
    const [codeType, setCodeType] = useState('GRZ')
    const navigate = useNavigate()
    const placeholders = {
        VIN: 'Введите VIN',
        GRZ: 'Введите госномер',
        BODY: 'Введите номер кузова'
    };
    const [uuid, setUuid] = useState()

    const handleFieldSubmit = () => {
        if (user?.request_quantity >= 1) {
            const errorMessage = codeValidation(code, codeType);
            setError(errorMessage);

            if (!errorMessage) {
                createReportRequest({ 
                    setUuid: setUuid, 
                    code: code, 
                    codeType: codeType, 
                    token: authTokens.access
                })
            }
        } else {
            navigate('/tariff-plans')
        }
    }

    useEffect(() => {
        console.log(uuid)
        if (uuid) {
            navigate(`/report/${uuid}/`)
        } 
    }, [uuid])

    const handleTextInput = (e) => {
        setCode(e.target.value)
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
            <InputLabel 
                htmlFor="custom-text-field"
                className='custom-helper-text'
            >
                {error}
            </InputLabel>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography 
                    className={`select-code-type ${codeType === 'GRZ' && 'active'}`}
                    onClick={() => setCodeType('GRZ')}
                >
                    Госномер
                </Typography>
                <Typography 
                    className={`select-code-type ${codeType === 'VIN' && 'active'}`}
                    onClick={() => setCodeType('VIN')}
                >
                    VIN
                </Typography>
                <Typography 
                    className={`select-code-type ${codeType === 'BODY' && 'active'}`}
                    onClick={() => setCodeType('BODY')}
                >
                    Кузов
                </Typography>
            </Box>
            <Input
                className="custom-text-field"
                disableUnderline={true}
                placeholder={placeholders[codeType]}
                endAdornment={<HelpOutlineOutlinedIcon onClick={handleClickHelpIcon} />}
                onChange={(e) => handleTextInput(e)}
            />
            <Button 
                className="submit-field-button" 
                endIcon={<SearchIcon />}
                onClick={handleFieldSubmit}
            >
                Проверить
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'inline' }}>
                <Link>
                    <Typography sx={{ marginRight: '15px' }} className="link-under-field">история проверок</Typography>
                </Link>
                <Link>
                    <Typography onClick={handleClickHelpIcon} className="link-under-field">пример отчета</Typography>
                </Link>
            </Box>
        </Box>
    )
}

export default CustomTextField