import { Modal, Box, TextField, Typography, Button} from "@mui/material"
import StarRating from "../StarRating/StarRating"
import CloseIcon from '@mui/icons-material/Close';
import "./FormReviewModal.css"
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import { createReviewRequest } from "../../api/createReviewRequest";
import { validateReviewForm } from "./validateReviewForm";


const FormReviewModal = ({ open, onClose, setData }) => {
    const {user, logoutUser, authTokens} = useContext(AuthContext)
    const [text, setText] = useState('')
    const [convenienceRating, setConvenienceRating] = useState(0)
    const [informativenessRating, setInformativenessRating] = useState(0)
    const [qualityRating, setQualityRating] = useState(0)
    const [error, setError] = useState({text: ''})

    const navigate = useNavigate()

    const handleReviewSubmit = () => {
        if (!authTokens) {
            navigate('/login')
        } else {
            if (validateReviewForm({ text: text, setError: setError })) {
                createReviewRequest({
                    user:user.user_id, 
                    text:text, 
                    convenience:convenienceRating, 
                    informativeness:informativenessRating, 
                    quality:qualityRating, 
                    tokens: authTokens.access
                })

                onClose()
            }
        }
    }

    const handleConvenienceRatingChange = (newValue) => {
        setConvenienceRating(newValue);
    };    
    const handleInformativenessRatingChange = (newValue) => {
        setInformativenessRating(newValue);
    };
    const handleQualityRatingChange = (newValue) => {
        setQualityRating(newValue);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="review-form-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='review-form-header'>
                    <Typography className='review-form-header-text'>Оставить отзыв</Typography>
                    <CloseIcon sx={{ fontSize: '26px', color: 'white' }} onClick={onClose} />
                </Box>

                <Box sx={{ padding: '30px' }}>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        className="review-text-field"
                        onChange={(e) => setText(e.target.value)}
                        error={error.text}
                        helperText={error.text}
                        label="Ваш отзыв" />

                    <Box sx={{ marginTop: '30px' }} className='form-star-rating-container'>
                        <Typography className="review-form-text">Удобство</Typography>
                        <StarRating readOnly={false} onChange={handleConvenienceRatingChange} />
                    </Box>
                    <Box className='form-star-rating-container'>
                        <Typography className="review-form-text">Качество</Typography>
                        <StarRating readOnly={false} onChange={handleQualityRatingChange} />
                    </Box>
                    <Box className='form-star-rating-container'>
                        <Typography className="review-form-text">Информативность</Typography>
                        <StarRating readOnly={false} onChange={handleInformativenessRatingChange} />
                    </Box>
                    
                    <Box className="review-form-button-container">
                        
                        <Button 
                            className={
                                convenienceRating === 0 || informativenessRating === 0 || qualityRating === 0 ||
                                convenienceRating === null || informativenessRating === null || qualityRating === null
                                ? 'review-disable-button'
                                : 'review-active-button'
                            }
                            onClick={handleReviewSubmit}
                            disabled={
                                convenienceRating === 0 ||
                                informativenessRating === 0 ||
                                qualityRating === 0 ||
                                convenienceRating === null ||
                                informativenessRating === null ||
                                qualityRating === null
                            }
                        >
                            Отправить отзыв
                        </Button>
                    </Box>
                    
                </Box>
                
            </Box>
        </Modal>
    )
}

export default FormReviewModal