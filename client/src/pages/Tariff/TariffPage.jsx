import { Box, Typography } from "@mui/material"
import AllPlans from "../../components/AllPlans/AllPlans"


const TariffPage = () => {
    return(
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Typography className='tariff-plan-title'>Тарифные планы</Typography>
            <Box>
                <AllPlans />
            </Box>
        </Box>
    )
}

export default TariffPage