import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const ServiceHistory = ({ serviceHistory }) => {
    const hasServiceHistory = serviceHistory?.items?.length > 0;
    const serviceHistoryLength = hasServiceHistory ? serviceHistory.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="service-history"
            sx={{ borderBottom: `6px solid ${hasServiceHistory ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasServiceHistory ? '#DF4949' : '#82DF49'}}>
                <img src={hasServiceHistory ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {serviceHistoryLength > 0 ? `Записи об обслуживании: ${serviceHistoryLength}` : 'Не проходило обслуживание'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasServiceHistory ? '#DF4949' : '#82DF49'}}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История сервисного обслуживания
                    </Typography>
                </Box>
                {hasServiceHistory ? (
                    serviceHistory?.items?.map((service, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {service?.date?.end && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {service.date.end.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {service?.geo?.city && (
                                    <Typography className='text-item-report'>
                                        Город:
                                        <span className='report-text-bold'> {service.geo.city}</span>
                                    </Typography>    
                                )}
                                {service?.dealer?.name && (
                                    <Typography className='text-item-report'>
                                        Дилер:
                                        <span className='report-text-bold'> {service.dealer.name}</span>
                                    </Typography>    
                                )}
                                {index !== serviceHistoryLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Нет сведений о дилерском обслуживании</Typography>)}
            </Box>
        </Box>
    )
}

export default ServiceHistory