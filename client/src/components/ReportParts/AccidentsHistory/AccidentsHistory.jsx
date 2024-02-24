import { Box, Typography } from "@mui/material";
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'
import { Fragment, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AccidentsHistory = ({ accidents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasAccidents = accidents?.items?.length > 0;
    const accidentLength = hasAccidents ? accidents?.items?.length : 0;

    return (
        <Box 
            className="report-block-container" 
            id="accidents-history"
            sx={{ borderBottom: `6px solid ${hasAccidents ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasAccidents ? '#DF4949' : '#82DF49' }}>
                <img src={hasAccidents ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {accidentLength > 0 ? `Обнаружено ${accidentLength} ДТП` : 'ДТП не обнаружено'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container'>
                    <Box
                        className='report-indicator' 
                        sx={{ background: hasAccidents ? '#DF4949' : '#82DF49' }} 
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История ДТП
                    </Typography>
                </Box>
                {hasAccidents ? (
                    <>
                        {isOpen ? '' : 
                            <Typography className="report-text-bold">
                                Обнаружено ДТП: {accidentLength}. Нажмите по кнопке ниже чтобы ознакомиться с информацией
                            </Typography>
                        }
                        {isOpen ? (
                            <>
                                {accidents.items.map((accident, index) => (
                                    <Box key={index} sx={{ marginTop: '15px' }}>
                                        {accident?.accident?.date && (
                                            <Typography className="text-item-report">
                                                Дата: <span className="report-text-bold">{accident.accident.date.split(" ")[0]}</span>
                                            </Typography>
                                        )}
                                        {accident?.geo?.city && (
                                            <Typography className="text-item-report">
                                                Город: <span className="report-text-bold">{accident.geo.city}</span>
                                            </Typography>
                                        )}
                                        {accident?.participants?.total && (
                                            <Typography className="text-item-report">
                                                Участники ДТП: <span className="report-text-bold">{accident.participants.total}</span>
                                            </Typography>
                                        )}
                                        {accident?.state && (
                                            <Typography className="text-item-report">
                                                Состояние: <span className="report-text-bold">{accident.state}</span>
                                            </Typography>
                                        )}
                                        {accident?.type && (
                                            <Typography className="text-item-report">
                                                Тип ДТП: <span className="report-text-bold">{accident.type}</span>
                                            </Typography>
                                        )}
                                        {accident?.damage?.raw && (
                                            <Typography className="text-item-report">
                                                Ущерб: <span className="report-text-bold">{accident.damage.raw}</span>
                                            </Typography>
                                        )}
                                        {accident?.other_participants ? (
                                            <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                                                {accident?.other_participants?.map((participant, index) => {
                                                    return(
                                                        <Fragment key={index}>
                                                            <Typography className='report-text-bold'>Участник {index + 1}</Typography>
                                                            <Box sx={{ marginLeft: '10px' }}>
                                                                {participant?.type && (
                                                                    <Typography className='text-item-report'>
                                                                    Тип ДТП: <span className="report-text-bold">{participant.type}</span>
                                                                    </Typography>
                                                                )}
                                                                {participant?.vehicle?.model?.name && (
                                                                    <Typography className='text-item-report'>
                                                                        Автомобиль: 
                                                                        <span className="report-text-bold">
                                                                            {` ${participant?.vehicle?.brand?.name} ${participant.vehicle.model.name}`} 
                                                                        </span>
                                                                    </Typography>
                                                                )}
                                                                {participant?.damage?.raw && (
                                                                    <Typography className='text-item-report'>
                                                                        Повреждено: <span className="report-text-bold">{participant.damage.raw}</span>
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Fragment>
                                                    )
                                                })}
                                            </Box>
                                        ) : <Typography>Участники ДТП не обнаружены</Typography>}
                                        {accident?.number && (
                                            <Typography className="text-item-report">
                                                Номер: <span className="report-text-bold">{accident.number}</span>
                                            </Typography>
                                        )}
                                        {index !== accidentLength - 1 && (
                                            <Box className='report-content-border' />
                                        )}
                                    </Box>
                                ))}
                                <Box className='switch-content-container' onClick={() => setIsOpen(false)}>
                                    <Typography className="switch-content-text">
                                        Закрыть
                                    </Typography>       
                                    <KeyboardArrowUpIcon />
                                </Box>
                            </>
                        ) : (
                            <Box className='switch-content-container' onClick={() => setIsOpen(true)}>
                                <Typography className="switch-content-text">
                                    Открыть
                                </Typography>
                                <KeyboardArrowDownIcon />
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography className='report-text-bold'>ДТП не обнаружено</Typography>
                )}
            </Box>
        </Box>
    );
};

export default AccidentsHistory;