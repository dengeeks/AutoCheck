import { useContext, useState, useEffect } from "react"
import { Box, Typography, Button } from "@mui/material"
import AuthContext from "../../../context/AuthContext"
import AdminSocialNetworksDataGrid from "../../../components/AdminPanel/AdminSocialNetworks/AdminSocialNetworksDataGrid"
import CreateSocialNetworkModal from "../../../components/AdminPanel/AdminSocialNetworks/AdminCreateSocialNetwork"
import '../../../styles/AdminData.css'

import { getAdminSocialNetworks } from "../../../api/Admin/socialNetworks/getSocialNetworkRequest"


const AdminSocialNetworks = () => {
    const { authTokens } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [socialNetworks, setSocialNetworks] = useState([])

    useEffect(() => {
        getAdminSocialNetworks({setData: setSocialNetworks, token: authTokens.access})
    }, [authTokens])

    const onClose = () => {
        setIsModalOpen(!isModalOpen)
    }

    return(
        <Box>
            <CreateSocialNetworkModal open={isModalOpen} onClose={onClose} token={authTokens.access} />
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Управление социальными сетями</Typography>
            </Box>
            <Button className='add-admin-data-btn' onClick={() => setIsModalOpen(true)}>Добавить соц. сеть</Button>
            <AdminSocialNetworksDataGrid rows={socialNetworks}/>   
        </Box>
    )
}

export default AdminSocialNetworks