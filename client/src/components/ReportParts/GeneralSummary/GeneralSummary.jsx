import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'
import { Fragment } from "react";

const GeneralSummary = ({ data }) => {
    console.log(data)
    return (
        <Box 
            className="report-block-container" 
            id="leasing-history"
        >
            <Box sx={{ marginLeft: '15px' }}>               
                <Box className='report-header-container'>
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Общая информация
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.images?.photos?.count ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Фотографии:
                                <span className='report-text-bold'>
                                    {data?.images?.photos?.count ? ` ${data.images.photos.count}` : ' Не найдено фотографий'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.ownership?.history?.count ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Количество владельцев:
                                <span className='report-text-bold'>
                                    {data?.ownership?.history?.count ? ` ${data.ownership.history.count}` : ' Не найдено владельцев'}
                                </span>
                            </Typography>                            
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.ownership?.history?.usage?.days ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Срок эксплуатации:
                                <span className='report-text-bold'>
                                    {data?.ownership?.history?.usage?.days ?
                                        ` ${data.ownership.history.usage.days} дней` :
                                        ' Срок эксплуатации не найден'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.restrictions?.registration_actions_archive?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Ограничения ГИБДД:
                                <span className='report-text-bold'> 
                                    {data?.restrictions?.registration_actions_archive?.count 
                                    ? 
                                    ` ${data.restrictions.registration_actions_archive.count}` 
                                    : 
                                    ' Нет ограничений'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.accidents?.has_accidents ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                ДТП ГИБДД:
                                <span className='report-text-bold'> 
                                    {data?.accidents?.history?.count
                                    ?
                                    ` ${data.accidents.history.count}`
                                    : 
                                    ' Не найдено ДТП'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.repairs?.history?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Ремонтные работы:
                                <span className='report-text-bold'>
                                    {data?.repairs?.history?.count ? ` ${data.repairs.history.count}` : ' Не найдено'}
                                </span>
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.fines?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Штрафы:
                                <span className='report-text-bold'>
                                    {data?.fines?.count ? ` ${data?.fines?.count}` : ' Штрафы не обнаружены'}
                                </span>
                            </Typography>                            
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.leasings?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Лизинг:
                                <span className='report-text-bold'>
                                    {data?.leasings?.count ? ' Было в лизинге' : ' Не было в лизинге'}
                                </span>
                            </Typography>                            
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.commercial_use?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Коммерческое использование:
                                <span className='report-text-bold'>
                                    {data?.commercial_use?.count ? ' Использовалось' : ' Не использовалось'}
                                </span>
                            </Typography>                            
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.taxi?.used_in_taxi ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Использование в такси:
                                <span className='report-text-bold'>
                                    {data?.taxi?.used_in_taxi ? ' Использовалось' : ' Не использовалось'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Сервисное обслуживание:
                                <span className='report-text-bold'>
                                    {data?.service_history?.count ? ` ${data?.service_history?.count}` : ' Не обслуживалось'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className="report-indicator" 
                                sx={{ background: '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Таможня:
                                <span className='report-text-bold'>
                                    {data?.customs?.history?.count ? ` ${data?.customs?.history?.count}` : ' Не найдено'}
                                </span>
                            </Typography>
                        </Box>
                    </Box>                    
                </Box>

            </Box>
        </Box>
    );
}

export default GeneralSummary;
