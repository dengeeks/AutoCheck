import { Typography, Box, Grid, Collapse } from "@mui/material"
import { useState, useEffect } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

import PaymentInfoCard from "../../../../components/PaymentInfoCard/PaymentInfoCard"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './PaymentHistory.css'


const PaymentHistory = () => {
    const isMobile = useMediaQuery('(max-width: 850px)');
    const [activeGridIndex, setActiveGridIndex] = useState(1);
    const [isCollapse, setIsCollapse] = useState(false)
    // eslint-disable-next-line
    const [selectedType, setSelectedType] = useState({ withdraw: 'Списание средств', payment: 'Начисление средств', bonus: 'Бонусы за рефералов' })
    const [selectedItem, setSelectedItem] = useState('withdraw')

    const handleSelectItem = (item) => {
        setSelectedItem(item)
        setIsCollapse(false)
    }

    useEffect(() => {
        const activeGridSelected = {'withdraw': 0, 'payment': 1, 'bonus': 2}
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
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('withdraw')}>
                            <LocalMallIcon />
                            <Typography className='collapse-select-item-text'>
                               {selectedType.withdraw} 
                            </Typography>
                        </Box>
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('payment')}>
                            <AttachMoneyIcon />
                            <Typography className='collapse-select-item-text'>
                                {selectedType.payment}
                            </Typography>
                        </Box>
                        <Box className='collapse-select-item' onClick={() => handleSelectItem('bonus')}>
                            <GroupAddIcon />
                            <Typography className='collapse-select-item-text'>
                                {selectedType.bonus}
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
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Покупка тарифа Стандарт"
                        date="2023-12-23 14:22"
                        price={200}
                        type='withdraw'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Покупка пакета Премиум"
                        date="2023-12-30 16:11"
                        price={700}
                        type='withdraw'
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? (activeGridIndex === 1 ? 'block' : 'none') : '' }}>
                    <Box className='profile-payment-history-header'>
                        <AttachMoneyIcon />
                        <Typography className='profile-payment-history-title'>Пополнение баланса</Typography> 
                    </Box>  
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Пополнение счета"
                        date="2023-12-23 13:08"
                        price={600}
                        type='payment'
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? (activeGridIndex === 2 ? 'block' : 'none') : '' }}>
                    <Box className='profile-payment-history-header'>
                        <GroupAddIcon />
                        <Typography className='profile-payment-history-title'>Бонусы за рефералов</Typography>      
                    </Box>                
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='bonus'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='bonus'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='bonus'
                    />
                </Grid>


            </Grid>
        </Box>
    )
}


export default PaymentHistory