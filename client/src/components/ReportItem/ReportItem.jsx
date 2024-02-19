import { Box, Typography } from "@mui/material"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changeReportFavorite } from "../../api/Reports/ChangeReportFavoriteRequest";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './ReportItem.css'


const ReportItem = ({ report, token }) => {
    const [isFavorite, setIsFavorite] = useState(report.is_favorite || false)
    const codeName = {
        'GRZ': 'Госномер',
        'VIN': 'VIN код',
        'BODY': 'Номер кузова'
    }
    const navigate = useNavigate()

    const handleIconClick = () => {
        changeReportFavorite({
            uuid: report.uuid,
            is_favorite: !isFavorite,
            token: token,   
        })
        setIsFavorite(!isFavorite)
    }

    useEffect(() => {
        setIsFavorite(report.is_favorite);
    }, [report?.is_favorite]);

    return(
        <Box sx={{ width: '100%', marginBottom: '15px' }}>
            <Box 
                className='report-list-container'
                onClick={() => navigate(`/report/${report.uuid}`)}
            >
                <Box onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick();
                }}>
                    {isFavorite
                    ? <BookmarkOutlinedIcon sx={{ color: 'white' }} className='report-favorite-btn' />
                    : <BookmarkBorderIcon sx={{ color: 'white' }} className='report-favorite-btn' />}
                </Box>
                <ArrowForwardIosIcon className='report-arrow' />
                <Typography className='report-list-text'>🕒 Дата создания: {report.created_at}</Typography>
                <Typography className='report-list-text'>🆔 {codeName[report.body_type]}: {report.body}</Typography>
                <Typography className='report-list-text'>🚘 Транспортное средство: {report.model}</Typography>
            </Box>
        </Box>
    )
}

export default ReportItem