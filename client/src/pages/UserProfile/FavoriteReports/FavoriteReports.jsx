import { useEffect, useState, useContext } from "react"
import { getFavoriteReportList } from "../../../api/Reports/GetFavoriteReportList"
import AuthContext from "../../../context/AuthContext"
import { Box, Button, Typography, TextField, IconButton } from "@mui/material"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import ReportItem from "../../../components/ReportItem/ReportItem"
import Loader from "../../../components/Loader/Loader"
import { getReportPaginationList } from "../../../api/Reports/GetReportPaginationList"
import useDocumentTitle from "../../../utils/useDocumentTitle"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"
import { codeValidation } from "../../../utils/FieldValidation"
import { createReportRequest } from "../../../api/Reports/CreateReportRequest"
import HelpModal from "../../../components/HelpModal/HelpModal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FavoriteReports = () => {
    const [reports, setReports] = useState()
    const [error, setError] = useState()
    const [code, setCode] = useState()
    const [uuid, setUuid] = useState()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [codeType, setCodeType] = useState('GRZ')

    const {user, authTokens} = useContext(AuthContext)
    const placeholders = {
        VIN: 'Введите VIN',
        GRZ: 'Введите госномер',
        BODY: 'Номер кузова'
    };
    useEffect(() => {
        getFavoriteReportList({setData: setReports, token: authTokens.access})
    }, [])
    useDocumentTitle('Избранные отчеты')
    const handlePreviousPage = () => {
        getReportPaginationList({setData: setReports, url: reports?.previous, token: authTokens.access})
    }

    const handleNextPage = () => {
        getReportPaginationList({setData: setReports, url: reports?.next, token: authTokens.access})
    }
    const handleFieldSubmit = () => {
        if (user?.request_quantity >= 1) {
            const errorMessage = codeValidation(code, codeType);
            setError(errorMessage);

            if (!errorMessage) {
                createReportRequest({ 
                    setUuid: setUuid, 
                    code: code, 
                    codeType: codeType, 
                    token: authTokens?.access
                })
            }
        } else {
            navigate('/user-profile/tariff-plans')
        }
    }
    const handleTextInput = (e) => {
        setCode(e.target.value)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    if (!reports) {
        <Loader />
    }
    return(
        <Box>
            <HelpModal open={isModalOpen} onClose={closeModal} />
            <Typography 
                sx={{ textAlign: 'center', marginTop: '25px' }}
                className='profile-title'
            >
                Избранные отчеты
            </Typography>
            <Box className='profile-request-form' sx={{  marginTop: '25px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
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
                <Box sx={{  width: '100%',textAlign: 'center' }}>
                    <TextField 
                        sx={{ width: '65%' }}
                        label={placeholders[codeType]}
                        onChange={(e) => handleTextInput(e)}
                        error={!!error}
                        helperText={error}
                        InputProps={{
                            endAdornment: (
                            <IconButton onClick={() => setIsModalOpen(true)}>
                                <HelpOutlineOutlinedIcon />
                            </IconButton>
                            ),
                        }}
                    />
                    <Button
                        className='profile-submit-request-btn'
                        onClick={handleFieldSubmit}
                    >
                        <SearchIcon />
                    </Button>                      
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {reports?.length > 0 ? (
                    <Box sx={{ width: '95%', marginBottom: '15px' }}>
                    {reports.map((report, index) => {
                        return(
                            <ReportItem report={report} token={authTokens.access} key={index} />
                        )
                    })}
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography className='profile-title'>Нет избранных отчетов</Typography>
                    </Box>
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                    className='review-button' 
                    sx={{ marginRight: '15px' }}
                    onClick={() => handlePreviousPage()}
                    disabled={!reports?.previous} 
                >
                    <ArrowBackIosIcon />
                </Button>
                <Button 
                    className='review-button' 
                    sx={{ marginLeft: '15px' }}
                    onClick={() => handleNextPage()}
                    disabled={!reports?.next} 
                >
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        </Box>

    )
}

export default FavoriteReports