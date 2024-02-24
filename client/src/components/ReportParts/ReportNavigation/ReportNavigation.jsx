import { Button, Box, Grid, Typography } from "@mui/material"
import { Fragment } from "react"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import './ReportNavigation.css'

const ReportNavigation = () => {
    // mileage-history
    const [isOpen, setIsOpen] = useState(false)
    const scrollToAnchor = (anchor) => {
        const anchorElement = document.getElementById(anchor);
        if (anchorElement) {
            const topPosition = anchorElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    }

    return(
        <Grid container sx={{ marginTop: '20px' }}>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('registration-history')}>История регистрации</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('ownership-history')}>Владельцы ТС</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('mileage-history')}>История пробегов</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('accidents-history')}>Аварии</Button>

            </Grid>

            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('restrict-history')}>Ограничения</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('pledges-history')}>Обременения на ТС</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('taxi-history')} >Использование в такси</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('leasing-history')}>Использование в лизинге</Button>
            </Grid>

            {isOpen ? '' : (
                <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        margin: '0 auto', 
                        paddingTop: '10px' 
                    }}
                    onClick={() => setIsOpen(true)}
                    >
                    <Typography className='open-report-navigation'>
                        Развернуть
                    </Typography>
                    <KeyboardArrowDownIcon />
                </Box>
            )}

            
            {isOpen && (
                <>            
                    <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('commercial-history')}>Коммерческое использование</Button>
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('fines-history')}>Штрафы</Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('executive-procedures')}>Производства</Button>
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('ads-history')}>История объявлений</Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('diagnostic-cards')}>Диагностические карты</Button>
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('service-history')}>Сервисное обслуживание</Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('repairs-history')}>Ремонтные работы</Button>
                        <Button className="report-navigation-btn" onClick={() => scrollToAnchor('customs-history')}>Таможня</Button>
                    </Grid>
                </>
            )}
            {isOpen && (
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer', 
                    margin: '0 auto', 
                    paddingTop: '10px' 
                }}
                onClick={() => setIsOpen(false)}
                >
                <Typography className='open-report-navigation'>
                    Свернуть
                </Typography>
                <KeyboardArrowUpIcon />
            </Box>
            )}
        </Grid>
    )
}
export default ReportNavigation