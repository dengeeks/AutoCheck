import { Typography, Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { getBlockedUserInfo } from "../../../api/admin/users/getBlockedUserInfo"
import BlockedIcon from '../../../media/images/BlockedIcon.png'
import './BlockedUser.css'

const BlockedUserPage = () => {
    const {user} = useContext(AuthContext)
    const [blockInfo, setBlockInfo] = useState()

    useEffect(() => {
        if (user) {
            console.log(user.user_id)
            getBlockedUserInfo({id: user.user_id, setData: setBlockInfo})
        }
    }, [user])

    console.log(blockInfo)

    return(
        <Box className='blocked-page-container'>
            <img src={BlockedIcon} className="blocked-page-icon" alt="Вы заблокированы" />
            <Typography className='blocked-user-title'>ВЫ ЗАБЛОКИРОВАНЫ!</Typography>
            <Typography className='blocked-user-text'>К сожалению, вы заблокированы и доступ к сайту вам ограничен!</Typography>
            
            <Box sx={{ display: 'inline-flex', marginTop: '10px' }}>
                <Typography className='blocked-user-text'>Причина блокировки: </Typography>
                <Typography  className='blocked-user-second-title'>{blockInfo?.detail?.block_reason}</Typography>
            </Box>
            <Box sx={{ display: 'inline-flex' }}>
                <Typography className='blocked-user-text'>Вы заблокированы до: </Typography>
                <Typography className='blocked-user-second-title'>{blockInfo?.detail?.blocked_until}</Typography>
            </Box>
        </Box>
    )
}

export default BlockedUserPage