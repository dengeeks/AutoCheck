import { Box, Typography } from "@mui/material"
import like from '../../../media/images/like.png';
import dislike from '../../../media/images/dislike.png';
import '../ReportStyles.css'


const OwnershipHistory = ({ ownerships }) => {
    const hasOwnership = ownerships?.items?.length > 0;
    const ownershipLength = hasOwnership ? ownerships.items.length : 0;

    return(
        <Box 
            className="report-block-container" 
            id="ownership-history"
            sx={{ borderBottom: `6px solid ${hasOwnership ? '#82DF49' : '#DF4949'}` }}
        >
            <Box className='report-badge' sx={{ background: hasOwnership ? '#82DF49' : '#DF4949'}}>
                <img src={hasOwnership ? like : dislike} alt="badge" className='report-badge-img' />
                <Typography className="report-badge-text">
                    {ownershipLength > 0 ? `Записи о владельцах: ${ownershipLength}` : 'Нет сведений о владельцах'}
                </Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
                <Box className='report-header-container' >
                    <Box
                        className="report-indicator" 
                        sx={{ background: hasOwnership ? '#82DF49' : '#DF4949' }}
                    />
                    <Typography className="report-container-title" sx={{ marginBottom: '5px' }}>
                        История владения
                    </Typography>
                </Box>
                {hasOwnership ? (
                    ownerships?.items?.map((ownership, index) => {
                        return(
                            <Box key={index} sx={{ marginTop: '15px' }}>
                                {ownership?.date?.start && (
                                    <Typography className='text-item-report'>
                                        Дата начала владения:
                                        <span className='report-text-bold'> {ownership.date.start.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {ownership?.date?.end && (
                                    <Typography className='text-item-report'>
                                        Дата окончания владения:
                                        <span className='report-text-bold'> {ownership.date.end.split(" ")[0]}</span>
                                    </Typography>    
                                )}
                                {ownership?.owner?.type && (
                                    <Typography className='text-item-report'>
                                        Дата окончания владения:
                                        <span className='report-text-bold'>
                                            {ownership.owner.type === 'PERSON' ? ' Физическое лицо' : ' Юридическое лицо'}
                                        </span>
                                    </Typography>
                                )}
                                {ownership?.owner?.company?.name && (
                                    <Typography className='text-item-report'>
                                        Название компании:
                                        <span className='report-text-bold'>
                                            {ownership.owner.company.name}
                                        </span>
                                    </Typography>
                                )}
                                {ownership?.owner?.company?.ogrn && (
                                    <Typography className='text-item-report'>
                                        ОГРН:
                                        <span className='report-text-bold'> {ownership.owner.company.ogrn}</span>
                                    </Typography>
                                )}
                                {ownership?.owner?.company?.tin && (
                                    <Typography className='text-item-report'>
                                        ИНН:
                                        <span className='report-text-bold'> {ownership.owner.company.tin}</span>
                                    </Typography>
                                )}
                                {ownership?.owner?.company?.kpp && (
                                    <Typography className='text-item-report'>
                                        КПП:
                                        <span className='report-text-bold'> {ownership.owner.company.kpp}</span>
                                    </Typography>
                                )}
                                {index !== ownershipLength - 1 && (
                                    <Box className='report-content-border' />
                                )}
                            </Box>                                
                        )
                    })
                ) : (<Typography className='report-text-bold'>Сведения о владельцах не найдены</Typography>)}
            </Box>
        </Box>
    )
}

export default OwnershipHistory