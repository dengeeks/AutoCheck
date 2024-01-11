import { Typography, Box, Button, Container } from "@mui/material"
import { useContext, useState } from "react";
import PaymentHistory from "./PaymentHistory/PaymentHistory";
import PaymentModal from "../../../components/PaymentModal/PaymentModal";
import './UserBalance.css'
import AuthContext from "../../../context/AuthContext";


const UserBalance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {user} = useContext(AuthContext)

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return(
        <Container sx={{ minHeight: '100vh' }}>
            <PaymentModal open={isModalOpen} onClose={handleModalClose} />
            <Box className='user-balance-container'>
                <Typography className='user-balance-title'>Ваш баланс: {user?.balance}₽</Typography>
                <Box sx={{ paddingLeft: '25px' }}>
                    <Button
                        className='refill-balance-btn' 
                        onClick={() => setIsModalOpen(true)}
                    >
                        Пополнить баланс
                    </Button>
                </Box> 
            </Box>
            <Box sx={{ marginTop: '50px', marginBottom: '25px' }}>
                <PaymentHistory />
            </Box>
        </Container>
    )
}

export default UserBalance