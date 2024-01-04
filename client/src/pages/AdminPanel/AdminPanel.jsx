import React, { useContext } from "react"
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Sidebar from "../../layers/adminSidebar/AdminSidebar"
import NotAllowedPage from "../Errors/NotAllowed/NotAllowedPage"


const AdminPanel = () => {
    const { user } = useContext(AuthContext);

    if (!user || !user.is_staff) {
        return <NotAllowedPage />
    }

    return (
        <Box sx={{ display: 'flex', overflowX: 'hidden'}}>      
            <Sidebar />
            <Box sx={{ flex: 1 }}>
                <Outlet></Outlet>
            </Box>
        </Box>
    );
}

export default AdminPanel;