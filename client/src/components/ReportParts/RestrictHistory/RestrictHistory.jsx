import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const RestrictHistory = ({ restrictHistory }) => {
    const hasRestricts = restrictHistory?.items?.length > 0;
    const restrictLength = hasRestricts ? restrictHistory.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="restrict-history"
            sx={{ borderBottom: `6px solid ${hasRestricts ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasRestricts ? '#DF4949' : '#82DF49' }}>
                <img src={hasRestricts ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {restrictLength > 0 ? `Ограничений найдено: ${restrictLength}` : 'Ограничения не найдены'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasRestricts ? '#DF4949' : '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Ограничения
                    </Typography>
                </Box>
                {hasRestricts ? (
                    restrictHistory?.items?.map((restrict, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {restrict?.date?.start && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {restrict.date.start.split(" ")[0]}</span>
                                    </Typography>
                                )}
                                {restrict?.initiator?.name && (
                                    <Typography className='text-item-report'>
                                        Инициатор:
                                        <span className='report-text-bold'> {restrict.initiator.name}</span>
                                    </Typography>
                                )}
                                {restrict?.initiator?.region?.name && (
                                    <Typography className='text-item-report'>
                                        Регион:
                                        <span className='report-text-bold'> {restrict.initiator.region.name}</span>
                                    </Typography>
                                )}                                
                                {restrict?.restrict?.reason && (
                                    <Typography className='text-item-report'>
                                        Ограничение:
                                        <span className='report-text-bold'> {restrict.restrict.reason}</span>
                                    </Typography>
                                )}
                                {restrict?.restrict?.type && (
                                    <Typography className='text-item-report'>
                                        Тип:
                                        <span className='report-text-bold'> {restrict.restrict.type}</span>
                                    </Typography>
                                )}
                                {index !== restrictLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Ограничения не обнаружены</Typography>)}
            </Box>
        </Box>
    )
}

export default RestrictHistory