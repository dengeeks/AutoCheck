import { useContext, useState, useEffect } from "react"
import { Box, Typography, Button } from "@mui/material"
import AuthContext from "../../../context/AuthContext"
import AdminTariffPlansDataGrid from "../../../components/AdminPanel/AdminTariffPlans/AdminTariffDataGrid"
import CreateTariffPlanModal from "../../../components/AdminPanel/AdminTariffPlans/createTariffModal"
import '../../../styles/AdminData.css'

import getTariffPlans from "../../../api/Admin/tariff/getTariffPlansRequest"


const AdminTariffPlans = () => {
    const { authTokens } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tariffPlans, setTariffPlans] = useState([])

    useEffect(() => {
        getTariffPlans({setData: setTariffPlans, token: authTokens.access})
    }, [authTokens])

    const onClose = () => {
        setIsModalOpen(!isModalOpen)
    }

    return(
        <Box>
            <CreateTariffPlanModal open={isModalOpen} onClose={onClose} token={authTokens.access} />
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography className='admin-data-title'>Управление тарфиными планами</Typography>
            </Box>
            <Button className='add-admin-data-btn' onClick={() => setIsModalOpen(true)}>Добавить тариф</Button>
            <AdminTariffPlansDataGrid rows={tariffPlans}/>   
        </Box>
    )
}

export default AdminTariffPlans