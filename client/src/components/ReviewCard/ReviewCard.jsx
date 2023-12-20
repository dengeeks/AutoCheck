import { Typography, Box } from "@mui/material"
import StarRating from "../StarRating/StarRating"
import "./ReviewCard.css"


const ReviewCard = ({ name, avatar, text, convenienceRating, qualityRating, informativenessRating }) => {    
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
          return text;
        }      
        const truncatedText = text.substring(0, maxLength);      
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');      

        if (lastSpaceIndex !== -1) {
          return truncatedText.substring(0, lastSpaceIndex) + '...';
        }      
        return truncatedText + '...';
    }

    const truncatedText = truncateText(text, 100)
    return (
        <Box className="review-card-container">
            <Box className="review-card-header">
                <img className="review-card-avatar" src={avatar} alt="" />
                <Typography className="review-card-user-name">{name}</Typography>
            </Box>
            
            <Typography className="review-card-text" sx={{ marginBottom: '15px', wordBreak: 'break-word' }}>{truncatedText}</Typography>

            <Typography className="star-rating-text" >Удобство</Typography>
            <StarRating readOnly={true} defaultValue={convenienceRating} />
            <Typography className="star-rating-text" >Качество</Typography>
            <StarRating readOnly={true} defaultValue={qualityRating} />
            <Typography className="star-rating-text">Информативность</Typography>
            <StarRating readOnly={true} defaultValue={informativenessRating} />
        </Box>
    )
}

export default ReviewCard