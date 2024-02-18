import { Button, Box, Grid } from "@mui/material"
import { Fragment } from "react"
import './ReportNavigation.css'

const ReportNavigation = () => {
    // mileage-history
    const scrollToAnchor = (anchor) => {
        const anchorElement = document.getElementById(anchor);
        if (anchorElement) {
            const offsetTop = anchorElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    return(
        <Grid container sx={{ marginTop: '20px' }}>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('service-history')}>Сервисное обслуживание</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('accidents-history')}>Аварии</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('ownership-history')}>Владельцы ТС</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('ads-history')}>История объявлений</Button>
            </Grid>

            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('restrict-history')}>Ограничения</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('diagnostic-cards')}>Диагностические карты</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('mileage-history')}>Пробег</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('fines-history')} >Штрафы</Button>
            </Grid>

            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('repairs-history')}>Ремонтные работы</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('leasing-history')}>Лизинг</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="report-btns-grid">
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('customs-history')}>Таможня</Button>
                <Button className="report-navigation-btn" onClick={() => scrollToAnchor('taxi-history')}>Такси</Button>
            </Grid>
        </Grid>
    )
}
export default ReportNavigation