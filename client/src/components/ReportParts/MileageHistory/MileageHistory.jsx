import { Box, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';


const MileageHistory = ({ mileages }) => {
    const hasMileages = mileages?.items?.length > 0;
    const mileagesLength = hasMileages ? mileages?.items?.length : 0;
    const [hasDecreasingMileage, setHasDecreasingMileage] = useState(false);

    useEffect(() => {
        if (!Array.isArray(mileages?.items) || mileages?.items?.length === 0) {
            setHasDecreasingMileage(false);
        } else {
            let decreasing = false;
            for (let i = 1; i < mileages?.items?.length; i++) {
                if (mileages?.items[i]?.mileage <= mileages?.items[i - 1].mileage) {
                    decreasing = true;
                    break;
                }
            }
            setHasDecreasingMileage(decreasing);
        }
    }, [mileages]);

    return(
        <Box 
            id="mileage-history" 
            className="report-block-container"
            sx={{ borderBottom: `6px solid ${hasDecreasingMileage ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasDecreasingMileage ? '#DF4949' : '#82DF49' }}>
                <img src={hasDecreasingMileage ? dislike : like } alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {hasDecreasingMileage ? `Найдена скрутка пробега!` : 'Нет подозрений на скрутку!'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ 
                        background: hasDecreasingMileage ? '#DF4949' : '#82DF49', 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        marginRight: '10px' 
                    }} />
                    <Typography className='report-container-title' sx={{ marginBottom: '5px' }}>История пробега</Typography>                    
                </Box>

                {!mileages?.items || mileages.items.length === 0 ? (
                    <Typography className='report-text-bold'>Нет информации о пробеге автомобиля</Typography>
                ) : (
                    <Box sx={{ marginTop: '10px' }}>
                        {mileages?.items.map((mileage, index) => (
                            <Box key={index} className="mileage-block">
                                <Box sx={{ 
                                    backgroundColor: mileage.mileage < (mileages?.items[index - 1]?.mileage || 0) ? '#DF4949' : '#82DF49',
                                    borderRadius: '4px',
                                    padding: '0px 2px',
                                    marginRight: '5px',
                                }} />
                                <Typography className="text-item-report">
                                    Дата: <span className="report-text-bold">{mileage.date.event.split(" ")[0]}</span>
                                </Typography>
                                <Typography className="text-item-report" sx={{ marginLeft: '15px' }}>
                                    Пробег: <span className="report-text-bold">{mileage.mileage} км</span>
                                </Typography>
                            </Box>                    
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default MileageHistory