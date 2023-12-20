import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import { getOneReview } from "../../../api/admin/reviews/getOneAdminReview"
import { deleteReview } from "../../../api/admin/reviews/deleteAdminReview"
import { changeReview } from "../../../api/admin/reviews/changeAdminReview"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import Loader from "../../../components/Loader/Loader"
import StarRating from "../../../components/StarRating/StarRating"
import '../../../styles/AdminChangeForm.css'


const AdminReviewChange = () => {
    const { authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState({})
    const [editedReview, setEditedReview] = useState({ user_name: '', text: '', convenience_rating: 0, informativeness_rating: 0, quality_rating: 0, is_allowed: false });
    const { id } = useParams();

    const navigate = useNavigate()
  
    useEffect(() => {
      getOneReview({ id: id, token: authTokens.access, setData: setReviews, setLoading: setLoading });
    }, [id, authTokens.access]);
  
    useEffect(() => {
        setEditedReview({ ...reviews });
    }, [reviews]);
  
    const handleInputChange = (fieldName, value) => {
        setEditedReview((prev) => ({ ...prev, [fieldName]: value }));
    };
  
    const handleSaveReview = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            changeReview({
                id: id,
                is_allowed: true,
                token: authTokens.access
            })
            navigate('/admin/reviews')
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteReview({
                id: id,
                token: authTokens.access
            })
            navigate('/admin/reviews')
        }
    }
  
    if (loading) {
      return <Loader />;
    }
  
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
            <Box className='admin-change-form-header'>
                <Typography className='admin-change-from-title'>Отзыв номер {id}</Typography>
            </Box>
            <Box className='admin-change-from'>
                <TextField
                className='admin-change-form-field'
                label="Пользователь"
                disabled
                rows={6}
                value={editedReview?.user_name || ''}
                type='text'
            />
                <TextField
                    className='admin-change-form-field'
                    label="Отзыв"
                    rows={6}
                    value={editedReview?.text || ''}
                    disabled
                    type='text'
                />
                <TextField
                    className='admin-change-form-field'
                    label="Удобство"
                    disabled
                    value={editedReview?.convenience_rating || ''}
                />
                <TextField
                    className='admin-change-form-field'
                    label="Информативность"
                    disabled
                    value={editedReview?.informativeness_rating || ''}
                />
                <TextField
                    className='admin-change-form-field'
                    label="Качество"
                    disabled
                    value={editedReview?.quality_rating || ''}
                />
                <Box className='admin-change-form-footer'>
                    {editedReview?.is_allowed ? '' : <Button className='admin-change-save-btn' onClick={handleSaveReview}>Одобрить</Button>}
                    <Button
                        className='admin-change-delete-btn'
                        sx={editedReview?.is_allowed ? { width: '100%'} : {} }
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
  
export default AdminReviewChange;
  
  