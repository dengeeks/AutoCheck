import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const InsuranceHistory = ({ insurances }) => {
    const hasInsurance = insurances?.items?.length > 0;
    const insuranceLength = hasInsurance ? insurances.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="insurance-history"
            sx={{ borderBottom: `6px solid ${hasInsurance ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasInsurance ? '#82DF49' : '#DF4949'}}>
                <img src={hasInsurance ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {insuranceLength > 0 ? `Найдено страхований: ${insuranceLength}` : 'Страхования не найдены'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasInsurance ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История страхования
                    </Typography>
                </Box>
                {hasInsurance ? (
                    insurances?.items?.map((insurance, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {insurance?.date?.created && (
                                    <Typography className='text-item-report'>
                                        Дата получения:
                                        <span className='report-text-bold'>
                                            {` ${insurance.date.created.split(" ")[0]}`}
                                        </span>
                                    </Typography>
                                )}
                                {insurance?.date?.end && (
                                    <Typography className='text-item-report'>
                                        Дата истечения:
                                        <span className='report-text-bold'>
                                            {` ${insurance.date.end.split(" ")[0]}`}
                                        </span>
                                    </Typography>
                                )}
                                {insurance?.contract?.amount.value && (
                                    <Typography className='text-item-report'>
                                        Цена:
                                        <span className='report-text-bold' style={{ color: '#82DF49' }}>
                                            {` ${insurance.contract.amount.value}₽`}
                                        </span>
                                    </Typography>
                                )}
                                {insurance?.contract?.is_active ? (
                                    <Typography className='text-item-report'>
                                        Статус:
                                        <span className='report-text-bold'> Активен</span>
                                    </Typography>
                                ) : (
                                    <Typography className='text-item-report'>
                                        Статус:
                                        <span className='report-text-bold'> Не активен</span>
                                    </Typography>
                                )}
                                {insurance?.contract?.kbm && (
                                    <Typography className='text-item-report'>
                                        КБМ:
                                        <span className='report-text-bold'> {insurance.contract.kbm}</span>
                                    </Typography>    
                                )}
                                {insurance?.contract?.using_type?.description && (
                                    <Typography className='text-item-report'>
                                        Тип использования:
                                        <span className='report-text-bold'> {insurance.contract.using_type.description}</span>
                                    </Typography>    
                                )}
                                {insurance?.number && (
                                    <Typography className='text-item-report'>
                                        Номер:
                                        <span className='report-text-bold'> {insurance.number}</span>
                                    </Typography>    
                                )}
                                {index !== insuranceLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Страхований не найдено</Typography>)}
            </Box>
        </Box>
    )
}

export default InsuranceHistory