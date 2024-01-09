import { Box, Typography } from "@mui/material"
import AdminUsersDataGrid from "../../../components/AdminPanel/AdminUsers/AdminUserDataGrid"
import '../../../styles/AdminData.css'
import AuthContext from "../../../context/AuthContext"
import { useContext, useState, useEffect } from "react"

import { resetDepartment } from "../../../api/resetDepartmentRequest"
import getUsersRequest from "../../../api/Admin/users/getUsersRequest"


const AdminUsers = () => {
    const {authTokens} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsersRequest({setData: setUsers, token: authTokens.access})
        resetDepartment({department: 'users', token: authTokens.access})
    }, [authTokens])       
    
    console.log(users, 'usre')

    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
                <Typography className='admin-data-title'>Пользователи</Typography>
            </Box>
            <AdminUsersDataGrid rows={users} />
        </Box>
    )
}

export default AdminUsers