import { Box, Typography } from "@mui/material"
import '../../../styles/AdminData.css'
import AuthContext from "../../../context/AuthContext"
import { useContext, useState, useEffect } from "react"
import { resetDepartment } from "../../../api/resetDepartmentRequest"

import AdminTicketsDataGrid from "../../../components/AdminPanel/AdminTickets/AdminTicketsDataGrid"
import Loader from "../../../components/Loader/Loader"

import { getTicketsAdmin } from "../../../api/Admin/tickets/getTicketsAdmin"


const AdminTicketSystem = () => {
    const {authTokens} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        getTicketsAdmin({
            setData: setTickets,
            isLoading: setIsLoading,
            token: authTokens.access
        })
        resetDepartment({department: 'ticket', token: authTokens.access})
    }, [authTokens])       

    if (isLoading) {
        return(
            <Loader />
        )
    }
    return(
        <Box>
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
                <Typography className='admin-data-title'>Тикетная система</Typography>
            </Box>
            <AdminTicketsDataGrid rows={tickets} />
        </Box>
    )
}

export default AdminTicketSystem