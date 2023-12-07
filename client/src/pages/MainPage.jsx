import { Typography, Box, Grid } from "@mui/material"
import VideoAnimation from "../components/VideoAnimation/VideoAnimation"
import InfoAboutCheckImage from "../media/images/InfoAboutCheck.png"
import CustomTextField from "../components/CustomTextField/CustomTextField"
import PlanCard from "../components/PlanCard/PlanCard"
import InfoInReport from "../components/InfoInReport/InfoInReport"
import InfoInReportPNG from "../media/images/InfoInReport.png"
import '../styles/MainPage.css'


const MainPage = () => {
    return(
        <Grid container sx={{ marginTop: '35px' }}>
            <Grid item xs={12} md={12} lg={8} xl={8}>
                <Box sx={{ textAlign: 'center', }}>
                    <Typography className='main-page-title'>Проверка автомобиля по VIN и госномеру</Typography>
                    <VideoAnimation />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CustomTextField />
                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <Box className='info-image-container'>
                    <img src={InfoAboutCheckImage} className="info-about-check-image" alt="info-about-check" />
                </Box>
            </Grid>
            <Grid item container xs={12} md={12} lg={12} xl={12} sx={{ alignItems: 'center', marginTop: '30px' }}>
                <Grid item xs={6} md={6} lg={2.4} xl={2.4}>
                    <PlanCard plan='Стандартный' color='498EDF' effectColor='rgba(214, 235, 255, 0.3)' discount='15' quantity='5' price='500'  />
                </Grid>
                <Grid item xs={6} md={6} lg={2.4} xl={2.4}>
                    <PlanCard plan='Стандартный' color='49BBDF' effectColor='rgba(214, 235, 255, 0.3)' discount='15' quantity='5' price='500'  />
                </Grid>
                <Grid item xs={6} md={6} lg={2.4} xl={2.4}>
                    <PlanCard plan='Стандартный' color='49DFD6' effectColor='rgba(214, 235, 255, 0.3)' discount='15' quantity='5' price='500'  />
                </Grid>
                <Grid item xs={6} md={6} lg={2.4} xl={2.4}>
                    <PlanCard plan='Стандартный' color='49DF8E' effectColor='rgba(214, 235, 255, 0.3)' discount='15' quantity='5' price='500'  />
                </Grid>
                <Grid item xs={6} md={6} lg={2.4} xl={2.4}>
                    <PlanCard plan='Стандартный' color='A6DF49' effectColor='rgba(214, 235, 255, 0.45)' discount='15' quantity='5' price='500'  /> 
                </Grid>                    
            </Grid>
            <Grid item container xs={12} className="info-in-report-grid-container">
                <Grid item xs={12} md={12} lg={6} lx={8}>
                    <InfoInReport />
                </Grid>
                <Grid item xs={12} md={12} lg={6} lx={4} sx={{ textAlign: 'right' }}>
                    <img src={InfoInReportPNG} alt="Info In Report Image" className="info-in-report-image"/>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default MainPage