import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'

const DiagnosticCards = ({ diagnosticCards }) => {
    const hasDiagnosticCards = diagnosticCards?.items?.length > 0;
    const diagnosticCardsLength = hasDiagnosticCards ? diagnosticCards.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="diagnostic-cards"
            sx={{ borderBottom: `6px solid ${hasDiagnosticCards ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasDiagnosticCards ? '#82DF49' : '#DF4949'}}>
                <img src={hasDiagnosticCards ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {hasDiagnosticCards ? `Диагностических карт: ${diagnosticCardsLength}` : 'Нет диагностических карт'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasDiagnosticCards ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История диагностических карт
                    </Typography>
                </Box>
                        {hasDiagnosticCards ? (
                            diagnosticCards?.items?.map((diagnosticCard, index) => (
                                <Box key={index} sx={{ marginTop: '15px' }}>
                                    {diagnosticCard?.date?.from && (
                                        <Typography className='text-item-report'>
                                            Дата начала:
                                            <span className='report-text-bold'> {diagnosticCard.date.from.split(" ")[0]}</span>
                                        </Typography>    
                                    )}
                                    {diagnosticCard?.date?.to && (
                                        <Typography className='text-item-report'>
                                            Дата окончания:
                                            <span className='report-text-bold'> {diagnosticCard.date.to.split(" ")[0]}</span>
                                        </Typography>    
                                    )}
                                    {diagnosticCard?.doc?.number && (
                                        <Typography className='text-item-report'>
                                            Номер:
                                            <span className='report-text-bold'> {diagnosticCard.doc.number}</span>
                                        </Typography>    
                                    )}
                                    {diagnosticCard?.inspection?.place && (
                                        <Typography className='text-item-report'>
                                            Место:
                                            <span className='report-text-bold'> {diagnosticCard.inspection.place}</span>
                                        </Typography>    
                                    )}
                                    {index !== diagnosticCardsLength - 1 && (
                                        <Box className='report-content-border' />
                                    )}
                                </Box>                                
                            ))
                        ) : (
                            <Typography className='report-text-bold'>Не обнаружено диагностических карт</Typography>
                        )}
            </Box>
        </Box>
    )
}

export default DiagnosticCards;
