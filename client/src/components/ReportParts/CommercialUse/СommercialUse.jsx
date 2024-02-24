import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const CommercialUse = ({ commercialUse }) => {
    const hasCommercialUse = commercialUse?.items?.length > 0;
    const commercialUseLength = hasCommercialUse ? commercialUse.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="commercial-history"
            sx={{ borderBottom: `6px solid ${hasCommercialUse ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasCommercialUse ? '#DF4949' : '#82DF49'}}>
                <img src={hasCommercialUse ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {commercialUseLength > 0 ? `Комм. использование: ${commercialUseLength}` : 'Нет комм. использования'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasCommercialUse ? '#DF4949' : '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Коммерческое использование
                    </Typography>
                </Box>
                {hasCommercialUse ? (
                    commercialUse?.items?.map((commercial, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {commercial?.company?.name && (
                                    <Typography className='text-item-report'>
                                        Наименование компании:
                                        <span className='report-text-bold'> {commercial.company.name}</span>
                                    </Typography>    
                                )}
                                {commercial?.company?.tin && (
                                    <Typography className='text-item-report'>
                                        ИНН компании:
                                        <span className='report-text-bold'> {commercial.company.tin}</span>
                                    </Typography>    
                                )}
                                {index !== commercialUseLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Не найдено информации о коммерческом использовании</Typography>)}
            </Box>
        </Box>
    )
}

export default CommercialUse