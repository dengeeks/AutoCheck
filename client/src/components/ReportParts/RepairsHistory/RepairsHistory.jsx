import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const RepairsHistory = ({ repairs }) => {
    const hasRepairs = repairs?.items?.length > 0;
    const repairsLength = hasRepairs ? repairs.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="repairs-history"
            sx={{ borderBottom: `6px solid ${hasRepairs ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasRepairs ? '#DF4949' : '#82DF49'}}>
                <img src={hasRepairs ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {repairsLength > 0 ? `Записи о ремонте: ${repairsLength}` : 'Нет сведений о ремонте'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasRepairs ? '#DF4949' : '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Ремонтные работы
                    </Typography>
                </Box>
                {hasRepairs ? (
                    repairs?.items?.map((repair, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {repair?.date?.event && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {repair.date.event.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {index !== repairsLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Сведений о ремонтных работах не обнаружено</Typography>)}
            </Box>
        </Box>
    )
}

export default RepairsHistory