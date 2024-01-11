import { Typography, Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import BlockedIcon from '../../../media/images/BlockedIcon.png'
import './BlockedUser.css'

import { getBlockedUserInfo } from "../../../api/Admin/users/getBlockedUserInfo"


const BlockedUserPage = () => {
    const {user, logoutUser} = useContext(AuthContext)
    const [blockInfo, setBlockInfo] = useState()

    useEffect(() => {
        if (user) {
            getBlockedUserInfo({id: user.id, setData: setBlockInfo, logout: logoutUser})
        }
    }, [user, logoutUser])

    return(
        <Box className='blocked-page-container'>
            <img src={BlockedIcon} className="blocked-page-icon" alt="Вы заблокированы" />
            <Typography className='blocked-user-title'>ВЫ ЗАБЛОКИРОВАНЫ!</Typography>
            <Typography className='blocked-user-text'>К сожалению, вы заблокированы и доступ к сайту вам ограничен!</Typography>
            
            <Box sx={{ display: 'inline-flex', flexDirection: 'column'}}>
                <Typography className='blocked-user-text'>Причина блокировки: </Typography>
                <Typography  className='blocked-user-second-title'>{blockInfo?.detail?.block_reason}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography className='blocked-user-text'>Вы заблокированы до: </Typography>
                <Typography className='blocked-user-second-title'>{blockInfo?.detail?.blocked_until}</Typography>
            </Box>
        </Box>
    )
}

export default BlockedUserPage