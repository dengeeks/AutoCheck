import { Box, Typography, TextField, Modal, Grid, Button } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { createPaymentRequest } from "../../api/Payment/CreatePaymentRequest";
import { redirect, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import './PaymentModal.css'


const PaymentModal = ({open, onClose}) => {
    const [amount, setAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState("");
    const [url, setUrl] = useState()
    const navigate = useNavigate()  
    const {authTokens} = useContext(AuthContext)

    useEffect(() => {
        console.log(url)
        if (url) {
            window.open(url, '_blank');
        }
    }, [url, navigate])

    const handleSubmitAmount = (amount) => {
        const numericAmount = parseInt(amount, 10);
        if (!isNaN(numericAmount)) {
            handleCreatePayment(numericAmount);
        }
    };

    const handleCreatePayment = (selectedAmount) => {
        if (typeof selectedAmount === "number" && selectedAmount !== 0) {
            const return_url = 'http://127.0.0.1:3000/';
            createPaymentRequest({
                amount: selectedAmount, 
                return_url: return_url, 
                setData: setUrl,
                token: authTokens.access
            });
            setAmount(0);
            setCustomAmount("");
        }
    };

    return(
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box>              
                <Box 
                    sx={{ textAlign: 'center' }}
                    className='payment-header-form'
                >
                    <Typography className='payment-modal-title'>
                        Пополнение баланса
                    </Typography>
                    <CloseIcon 
                        className='payment-modal-close-icon'
                        onClick={onClose}
                    />
                </Box>
                <Box className='payment-modal-container'>

                    <Box className='payment-modal-custom-amount'>
                        <Typography className='payment-modal-helper-text'>
                            Для пополнения баланса на произвольную сумму, введите сумму в поле ввода
                        </Typography>
                        <TextField 
                            label='Введите сумму пополнения?' 
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            inputProps={{
                                min: 0,
                                step: 1,
                            }}/>
                        <Button 
                            className='payment-custom-amount-btn'
                            onClick={() => handleSubmitAmount(customAmount)}
                        >
                            Пополнить баланс
                        </Button>
                    </Box>
                    <Grid container className='payment-modal-btns-container'>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(100)}
                            >
                                100₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(300)}
                            >
                                300₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(500)}
                            >
                                500₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(1000)}
                            >
                                1000₽
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container className='payment-modal-btns-container'>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(1500)}
                            >
                                    1500₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(3000)}
                            >
                                3000₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(5000)}
                            >
                                5000₽
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                className='payment-modal-amount-btn' 
                                onClick={() => handleSubmitAmount(10000)}
                            >
                                10000₽
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
}

export default PaymentModal