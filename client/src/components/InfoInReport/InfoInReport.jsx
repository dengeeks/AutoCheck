import { Typography, Box } from "@mui/material"
import './InfoInReport.css'


const InfoInReport = () => {
    return(
        <Box>
            <Box className="info-in-report-container">
                <Box sx={{ width: '100%' }}>
                    <Typography className="info-in-report-title">Сведения содержащиеся в отчете</Typography>
                </Box>
                
                <Box
                    className="second-info-in-report-container"
                >
                    <Box className="full-report-includes-container">
                        <Typography className="info-in-report-second-title">Полный отчет включает</Typography>
                        <li className="info-list-item"><span>Год выпуска</span></li>
                        <li className="info-list-item"><span>Количество владельцев</span></li>
                        <li className="info-list-item"><span>Пробег</span></li>
                        <li className="info-list-item"><span>Залоги</span></li>
                        <li className="info-list-item"><span>Данные об угоне</span></li>
                        <li className="info-list-item"><span>Ограничения ГИБДД</span></li>
                        <li className="info-list-item"><span>Использование в такси</span></li>
                        <li className="info-list-item"><span>Участие в ДТП</span></li>
                        <li className="info-list-item"><span>Лизинг</span></li>
                        <li className="info-list-item"><span>Утилизация</span></li>
                        <li className="info-list-item"><span>Таможенная история</span></li>
                        <li className="info-list-item"><span>Данные об ОСАГО</span></li>
                        <li className="info-list-item"><span>История штрафов</span></li>
                        <li className="info-list-item"><span>Изменения конструкции ТС</span></li>
                        <li className="info-list-item"><span>Данные о тех осмотрах</span></li>
                    </Box>
                    <Box className="our-sources-container">
                        <Typography className="info-in-report-second-title">Наши источники</Typography>
                        <li className="info-list-item"><span>ГИБДД</span></li>
                        <li className="info-list-item"><span>Российский союз автостраховщиков (РСА)</span></li>
                        <li className="info-list-item"><span>ФСПП</span></li>
                        <li className="info-list-item"><span>Суды РФ</span></li>
                        <li className="info-list-item"><span>Нотариальная палата</span></li>
                        <li className="info-list-item"><span>Банки</span></li>
                        <li className="info-list-item"><span>Страховые компании</span></li>
                        <li className="info-list-item"><span>Автодилеры</span></li>
                        <li className="info-list-item"><span>Федеральная таможенная служба РФ</span></li>
                        <li className="info-list-item"><span>Доски объявлений</span></li>
                        <li className="info-list-item"><span>ЕАИСТО</span></li>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default InfoInReport