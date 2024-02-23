import { Container, Box, Button, Typography, TextField, IconButton } from "@mui/material"
import { useState, useContext, useEffect } from "react";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HelpModal from "../../../components/HelpModal/HelpModal";
import { codeValidation } from "../../../utils/FieldValidation";
import { useNavigate } from "react-router-dom"
import './ProfileIndex.css'
import { createReportRequest } from "../../../api/Reports/CreateReportRequest";
import AuthContext from "../../../context/AuthContext";
import { getUserReports } from "../../../api/Reports/GetUserReportsRequest";
import ReportItem from "../../../components/ReportItem/ReportItem";
import { getReportPaginationList } from "../../../api/Reports/GetReportPaginationList";
import { getFilteredReports } from "../../../api/Reports/GetFilteredReportsRequest";
import useDocumentTitle from "../../../utils/useDocumentTitle";


const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [code, setCode] = useState()
    const [error, setError] = useState()
    const [codeType, setCodeType] = useState('GRZ')
    const {user, authTokens} = useContext(AuthContext)
    const [bodyCode, setBodyCode] = useState()
    const [reports, setReports] = useState([])
    useDocumentTitle('Личный кабинет')
    const placeholders = {
        VIN: 'Введите VIN',
        GRZ: 'Введите госномер',
        BODY: 'Введите номер кузова'
    };
    const [uuid, setUuid] = useState()
    const navigate = useNavigate()

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

    const handleFiltration = () => {
        getFilteredReports({setData: setReports, bodyCode: bodyCode, token: authTokens?.access})
    }

    useEffect(() => {
        getUserReports({ setData: setReports, token: authTokens?.access})
    }, [])

    useEffect(() => {
        if (uuid) {
            navigate(`/report/${uuid}/`)
        }
    }, [uuid])

    const handleTextInput = (e) => {
        setCode(e.target.value)
    }
    
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handlePreviousPage = () => {
        getReportPaginationList({setData: setReports, url: reports?.previous, token: authTokens?.access})
    }

    const handleNextPage = () => {
        getReportPaginationList({setData: setReports, url: reports?.next, token: authTokens?.access})
    }
    return (
        <Container>
            <HelpModal open={isModalOpen} onClose={closeModal} />
            <Box className='profile-title-container'>
                <Typography className='profile-title'>
                    Ваш личный кабинет
                </Typography>
            </Box>
            <Box className='profile-request-form'>
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
                <Box sx={{ width: '100%', margin: '0 auto', justifyContent: 'center', textAlign: 'center' }}>
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
                        endIcon={<SearchIcon />}
                        onClick={handleFieldSubmit}
                    >
                        Поиск
                    </Button>                      
                </Box>
            </Box>
            <Box className='profile-btns-container'>
                <Button 
                    className='profile-navigate-btn' 
                    onClick={() => navigate('/')}
                >
                    Заказать отчет
                </Button>
                <Button 
                    className='profile-navigate-btn'
                    onClick={() => navigate('/user-profile/balance')}
                >
                    Пополнить баланс
                </Button>
                <Button 
                    className='profile-navigate-btn'
                    onClick={() => navigate('/user-profile/tariff-plans')}
                >
                    Перейти к тарифам
                </Button>
            </Box>
            <Box className='search-filter-container'>
                <TextField 
                    className='search-filter-field'
                    label='Код автомобиля' 
                    onChange={(e) => setBodyCode(e.target.value)}
                    size='small'
                />
                <Button
                    className='search-filter-btn'
                    onClick={() => handleFiltration()}
                >
                    Поиск
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                {reports?.results?.length > 0 ? (
                    <Box sx={{ width: '100%', marginBottom: '15px' }}>
                    {reports?.results?.map((report, index) => {
                        return(
                            <ReportItem report={report} token={authTokens?.access} key={index} />
                        )
                    })}
                    </Box>
                ) : (<Typography className='profile-title'>У вас нет отчетов</Typography>)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                    className='report-pagination-btns' 
                    sx={{ marginRight: '15px' }}
                    onClick={() => handlePreviousPage()}
                    disabled={!reports.previous} 
                >
                    Предыдущий
                </Button>
                <Button 
                    className='report-pagination-btns' 
                    sx={{ marginLeft: '15px' }}
                    onClick={() => handleNextPage()}
                    disabled={!reports.next} 
                >
                    Следующий
                </Button>
            </Box>
        </Container>
    )
}

export default Profile