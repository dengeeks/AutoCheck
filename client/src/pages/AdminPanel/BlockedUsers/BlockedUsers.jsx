import { useContext, useEffect, useState } from "react"
import BlockedUsersDataGrid from "../../../components/AdminPanel/AdminBlockedUsers/AdminBlockedUsersDataGrid"
import { Box, Typography } from "@mui/material"
import AuthContext from "../../../context/AuthContext"

import { getAllBlockedUsers } from '../../../api/Admin/users/getAllBlockedUsers'


const BlockedUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState([])
    const {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getAllBlockedUsers({setData: setBlockedUsers, token: authTokens.access})
    }, [authTokens.access])

    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Заблокированные пользователи</Typography>
            </Box>
            <BlockedUsersDataGrid rows={blockedUsers}/>   
        </Box>
    )
}

export default BlockedUsers