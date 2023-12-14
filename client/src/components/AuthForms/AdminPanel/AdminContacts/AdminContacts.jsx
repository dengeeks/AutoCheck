import { useContext, useState, useEffect } from "react"
import { Box, Typography, Button } from "@mui/material"
import AuthContext from "../../../../context/AuthContext"
import AdminTariffPlansDataGrid from "./AdminTariffDataGrid"
import getTariffPlans from "../../../../api/admin/tariff/getTariffPlansRequest"
import CreateTariffPlanModal from "./AdminCreateContact"
import '../styles/AdminData.css'


const AdminContacts = () => {
    const { authTokens } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getTariffPlans({setData: setContacts, token: authTokens.access})
    }, [authTokens])

    const onClose = () => {
        setIsModalOpen(!isModalOpen)
    }

    return(
        <Box>
            <CreateTariffPlanModal open={isModalOpen} onClose={onClose} token={authTokens.access} />
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Тарфиные планы</Typography>
            </Box>
            <Button className='add-admin-data-btn' onClick={() => setIsModalOpen(true)}>Добавить тариф</Button>
            <AdminTariffPlansDataGrid rows={tariffPlans}/>   
        </Box>
    )
}

export default AdminTariffPlans