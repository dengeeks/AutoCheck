import { Typography, Box } from "@mui/material"
import StarRating from "../StarRating/StarRating"
import { useNavigate } from "react-router-dom"
import "./ReviewCard.css"


const ReviewCard = ({ id, name, avatar, text, convenienceRating, qualityRating, informativenessRating }) => {   
    const navigate = useNavigate() 
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

    const navigateReviewPage = () => {
        navigate(`review/${id}`)
    }

    const truncatedText = truncateText(text, 100)
    return (
        <Box className="review-card-container" onClick={() => navigateReviewPage()}>
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