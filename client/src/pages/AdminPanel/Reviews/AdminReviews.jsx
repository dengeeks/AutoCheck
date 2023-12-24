import {useContext, useState, useEffect} from "react"
import { Box, Typography } from "@mui/material"
import AdminReportDataGrid from "../../../components/AdminPanel/AdminReviews/AdminReviewDataGrid"
import { getAdminReviews } from "../../../api/admin/reviews/getAdminReviews"
import { resetDepartment } from "../../../api/resetDepartmentRequest"
import AuthContext from "../../../context/AuthContext"


const AdminReviews = () => {
    const {authTokens} = useContext(AuthContext)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getAdminReviews({setData: setReviews, token: authTokens.access})
        resetDepartment({department: 'reviews', token: authTokens.access})
    }, [authTokens])

    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Управление отзывами</Typography>
            </Box>
            <AdminReportDataGrid rows={reviews}/>
        </Box>
    )
}

export default AdminReviews