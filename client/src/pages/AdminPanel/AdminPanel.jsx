import React, { useContext, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useNavigate, Outlet } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Sidebar from "../../layers/adminSidebar/AdminSidebar"


const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is defined and has is_staff property
        if (user && !user.is_staff) {
            navigate('/')
        }
    }, [user, navigate]);

    if (!user || !user.is_staff) {
        return <Typography>Проверяем ваши права...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex' }}>      
            <Sidebar />
            <Box sx={{ flex: 1 }}>
                <Outlet></Outlet>
            </Box>
        </Box>
    );
}

export default AdminPanel;