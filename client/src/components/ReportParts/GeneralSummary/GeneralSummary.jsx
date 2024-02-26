import { Box, Typography } from "@mui/material"
import { useMediaQuery } from '@mui/material';
import '../ReportStyles.css'

const GeneralSummary = ({ data }) => {
    const days = data?.ownership?.history?.usage?.days
    const isSmScreen = useMediaQuery('(max-width:600px)');

    const formatDuration = (days) => {
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;

        let result = '';
    
        if (years > 0) {
            result += `${years} ${years === 1 ? 'год' : years > 1 && years < 5 ? 'года' : 'лет'}`;
        }
    
        if (months > 0) {
            result += `${result ? ', ' : ''}${months} ${months === 1 ? 'месяц' : months > 1 && months < 5 ? 'месяца' : 'месяцев'}`;
        }
    
        if (remainingDays > 0) {
            result += `${result ? ', ' : ''}${remainingDays} ${remainingDays === 1 ? 'день' : remainingDays > 1 && remainingDays < 5 ? 'дня' : 'дней'}`;
        }

        return result || 'Срок эксплуатации не найден';
    };
    return (
        <Box 
            className="report-block-container" 
            id="general-summary"
            sx={{ borderBottom: '6px solid #498EDF' }}
        >
            <Box sx={{ marginLeft: '15px' }}>               
                <Box className='report-header-container'>
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Общая информация
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: isSmScreen ? 'column' : 'row' }}>
                    <Box sx={{ width: isSmScreen ? '100%' : '50%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Количество владельцев */}
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
                            {/* Срок эксплуатации */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.ownership?.history?.usage?.days ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Срок эксплуатации:
                                <span className='report-text-bold'>
                                    {days ? formatDuration(days) : 'Срок эксплуатации не найден'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* ДТП ГИБДД */}
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
                            {/* Ограничения ГИБДД */}
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
                            {/* Залоги */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Залоги:
                                <span className='report-text-bold'>
                                    {data?.pledges?.count ? ` ${data?.pledges?.count}` : ' Залоги не найдены'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Штрафы */}
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
                            {/* Наличие полиса ОСАГО */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.insurance?.has_osago ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Наличие полиса ОСАГО:
                                <span className='report-text-bold'>
                                    {data?.insurance?.has_osago ? ' Есть полис ОСАГО' : ' Нет полиса ОСАГО'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Пройденные техосмотры */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.inspections?.count ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Пройденные техосмотры:
                                <span className='report-text-bold'>
                                    {data?.inspections?.count ? ` ${data?.inspections?.count}` : ' Не проводились'}
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Использование в такси */}
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
                            {/* Использование в лизинге */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.leasing?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Использование в лизинге:
                                <span className='report-text-bold'>
                                    {data?.leasing?.count ? ' Было в лизинге' : ' Не было в лизинге'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Коммерческое использование */}
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
                            {/* Арбитраж */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.arbitration?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Арбитраж:
                                <span className='report-text-bold'>
                                    {data?.arbitration?.count ? ` ${data?.arbitration?.count}` : ' Нет информации об арбитраже'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Ремонтные работы */}
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Сервисное обслуживание */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.service?.count ? '#DF4949' : '#82DF49' }}
                            />
                            <Typography className='text-item-report'>
                                Сервисное обслуживание:
                                <span className='report-text-bold'>
                                    {data?.service?.count ? ` ${data?.service?.count}` : ' Не обслуживалось'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Таможня */}
                            <Box
                                className="report-indicator" 
                                sx={{ background: data?.customs?.history?.count ? '#82DF49' : '#DF4949' }}
                            />
                            <Typography className='text-item-report'>
                                Таможня:
                                <span className='report-text-bold'>
                                    {data?.customs?.history?.count ? ` ${data?.customs?.history?.count}` : ' Не найдено'}
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Фотографий */}
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default GeneralSummary;
