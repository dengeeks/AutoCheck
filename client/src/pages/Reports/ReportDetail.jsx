import { Container, Grid, Box, Typography, Button } from "@mui/material"
import { Fragment, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReportDetailRequest } from "../../api/Reports/GetReportDetailRequest"
import AuthContext from "../../context/AuthContext"
import './ReportDetail.css'
import { upgradeReportRequest } from "../../api/Reports/UpgradeReportRequest"
import Loader from "../../components/Loader/Loader"
import ReportPreview from '../../media/images/ReportPreviewImg.png'

import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ReportNavigation from "../../components/ReportParts/ReportNavigation/ReportNavigation"
import MileageHistory from "../../components/ReportParts/MileageHistory/MileageHistory"
import AdsHistory from "../../components/ReportParts/AdsHistory/AdsHistory"
import AccidentsHistory from "../../components/ReportParts/AccidentsHistory/AccidentsHistory"
import FinesHistory from "../../components/ReportParts/FinesHistory/FinesHistory"
import InsuranceHistory from "../../components/ReportParts/InsuranceHistory/InsuranceHistory"
import LeasingHistory from "../../components/ReportParts/LeasingHistory/LeasingHistory"
import RegistrationActions from "../../components/ReportParts/RegistrationActions/RegistrationActions"
import DiagnosticCards from "../../components/ReportParts/DiagnosticCards/DiagnosticCards"
import ExecutiveProcedures from "../../components/ReportParts/ExecutiveProcedures/ExecutiveProcedures"
import TaxiHistory from "../../components/ReportParts/TaxiHistory/TaxiHistory"
import PledgesHistory from "../../components/ReportParts/PledgesHistory/PledgesHistory"
import RestrictHistory from "../../components/ReportParts/RestrictHistory/RestrictHistory"
import GeneralSummary from "../../components/ReportParts/GeneralSummary/GeneralSummary"
import CommercialUse from "../../components/ReportParts/CommercialUse/СommercialUse"
import OwnershipHistory from "../../components/ReportParts/OwnershipHistory/OwnershipHistory"
import CustomsHistory from "../../components/ReportParts/CustomsHistory/CustomsHistory"
import RepairsHistory from "../../components/ReportParts/RepairsHistory/RepairsHistory"
import ServiceHistory from "../../components/ReportParts/ServiceHistory/ServiceHistory"
import ReportExpire from "../Errors/ReportExpire/ReportExpire"
import useDocumentTitle from "../../utils/useDocumentTitle"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Lightbox from "./Lightbox"


const ReportDetail = () => {
    const [report, setReport] = useState()
    const [expire, setExpire] = useState(false)
    const {authTokens} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {uuid} = useParams()
    useDocumentTitle(`Отчет`)
    useEffect(() => {
        getReportDetailRequest({
            setData: setReport, 
            setExpire: setExpire, 
            uuid: uuid, 
            token: authTokens?.access
        })
    }, [uuid])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }    

    const data = report?.data?.data?.content?.content;
    const techData = data?.tech_data;
    const previewImages = data?.images?.photos?.items;
    const isReady = report?.data?.data?.is_ready
    const brandLogo = techData?.brand?.logotype?.uri;
    const carModelName = techData?.brand?.name?.original;
    const isUpgraded = report?.data?.report?.is_upgraded
    const reportCreatedAt = report?.data?.report?.created_at
    const reportExpiryDate = report?.data?.report?.expiry_date

    const handleReportUpgrade = () => {
        upgradeReportRequest({ uuid: uuid, token: authTokens?.access });
        setTimeout(() => {
            window.location.reload(false);
        }, 3000);
    }

    const codeType = {
        'GRZ': 'Госномер',
        'VIN': 'VIN код',
        'BODY': 'Номер кузова'
    }

    const getWheelPosition = () => {
        const wheelPosition = techData?.wheel?.position;
        return wheelPosition === 'LEFT' ? 'Левое' :
               wheelPosition === 'RIGHT' ? 'Правое' :
               'Неизвестное';
    };

    if (expire) {
        return(
            <ReportExpire />
        )
    }
    if (!report) {
        return(
            <Loader />
        )
    }
    return(
        <Container sx={{ marginTop: '40px', marginBottom: '25px' }}>
            <Lightbox isOpen={isOpen} image={selectedImage} onClose={() => setIsOpen(false)} />
            <Grid container className='report-container'>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Box sx={{ width: '90%', margin: '0 auto' }}>
                        <Box>
                            <Typography className='text-item-report'>
                                Статус проверки:
                                <span className={isReady ? 'report-status-progress' : 'report-status-success'}>
                                    {isReady ? ' Завершен' : ' В процессе'}
                                </span>
                            </Typography>
                            <Typography className='text-item-report'>
                                Дата создания:
                                <span className='report-text-bold'> {reportCreatedAt}</span>
                            </Typography>
                            {isUpgraded && (
                                <Typography className='text-item-report'>
                                    Дата истечения:
                                    <span className='report-text-bold'> {reportExpiryDate}</span>
                                </Typography>                                 
                            )}
                        </Box>
                        <Box sx={{ textAlign: 'right', marginTop: '25px', marginBottom: '40px'}}>
                            <Swiper
                                modules={[Scrollbar, Autoplay, Navigation]}
                                spaceBetween={5}
                                slidesPerView={1}
                                navigation
                                scrollbar={{ draggable: true }}
                                className='report-preview-swiper'
                            >
                                {previewImages?.length > 0 ? (
                                    previewImages?.map((image, index) => (
                                        <SwiperSlide 
                                            className='report-preview-slide'
                                            key={index}
                                        >   
                                            <img
                                                src={image?.uri}
                                                alt="Изображение автомобиля" 
                                                className='report-preview-image'
                                                onClick={() => {
                                                    setSelectedImage(image?.uri);
                                                    setIsOpen(true);
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide 
                                        className='report-preview-slide'
                                        key="default"
                                    >
                                        <img
                                            src={ReportPreview}
                                            alt="Default Image" 
                                            className='report-preview-image'
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6} className='characteristics-grid'>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={brandLogo} alt="Логотип бренда" className='report-brand-logo'/>
                        <Typography className='report-model-name'>{carModelName}</Typography>                        
                    </Box>
                    <Box className='report-characteristics-block'>
                        {techData?.brand?.name?.normalized && (
                            <Typography className='characteristics-item-report report-brand-name-x'>
                                Бренд: <span className='report-text-bold'>{techData?.brand?.name?.normalized}</span>
                            </Typography>                            
                        )}
                        {report?.data?.data?.content?.query?.type && (
                            <Typography className='characteristics-item-report'>
                                {codeType[report?.data?.data?.content?.query?.type]}:
                                <span className='report-text-bold'> {report.data.data.content.query.body}</span>
                            </Typography>
                        )}
                        {getWheelPosition() && (
                            <Typography className='characteristics-item-report'>
                                Расположение руля: <span className='report-text-bold'>{getWheelPosition()}</span>
                            </Typography>                            
                        )}
                        {techData?.year && (
                            <Typography className='characteristics-item-report'>
                                Год выпуска: <span className='report-text-bold'>{techData.year}</span>
                            </Typography>
                        )}
                        {techData?.engine?.fuel?.type && (
                            <Typography className='characteristics-item-report'>
                                Тип двигателя: <span className='report-text-bold'>{techData.engine.fuel.type}</span>
                            </Typography>
                        )}
                        {techData?.engine?.volume && (
                            <Typography className='characteristics-item-report'>
                                Объем двигателя: <span className='report-text-bold'>{techData.engine.volume} куб. см</span>
                            </Typography>
                        )}
                        {techData?.engine?.model?.name && (
                            <Typography className='characteristics-item-report'>
                                Модель двигателя: <span className='report-text-bold'>{techData.engine.model.name}</span>
                            </Typography>
                        )}
                        {techData?.engine?.number && (
                            <Typography className='characteristics-item-report'>
                                Номер двигателя: <span className='report-text-bold'>{techData.engine.number}</span>
                            </Typography>
                        )}
                        {techData?.engine?.power?.hp && (
                            <Typography className='characteristics-item-report'>
                                Мощность: <span className='report-text-bold'>{techData.engine.power.hp} л.с / {techData.engine.power.kw} кВт</span>
                            </Typography>
                        )}
                        {techData?.body?.color?.name && (
                            <Typography className='characteristics-item-report'>
                                Цвет: <span className='report-text-bold'>{techData.body.color.name}</span>
                            </Typography>
                        )}
                        {techData?.drive?.type && (
                            <Typography className='characteristics-item-report'>
                                Привод: <span className='report-text-bold'>{techData.drive.type}</span>
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isUpgraded ? '' : (
                        <Button className='get-full-report-btn' onClick={handleReportUpgrade}>
                            Получить полный отчет
                        </Button>
                    )}
                </Grid>
            </Grid>
            {isUpgraded && (
                <Fragment>
                    <ReportNavigation />
                    <GeneralSummary data={data} />
                    <RegistrationActions registrationActions={data?.registration_actions} />
                    <OwnershipHistory ownerships={data?.ownership?.history} />
                    <MileageHistory mileages={data?.mileages} />
                    <AccidentsHistory accidents={data?.accidents?.history} />
                    <RestrictHistory restrictHistory={data?.restrictions?.registration_actions_archive} />
                    <PledgesHistory pledgesHistory={data?.pledges} />
                    <TaxiHistory taxiHistory={data?.taxi?.history} />
                    <LeasingHistory leasings={data?.leasings}/>
                    <CommercialUse commercialUse={data?.commercial_use} />
                    <FinesHistory fines={data?.fines} />
                    <ExecutiveProcedures executiveProcedures={data?.executive_procedures} />
                    <AdsHistory ads={data?.ads?.history} />
                    <InsuranceHistory insurances={data?.insurance?.osago} />
                    <DiagnosticCards diagnosticCards={data?.diagnostic_cards} />
                    <RepairsHistory />
                    <ServiceHistory serviceHistory={data?.service_history}/>
                    <CustomsHistory customs={data?.customs?.history} />
                </Fragment>
            )}
            <KeyboardArrowUpIcon className="top-error-report" onClick={() => scrollToTop()} />
        </Container>
    )
}

export default ReportDetail