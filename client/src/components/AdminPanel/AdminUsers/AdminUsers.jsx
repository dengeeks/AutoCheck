import { Box, Typography } from "@mui/material"
import AdminUsersDataGrid from "./AdminUserDataGrid"
import getUsersRequest from "../../../api/admin/getUsersRequest"
import '../../../styles/AdminData.css'
import AuthContext from "../../../context/AuthContext"
import { useContext, useState, useEffect } from "react"


const AdminUsers = () => {
    const {authTokens} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsersRequest({setData: setUsers, token: authTokens.access})
    }, [authTokens])
    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Пользователи</Typography>
            </Box>
            <AdminUsersDataGrid rows={users} />
        </Box>
    )
}

export default AdminUsers