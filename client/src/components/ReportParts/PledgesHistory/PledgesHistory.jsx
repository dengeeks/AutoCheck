import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const PledgesHistory = ({ pledgesHistory }) => {
    const hasPledges = pledgesHistory?.items?.length > 0;
    const pledgesLength = hasPledges ? pledgesHistory.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="pledges-history"
            sx={{ borderBottom: `6px solid ${hasPledges ? '#DF4949' : '#82DF49' }` }}
        >
            <Box className='report-badge' sx={{ background: hasPledges ? '#DF4949' : '#82DF49'}}>
                <img src={hasPledges ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {pledgesLength > 0 ? `Обременения на ТС: ${pledgesLength}` : 'Нет обременений на ТС'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasPledges ?'#DF4949' : '#82DF49'  }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Обременения на ТС
                    </Typography>
                </Box>
                {hasPledges ? (
                    pledgesHistory?.items?.map((pledges, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {pledges?.date?.event && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {pledges.date.event.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {pledges?.pledgors?.length > 0 && (
                                    <>
                                        <Typography className='report-text-bold'>Поручители:</Typography>
                                        {pledges.pledgors.map((pledgor, index) => (
                                            <Box key={index} sx={{ marginLeft: '10px' }}>
                                                {pledgor?.name && (
                                                    <Typography className='text-item-report'>
                                                        ФИО:
                                                        <span className='report-text-bold'> {pledgor.name}</span>
                                                    </Typography>                                                    
                                                )}
                                                {pledgor?.dob && (
                                                    <Typography className='text-item-report'>
                                                        Дата рождения:
                                                        <span className='report-text-bold'> {pledgor.dob}</span>
                                                    </Typography>                                                    
                                                )}
                                                {pledgor?.type && (
                                                    <Typography className='text-item-report'>
                                                        Тип:
                                                        <span className='report-text-bold'>
                                                            {pledgor.type === 'PERSON' ? ' Физическое лицо' : ' Юридическое лицо'}
                                                        </span>
                                                    </Typography>                                                    
                                                )}
                                            </Box>
                                        ))}
                                    </>
                                )}
                                {pledges?.pledgees?.length > 0 && (
                                    <>
                                        <Typography className='report-text-bold'>Залогодержатели:</Typography>
                                        {pledges.pledgees.map((pledgee, index) => (
                                            <Box key={index} sx={{ marginLeft: '10px' }}>
                                                {pledgee?.name && (
                                                    <Typography className='text-item-report'>
                                                        ФИО:
                                                        <span className='report-text-bold'> {pledgee.name}</span>
                                                    </Typography>                                                    
                                                )}
                                                {pledgee?.type && (
                                                    <Typography className='text-item-report'>
                                                        Тип:
                                                        <span className='report-text-bold'>
                                                            {pledgee.type === 'PERSON' ? ' Физическое лицо' : ' Юридическое лицо'}
                                                        </span>
                                                    </Typography>                                                    
                                                )}
                                            </Box>
                                        ))}
                                    </>
                                )}
                                <Typography className='text-item-report'>
                                    Состояние:
                                        {pledges.in_pledge ? 
                                            <span className='report-text-bold' style={{ color: '#DF4949' }}> Находится в залоге</span>
                                        : 
                                            <span className='report-text-bold' style={{ color: '#82DF49' }}> Не находится в залоге</span>
                                        }
                                </Typography>
                                {pledges?.number && (
                                    <Typography className='text-item-report'>
                                        Номер:
                                        <span className='report-text-bold'> {pledges.number.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {index !== pledgesLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Обременения на ТС не обнаружены</Typography>)}
            </Box>
        </Box>
    )
}

export default PledgesHistory