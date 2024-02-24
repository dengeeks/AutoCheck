import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../ReportStyles.css'


const FinesHistory = ({ fines }) => {
    const hasFines = fines?.items?.length > 0;
    const finesLength = hasFines ? fines?.items?.length : 0;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            className="report-block-container"
            id="fines-history"
            sx={{ borderBottom: `6px solid ${hasFines ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasFines ? '#DF4949' : '#82DF49' }}>
                <img src={hasFines ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {finesLength > 0 ? `Найдено штрафов: ${finesLength} ` : 'Штрафы не найдены'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator"
                        sx={{ background: hasFines ? '#DF4949' : '#82DF49' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История штрафов
                    </Typography>
                </Box>
                {hasFines ? (
                    <> 
                        {isOpen ? '' : 
                            <Typography className="report-text-bold">
                                Обнаружено штрафов: {finesLength}. Нажмите по кнопке ниже чтобы ознакомиться с информацией
                            </Typography>
                        }
                        {isOpen ? (
                            <>
                                {fines?.items?.map((fines, index) => (
                                    <Box key={index} sx={{ marginTop: '15px', position: 'relative' }}>
                                        <Box
                                            sx={{
                                                backgroundColor: `${fines?.is_paid ? '#82DF49' : '#DF4949'}`,
                                                borderRadius: '4px',
                                                padding: '0px 2px',
                                                marginRight: '5px',
                                                height: '100%',
                                                width: '1px',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0
                                            }}
                                        />
                                        <Box sx={{ marginLeft: '10px' }}>
                                            {fines?.date?.accident && (
                                                <Typography className="text-item-report">
                                                    Дата: 
                                                    <span className="report-text-bold">
                                                        {` ${fines.date.accident.split(" ")[0]}`}
                                                    </span>
                                                </Typography>
                                            )}
                                            {fines?.amount?.total && (
                                                <Typography className="text-item-report">
                                                    Сумма: 
                                                    <span 
                                                        className="report-text-bold" 
                                                        style={{ color: '#DF4949' }}
                                                    > 
                                                        {` -${fines.amount.total}₽`}
                                                    </span>
                                                </Typography>
                                            )}
                                            {fines?.article?.description && (
                                                <Typography className="text-item-report">
                                                    Причина: 
                                                    <span className="report-text-bold"> 
                                                        {` ${fines.article.description}`}
                                                    </span>
                                                </Typography>
                                            )}
                                            {fines?.vendor?.name && (
                                                <Typography className="text-item-report">
                                                    От: 
                                                    <span className="report-text-bold"> 
                                                        {` ${fines.vendor.name}`}
                                                    </span>
                                                </Typography>
                                            )}
                                            {fines?.uin && (
                                                <Typography className="text-item-report">
                                                    УИН: 
                                                    <span className="report-text-bold"> 
                                                        {` ${fines.uin}`}
                                                    </span>
                                                </Typography>                                        
                                            )}
                                            {fines?.payer?.name && (
                                                <Typography className="text-item-report">
                                                    Оплатил:
                                                    <span className="report-text-bold"> 
                                                        {` ${fines.payer.name}`}
                                                    </span>
                                                </Typography>                                        
                                            )}
                                            {fines?.need_payment ? (
                                                <Typography className="report-text-bold" sx={{ color: fines?.is_paid ? '#82DF49' : '#DF4949' }}>
                                                    {fines.is_paid ? 'Оплачен' : 'Не оплачен'} | Штраф нужно оплатить
                                                </Typography>      
                                            ) : (
                                                <Typography className="report-text-bold"  sx={{ color: '#82DF49' }}>
                                                    {fines.is_paid ? 'Оплачен' : 'Не оплачен'} | Штраф не нужно оплачивать
                                                </Typography>         
                                            )}
                                        </Box>
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
                ) : (<Typography className='report-text-bold'>Штрафы не обнаружены</Typography>)}
            </Box>
        </Box>
    );
}

export default FinesHistory;