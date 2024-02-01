import { Typography, Box, Grid, Collapse } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

import PaymentInfoCard from "../../../../components/PaymentInfoCard/PaymentInfoCard"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getBalanceHistory } from "../../../../api/Payment/getPaymentHistory";
import './PaymentHistory.css'
import AuthContext from "../../../../context/AuthContext";


const PaymentHistory = () => {
    const isMobile = useMediaQuery('(max-width: 850px)');
    const {authTokens} = useContext(AuthContext)
    const [activeGridIndex, setActiveGridIndex] = useState(1);
    const [isCollapse, setIsCollapse] = useState(false)
    const [historyInfo, setHistoryInfo] = useState([])
    // eslint-disable-next-line
    const [selectedType, setSelectedType] = useState({ Withdraw: 'Списание средств', Payment: 'Начисление средств', Bonus: 'Бонусы за рефералов' })
    const [selectedItem, setSelectedItem] = useState('Withdraw')

    const handleSelectItem = (item) => {
        setSelectedItem(item)
        setIsCollapse(false)
    }

    useEffect(() => {
        getBalanceHistory({ setData: setHistoryInfo, token: authTokens.access })
    }, [])

    useEffect(() => {
        const activeGridSelected = {'Withdraw': 0, 'Payment': 1, 'Bonus': 2}
        setActiveGridIndex(activeGridSelected[selectedItem])  
    }, [selectedItem])
    
    return(
        <Box>
            <Typography className='payment-history-title'>История платежей</Typography>
            <Box sx={{ 
                    display: isMobile ? 'flex' : 'none',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '65vw',
                    margin: '0 auto' 
                }}>
                <Box className='payment-collapse-item-container' >
                    <Typography className='payment-history-selected' sx={{ textAlign: 'center' }} onClick={() => setIsCollapse(!isCollapse)}>
                        {selectedType[selectedItem]}
                    </Typography>
                    {isCollapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </Box>
                <Collapse className='payment-history-collapse' in={isCollapse}>
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('Withdraw')}>
                            <LocalMallIcon />
                            <Typography className='collapse-select-item-text'>
                               {selectedType.Withdraw} 
                            </Typography>
                        </Box>
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('Payment')}>
                            <AttachMoneyIcon />
                            <Typography className='collapse-select-item-text'>
                                {selectedType.Payment}
                            </Typography>
                        </Box>
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('Bonus')}>
                            <GroupAddIcon />
                            <Typography className='collapse-select-item-text'>
                                {selectedType.Bonus}
                            </Typography>
                            
                        </Box>
                </Collapse>     
            </Box>

            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? (activeGridIndex === 0 ? 'block' : 'none') : '' }}>
                    <Box className='profile-payment-history-header'>
                        <LocalMallIcon />
                        <Typography className='profile-payment-history-title'>Списание средств</Typography>
                    </Box>
                    {historyInfo
                    .filter(transaction => transaction.operation_type === 'Withdraw')
                    .map((transaction, index) => (
                        <PaymentInfoCard
                        key={index}
                        title={transaction.description}
                        date={transaction.timestamp}
                        price={transaction.initial_amount}
                        type={transaction.operation_type}
                        />
                    ))}
                </Grid>
                <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? (activeGridIndex === 1 ? 'block' : 'none') : '' }}>
                    <Box className='profile-payment-history-header'>
                        <AttachMoneyIcon />
                        <Typography className='profile-payment-history-title'>Пополнение баланса</Typography> 
                    </Box>  
                    {historyInfo
                    .filter(transaction => transaction.operation_type === 'Payment')
                    .map((transaction, index) => (
                        <PaymentInfoCard
                        key={index}
                        title={transaction.description}
                        date={transaction.timestamp}
                        price={transaction.initial_amount}
                        type={transaction.operation_type}
                        />
                    ))}
                </Grid>
                <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? (activeGridIndex === 2 ? 'block' : 'none') : '' }}>
                    <Box className='profile-payment-history-header'>
                        <GroupAddIcon />
                        <Typography className='profile-payment-history-title'>Бонусы за рефералов</Typography>      
                    </Box>                
                    {historyInfo
                    .filter(transaction => transaction.operation_type === 'Bonus')
                    .map((transaction, index) => (
                        <PaymentInfoCard
                        key={index}
                        title={transaction.description}
                        date={transaction.timestamp}
                        price={transaction.initial_amount}
                        type={transaction.operation_type}
                        />
                    ))}
                </Grid>


            </Grid>
        </Box>
    )
}


export default PaymentHistory