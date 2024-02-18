import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const LeasingHistory = ({ leasings }) => {
    const hasLeasing = leasings?.items?.length > 0;
    const leasingLength = hasLeasing ? leasings.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="leasing-history"
            sx={{ borderBottom: `6px solid ${hasLeasing ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasLeasing ? '#82DF49' : '#DF4949'}}>
                <img src={hasLeasing ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {leasingLength > 0 ? `Записи о лизинге: ${leasingLength}` : 'Нет сведений о лизинге'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasLeasing ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История лизинга
                    </Typography>
                </Box>
                {hasLeasing ? (
                    leasings?.items?.map((leasing, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {leasing?.date?.event && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {leasing.date.event.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {leasing?.tin && (
                                    <Typography className='text-item-report'>
                                        TIN:
                                        <span className='report-text-bold'> {leasing.tin}</span>
                                    </Typography>    
                                )}
                                {leasing?.lessor?.company?.name && (
                                    <Typography className='text-item-report'>
                                        Компания лизингодатель:
                                        <span className='report-text-bold'> {leasing.lessor.company.name}</span>
                                    </Typography>   
                                )}
                                {leasing?.company?.name && (
                                    <Typography className='text-item-report'>
                                        Компания лизингополучатель:
                                        <span className='report-text-bold'> {leasing.company.name}</span>
                                    </Typography>   
                                )}
                                {index !== leasingLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Сведений о лизинге не обнаружено</Typography>)}
            </Box>
        </Box>
    )
}

export default LeasingHistory