import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const TaxiHistory = ({ taxiHistory }) => {
    const hasTaxi = taxiHistory?.items?.length > 0;
    const taxiLength = hasTaxi ? taxiHistory.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="taxi-history"
            sx={{ borderBottom: `6px solid ${hasTaxi ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasTaxi ? '#DF4949' : '#82DF49' }}>
                <img src={hasTaxi ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {taxiLength > 0 ? `Использовалось в такси: ${taxiLength}` : 'Не использовалось в такси'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasTaxi ? '#DF4949' : '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Работа в такси
                    </Typography>
                </Box>
                {hasTaxi ? (
                    taxiHistory?.items?.map((taxi, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {taxi?.license?.issued && (
                                    <Typography className='text-item-report'>
                                        Лицензия выдана:
                                        <span className='report-text-bold'> {taxi.license.issued.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {taxi?.date?.end && (
                                    <Typography className='text-item-report'>
                                        Дата истечения:
                                        <span className='report-text-bold'> {taxi.date.end.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {taxi?.company?.name && (
                                    <Typography className='text-item-report'>
                                        ФИО:
                                        <span className='report-text-bold'> {taxi.company.name}</span>
                                    </Typography>    
                                )}
                                {taxi?.license?.number && (
                                    <Typography className='text-item-report'>
                                        Номер лицензии:
                                        <span className='report-text-bold'> {taxi.license.number}</span>
                                    </Typography>    
                                )}
                                {taxi?.ogrn && (
                                    <Typography className='text-item-report'>
                                        ОГРН:
                                        <span className='report-text-bold'> {taxi.ogrn}</span>
                                    </Typography>    
                                )}
                                {taxi?.region?.code && (
                                    <Typography className='text-item-report'>
                                        Код региона:
                                        <span className='report-text-bold'> {taxi.region.code}</span>
                                    </Typography>    
                                )}
                                {taxi?.license?.status && (
                                    <Typography className='text-item-report'>
                                        Статаус:
                                        {taxi?.license?.status === 'ACTIVE' ? (
                                            <span className='report-text-bold' style={{ color: '#82DF49' }}> Активна</span>
                                        ) : (<span className='report-text-bold' style={{ color: '#DF4949' }}> Аннулирована</span>)}
                                    </Typography>    
                                )}
                                {index !== taxiLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Сведений о работе в такси не обнаружено</Typography>)}
            </Box>
        </Box>
    )
}

export default TaxiHistory