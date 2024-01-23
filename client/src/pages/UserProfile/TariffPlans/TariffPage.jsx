import { Box, Typography } from "@mui/material"
import AllPlans from "../../../components/AllPlans/AllPlans"


const TariffPage = () => {
    return(
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '25px'
        }}>
            <Typography className='tariff-plan-title'>Тарифные планы</Typography>
            <AllPlans />
        </Box>
    )
}

export default TariffPage