import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RegistrationActions = ({ registrationActions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasRegistrationActions = registrationActions?.items?.length > 0;
    const registrationActionsLength = hasRegistrationActions ? registrationActions.items.length : 0;

    return (
        <Box 
            className="report-block-container" 
            id="registration-history"
            sx={{ borderBottom: `6px solid ${hasRegistrationActions ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasRegistrationActions ? '#82DF49' : '#DF4949'}}>
                <img src={hasRegistrationActions ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {registrationActionsLength > 0 ? `Записи о регистрации: ${registrationActionsLength}` : 'Нет сведений о регистрации'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasRegistrationActions ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История регистраций
                    </Typography>
                </Box>
                {hasRegistrationActions ? (
                    <>
                        {isOpen ? '' : 
                            <Typography className="report-text-bold">
                                Записи о регистрационных действиях: {registrationActionsLength}. Нажмите по кнопке ниже чтобы ознакомиться с информацией
                            </Typography>
                        }
                        {isOpen ? (
                            <>
                                {registrationActions.items.map((registration, index) => (
                                    <Box key={index} sx={{ marginTop: '15px' }}>
                                        {registration?.date?.start && (
                                            <Typography className='text-item-report'>
                                                Дата начала:
                                                <span className='report-text-bold'> {registration.date.start.split(" ")[0]}</span>
                                            </Typography>    
                                        )}
                                        {registration?.date?.end && (
                                            <Typography className='text-item-report'>
                                                Дата окончания:
                                                <span className='report-text-bold'> {registration.date.end.split(" ")[0]}</span>
                                            </Typography>    
                                        )}
                                        {registration?.geo?.city && (
                                            <Typography className='text-item-report'>
                                                Город:
                                                <span className='report-text-bold'> {registration.geo.city}</span>
                                            </Typography>    
                                        )}
                                        {registration?.geo?.house && (
                                            <Typography className='text-item-report'>
                                                Дом:
                                                <span className='report-text-bold'> {registration.geo.house}</span>
                                            </Typography>    
                                        )}
                                        {registration?.geo?.street && (
                                            <Typography className='text-item-report'>
                                                Улица:
                                                <span className='report-text-bold'> {registration.geo.street}</span>
                                            </Typography>
                                        )}
                                        {registration?.identifiers?.pts && (
                                            <Typography className='text-item-report'>
                                                ПТС:
                                                <span className='report-text-bold'> {registration.identifiers.pts}</span>
                                            </Typography>
                                        )}
                                        {registration?.identifiers?.sts && (
                                            <Typography className='text-item-report'>
                                                СТС:
                                                <span className='report-text-bold'> {registration.identifiers.sts}</span>
                                            </Typography>
                                        )}
                                        {registration?.owner?.phone_number && (
                                            <Typography className='text-item-report'>
                                                Номер телефона:
                                                <span className='report-text-bold'> {registration.owner.phone_number}</span>
                                            </Typography>
                                        )}
                                        {registration?.owner?.org?.ogrn && (
                                            <Typography className='text-item-report'>
                                                ОГРН:
                                                <span className='report-text-bold'> {registration.owner.org.ogrn}</span>
                                            </Typography>
                                        )}
                                        {registration?.owner?.org?.tin && (
                                            <Typography className='text-item-report'>
                                                TIN:
                                                <span className='report-text-bold'> {registration.owner.org.tin}</span>
                                            </Typography>
                                        )}
                                        {registration?.type && (
                                            <Typography className='text-item-report'>
                                                Причина:
                                                <span className='report-text-bold'> {registration.type}</span>
                                            </Typography>
                                        )}
                                        {index !== registrationActionsLength - 1 && (
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
                ) : (<Typography className='report-text-bold'>Не обнаружено регистрационных действий</Typography>)}
            </Box>
        </Box>
    );
};

export default RegistrationActions;

// регистрационные действия