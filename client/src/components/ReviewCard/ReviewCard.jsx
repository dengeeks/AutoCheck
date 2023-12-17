import { Typography, Box } from "@mui/material"
import StarRating from "../StarRating/StarRating"
import "./ReviewCard.css"


const ReviewCard = ({ name, avatar, text, convenienceRating, qualityRating, informativenessRating }) => {
    const truncatedText = text.length > 40 ? `${text.slice(0, 100)}...` : text;

    const handleRatingChange = (value) => {
        console.log(`Selected rating: ${value}`);
    };
    console.log(avatar)      
    return (
        <Box className="review-card-container">
            <Box className="review-card-header">
                <img className="review-card-avatar" src={avatar} alt="" />
                <Typography className="review-card-user-name">{name}</Typography>
            </Box>
            
            <Typography className="review-card-text" sx={{ marginBottom: '15px', wordBreak: 'break-all' }}>{truncatedText}</Typography>

            <Typography className="star-rating-text" >Удобство</Typography>
            <StarRating readOnly={true} onChange={handleRatingChange} defaultValue={convenienceRating} />
            <Typography className="star-rating-text" >Качество</Typography>
            <StarRating readOnly={true} onChange={handleRatingChange} defaultValue={qualityRating} />
            <Typography className="star-rating-text">Информативность</Typography>
            <StarRating readOnly={true} onChange={handleRatingChange} defaultValue={informativenessRating} />
        </Box>
    )
}

export default ReviewCard