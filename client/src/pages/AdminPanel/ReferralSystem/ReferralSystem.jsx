import { Box, Typography } from "@mui/material"
import AdminReferralSystemDataGrid from "../../../components/AdminPanel/AdminReferralSystem/ReferralSystemDataGrid"
import { getAdminAllReferrals } from "../../../api/Admin/referrals/getAllReferrals"
import { useEffect, useContext, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { resetDepartment } from "../../../api/resetDepartmentRequest"


const AdminReferralSystem = () => {
    const {authTokens} = useContext(AuthContext)
    const [referralData, setReferralData] = useState([])

    useEffect(() => {
        getAdminAllReferrals({setData: setReferralData, token: authTokens.access})
        resetDepartment({department: 'referral', token: authTokens.access})
    }, [authTokens])

    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Реферальная система</Typography>
            </Box>
            <AdminReferralSystemDataGrid rows={referralData} />
        </Box>
    )
}

export default AdminReferralSystem