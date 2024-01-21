import StarRating from "../../components/StarRating/StarRating"
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { getOneReviewRequest } from "../../api/getOneReviewRequest"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import LikeDislikeImg from "../../media/images/likeDislike.jpg"
import CommentImg from "../../media/images/comment.png"
import './Review.css'

const ReviewPage = () => {
    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const {id} = useParams()

    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;

    useEffect(() => {
        getOneReviewRequest({id: id, setData: setReview, setIsLoading: setIsLoading})
    }, [id])

    const navigateToNextReview = () => {
        navigate(`/review/${review?.next_review}`)
        window.location.reload();

    }

    const navigateToPrevReview = () => {
        navigate(`/review/${review?.prev_review}`)
        window.location.reload();
    }
    console.log(review, review?.convenience_rating)
    if (isLoading) {
        return(
            <Loader />
        )
    }
    return(
        <Container sx={{ paddingTop: '25px' }}>
            <Grid item container sx={{ marginTop: '25px', marginBottom: '20vh' }}>
                <Grid container xs={12} sx={{ marginBottom: '70px' }} className="review-page-header">
                    <Grid item xs={6} sx={{ textAlign: 'center' }}>
                        <img src={`${BASE_URL_WITHOUT_PREFIX}${review?.user_avatar}`} alt="avatar" className='review-user-avatar' />
                        <Typography className="review-user-name">{review?.user_name}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <img src={LikeDislikeImg} alt="оценка" className="like-dislike-review-img"/>
                        </Box>
                    
                        <Box className='review-rating-container'>
                            <Typography className="rating-review-text">Удобство</Typography>
                            <StarRating defaultValue={review?.convenience_rating} /> 
                        </Box>
                        <Box className='review-rating-container'>
                            <Typography className="rating-review-text">Качество</Typography>
                            <StarRating defaultValue={review?.quality_rating} />
                        </Box>
                        <Box className='review-rating-container'>
                            <Typography className="rating-review-text">Информативность</Typography>
                            <StarRating defaultValue={review?.informativeness_rating} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <img src={CommentImg} alt="отзыв" className="review-comment-img" />
                </Grid>
                <Grid item xs={8}> 
                    <Typography className="review-page-content">
                        {review?.text}
                    </Typography>
                </Grid>
                <Box sx={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                    <Button
                        className='review-pagination-button'
                        onClick={() => navigateToPrevReview()}
                        disabled={!review?.prev_review}
                    >
                        Предыдущий отзыв
                    </Button>    
                    <Button
                        className='review-pagination-button'
                        onClick={() => navigateToNextReview()}
                        disabled={!review?.next_review}
                    >
                        Следующий отзыв
                    </Button>
                </Box>
            </Grid>
        </Container>
    )
}

export default ReviewPage