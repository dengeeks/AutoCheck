import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'
import { Fragment } from "react";


const ExecutiveProcedures = ({ executiveProcedures }) => {
    const hasExecutiveProcedures = executiveProcedures?.items?.length > 0;
    const executiveProceduresLength = hasExecutiveProcedures ? executiveProcedures.items.length : 0;

    return(
        <Box
            className="report-block-container" 
            id="executive-procedures"
            sx={{ borderBottom: `6px solid ${hasExecutiveProcedures ? '#DF4949' : '#82DF49'}` }}
        >
            <Box className='report-badge' sx={{ background: hasExecutiveProcedures ? '#DF4949' : '#82DF49'}}>
                <img src={hasExecutiveProcedures ? dislike : like} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {executiveProceduresLength > 0 ? `Исп. производства: ${executiveProceduresLength}` : 'Исп. производства отсутствуют'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasExecutiveProcedures ? '#DF4949' : '#82DF49'}}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        Исполнительные производства
                    </Typography>
                </Box>
                {hasExecutiveProcedures ? (
                    executiveProcedures?.items?.map((executiveProcedure, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {executiveProcedure?.date?.create && (
                                    <Typography className='text-item-report'>
                                        Дата:
                                        <span className='report-text-bold'> {executiveProcedure.date.create.split(" ")[0]}</span>
                                    </Typography>
                                )}
                                {executiveProcedure?.bailiff?.name && (
                                    <Fragment>
                                        <Typography className='report-text-bold'>
                                            Судебный исполнитель
                                        </Typography>
                                        <Box sx={{ marginLeft: '10px' }}>
                                            {executiveProcedure?.bailiff?.department?.name && (
                                                <Typography className='text-item-report'>
                                                    Название:
                                                    <span className='report-text-bold'> {executiveProcedure.bailiff.department.name}</span>
                                                </Typography>                                                
                                            )}
                                            {executiveProcedure?.bailiff?.department?.address && (
                                                <Typography className='text-item-report'>
                                                    Адресс:
                                                    <span className='report-text-bold'> {executiveProcedure.bailiff.department.address}</span>
                                                </Typography>                                                
                                            )}
                                            {executiveProcedure?.bailiff?.phone && (
                                                <Typography className='text-item-report'>
                                                    Номер телефона:
                                                    <span className='report-text-bold'> {executiveProcedure.bailiff.phone}</span>
                                                </Typography>                                                
                                            )}
                                            {executiveProcedure?.bailiff?.name && (
                                                <Typography className='text-item-report'>
                                                    ФИО исполнителя:
                                                    <span className='report-text-bold'> {executiveProcedure.bailiff.name}</span>
                                                </Typography>                                                
                                            )}
                                        </Box>                                        
                                    </Fragment>
                                )}
                                {executiveProcedure?.debt?.amount?.value && (
                                    <Typography className='text-item-report'>
                                        Долг:
                                        <span className='report-text-bold' style={{ color: '#DF4949' }}> -{executiveProcedure.debt.amount.value}₽</span>
                                    </Typography>
                                )}
                                {executiveProcedure?.description && (
                                    <Typography className='text-item-report'>
                                        Причина:
                                        <span className='report-text-bold'> {executiveProcedure.description}</span>
                                    </Typography>
                                )}
                                {executiveProcedure?.number && (
                                    <Typography className='text-item-report'>
                                        Номер:
                                        <span className='report-text-bold'> {executiveProcedure.number}</span>
                                    </Typography>
                                )}
                                {index !== executiveProceduresLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Исполнительные производства не обнаружены</Typography>)}
            </Box>
        </Box>
    )
}

export default ExecutiveProcedures