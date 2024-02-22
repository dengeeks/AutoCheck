import { Container, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useDocumentTitle from "../../../utils/useDocumentTitle"

import expireReport from '../../../media/video/extendReport.gif'


const ReportExpire = () => {
    const navigate = useNavigate()
    useDocumentTitle('Отчет устарел')

    return(
        <Container>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                textAlign: 'center', 
                alignItems: 'center',
                minHeight: '90vh',
            }}>
                <img src={expireReport} alt="expire report" style={{ width: '300px' }} />
                <Typography className='report-container-title'>Данные из отчёта устарели, вы можете заказать новый отчет!</Typography>
                <Button
                    sx={{ 
                        width: '300px',
                        height: '50px',
                        marginTop: '50px'
                    }}
                    onClick={() => navigate('/')}
                    className='add-admin-data-btn'
                >
                    Заказать
                </Button>                
            </Box>

        </Container>
    )
}

export default ReportExpire