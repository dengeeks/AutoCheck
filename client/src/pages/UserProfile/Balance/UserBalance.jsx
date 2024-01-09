import { Typography, Box, Button, Container } from "@mui/material"
import { useEffect, useState } from "react";
import PaymentHistory from "./PaymentHistory/PaymentHistory";
import PaymentModal from "../../../components/PaymentModal/PaymentModal";
import './UserBalance.css'


const UserBalance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userData, setUserData] = useState()

    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');

        if (storedUserData) {
            // Распарсиваем строку JSON в объект
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);
    
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return(
        <Container sx={{ minHeight: '100vh' }}>
            <PaymentModal open={isModalOpen} onClose={handleModalClose} />
            <Box className='user-balance-container'>
                <Typography className='user-balance-title'>Ваш баланс: {userData ? `${userData.balance}₽` : '0.00₽' }</Typography>
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