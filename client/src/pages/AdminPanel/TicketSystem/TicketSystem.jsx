import { Box, Typography } from "@mui/material"
import '../../../styles/AdminData.css'
import AuthContext from "../../../context/AuthContext"
import getUserTicketsRequest from "../../../api/getUserTicketsRequest"
import { useContext, useState, useEffect } from "react"

import AdminTicketsDataGrid from "../../../components/AdminPanel/AdminTickets/AdminTicketsDataGrid"
import Loader from "../../../components/Loader/Loader"

const AdminTicketSystem = () => {
    const {authTokens} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        getUserTicketsRequest({setData: setTickets, setIsLoading: setIsLoading, token: authTokens.access})
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