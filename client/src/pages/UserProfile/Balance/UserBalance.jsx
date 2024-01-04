import { Box, Container, Typography, Button } from "@mui/material"
import './UserBalance.css'

const UserBalance = () => {
    return(
        <Container className='user-balance-container'>
            <Typography className='user-balance-title'>Ваш баланс: 0.00₽</Typography>
            <Box>
                <Button className='refill-balance-btn'>Пополнить баланс</Button>
            </Box>
        </Container>
    )
}

export default UserBalance