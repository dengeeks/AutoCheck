import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'

const AdsHistory = ({ ads }) => {
    const hasAds = ads?.items?.length > 0;
    const adsLength = hasAds ? ads?.items?.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="ads-history"
            sx={{ borderBottom: `6px solid ${hasAds ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasAds ? '#82DF49' : '#DF4949' }}>
                <img src={hasAds ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {adsLength > 0 ? `Обнаружено объявлений: ${adsLength}` : 'Объявления не найдены'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasAds ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История объявлений
                    </Typography>
                </Box>
                {hasAds ? (
                    ads?.items?.map((ad, index) => (
                        <Box key={index} sx={{ marginTop: '15px' }}>
                            {ad?.date?.publish && (
                                <Typography className="text-item-report">
                                    Дата публикации: <span className="report-text-bold">{ad.date.publish.split(" ")[0]}</span>
                                </Typography>
                            )}
                            {ad?.geo?.city && (
                                <Typography className="text-item-report">
                                    Город: <span className="report-text-bold">{ad.geo.city}</span>
                                </Typography>
                            )}
                            {ad?.text && (
                                <Typography className="text-item-report">
                                    Описание: <span className="report-text-bold">{ad.text}</span>
                                </Typography>
                            )}
                            {ad?.uri && (
                                <Typography className="text-item-report" onClick={() => window.open(ad.uri, '_blank')}>
                                    Ссылка: <span className="report-item-link">{ad.uri}</span>
                                </Typography>
                            )}
                            {ad?.vehicle?.mileage && (
                                <Typography className="text-item-report">
                                    Пробег: <span className="report-text-bold">{ad.vehicle.mileage} км</span>
                                </Typography>
                            )}
                            {ad?.vehicle?.condition && (
                                <Typography className="text-item-report">
                                    Состояние: <span className="report-text-bold">{ad.vehicle.condition}</span>
                                </Typography>
                            )}
                            {ad?.price?.value && (
                                <Typography className="text-item-report">
                                    Цена: <span className="report-text-bold" style={{ color: '#82DF49' }}>{ad.price.value} ₽</span>
                                </Typography>
                            )}
                            {index !== adsLength - 1 && (
                                <Box className='report-content-border' />
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography className='report-text-bold'>Объявления не найдены</Typography>
                )}            
            </Box>
        </Box>
    )
}

export default AdsHistory