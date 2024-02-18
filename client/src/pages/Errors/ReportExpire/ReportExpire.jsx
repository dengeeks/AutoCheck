import { Container, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"


const ReportExpire = () => {
    const navigate = useNavigate()
    
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