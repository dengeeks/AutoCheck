import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const CustomsHistory = ({ customs }) => {
    const hasCustoms = customs?.items?.length > 0;
    const customsLength = hasCustoms ? customs.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="customs-history"
            sx={{ borderBottom: `6px solid #82DF49` }}
        >
            <Box className='report-badge' sx={{ background: '#82DF49'}}>
                <img src={like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {customsLength > 0 ? `Таможенные процедуры: ${customsLength}` : 'Нет таможенных процедур'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Таможенные процедуры 
                    </Typography>
                </Box>
                {hasCustoms ? (
                    customs?.items?.map((custom, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {custom?.date?.event && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {custom.date.event.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {custom?.price?.amount && (
                                    <Typography className='text-item-report'>
                                        Стоимость:
                                        <span className='report-text-bold'> {custom.price.amount}₽</span>
                                    </Typography>
                                )}
                                {custom?.document && (
                                    <Typography className='text-item-report'>
                                        Документы:
                                        {custom.document.name && (
                                            <span className='report-text-bold'> {custom.document.name}</span>
                                        )}
                                        {custom.document.number && (
                                            <span className='report-text-bold'> {custom.document.number}</span>
                                        )}
                                    </Typography>
                                )}
                                {custom?.org?.name && (
                                    <Typography className='text-item-report'>
                                        Название организации:
                                        <span className='report-text-bold'> {custom.org.name}</span>
                                    </Typography>
                                )}
                                {custom?.country?.from?.name && (
                                    <Typography className='text-item-report'>
                                        Страна отправления:
                                        <span className='report-text-bold'> {custom.country.from.name}</span>
                                    </Typography>
                                )}
                                {custom?.country?.to?.name && (
                                    <Typography className='text-item-report'>
                                        Страна назначения:
                                        <span className='report-text-bold'> {custom.country.to.name}</span>
                                    </Typography>
                                )}
                                {index !== customsLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Сведений о прохождении таможни не найдено</Typography>)}
            </Box>
        </Box>
    )
}

export default CustomsHistory