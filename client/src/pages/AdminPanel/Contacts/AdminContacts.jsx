import { useContext, useState, useEffect } from "react"
import { Box, Typography, Button } from "@mui/material"
import AuthContext from "../../../context/AuthContext"
import AdminContactsDataGrid from "../../../components/AdminPanel/AdminContacts/AdminContactsDataGrid"
import CreateContactModal from "../../../components/AdminPanel/AdminContacts/createAdminContact"
import '../../../styles/AdminData.css'

import { getAdminContacts } from "../../../api/Admin/contacts/getContactsRequest"


const AdminContacts = () => {
    const { authTokens } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getAdminContacts({setData: setContacts})
    }, [authTokens])

    const onClose = () => {
        setIsModalOpen(!isModalOpen)
    }

    return(
        <Box>
            <CreateContactModal open={isModalOpen} onClose={onClose} token={authTokens.access} />
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Управление контактами</Typography>
            </Box>
            <Button className='add-admin-data-btn' onClick={() => setIsModalOpen(true)}>Добавить контакт</Button>
            <AdminContactsDataGrid rows={contacts}/>   
        </Box>
    )
}

export default AdminContacts