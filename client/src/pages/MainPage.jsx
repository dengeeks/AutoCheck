import { Typography, Box, Grid, Button } from "@mui/material"
import { useState, useEffect } from "react"
import VideoAnimation from "../components/VideoAnimation/VideoAnimation"
import CustomTextField from "../components/CustomTextField/CustomTextField"
import ReviewCard from "../components/ReviewCard/ReviewCard"
import PlanCard from "../components/PlanCard/PlanCard"
import InfoInReport from "../components/InfoInReport/InfoInReport"
import FAQ from "../components/FAQ/FAQ"
import InfoContacts from "../components/InfoContacts/InfoContacts"
import FormReviewModal from "../components/FormModal/FormReviewModal"
import { getReviewsRequest } from "../api/getReviewsRequest"
import { getAllTariffRequest } from "../api/getAllTariffRequest"
import '../styles/MainPage.css'

import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import InfoAboutCheckImage from "../media/images/InfoAboutCheck.png"
import InfoInReportPNG from "../media/images/InfoInReport.png"
import Speedometr1 from "../media/images/speedometr1.png"
import Speedometr2 from "../media/images/speedometr2.png"
import Speedometr3 from "../media/images/speedometr3.png"
import Speedometr4 from "../media/images/speedometr4.png"
import Speedometr5 from "../media/images/speedometr5.png"
import FaqIcon from "../media/images/faq_icon1.png"


const MainPage = () => {
    const [isOpenModalForm, setIsOpenModalForm] = useState(false)
    const [slidesPerView, setSlidesPerView] = useState(4)
    const [reviews, setReviews] = useState([])
    const [tariffPlans, setTariffPlans] = useState([])

    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 768) {
            setSlidesPerView(1);
          } else if (window.innerWidth < 992) {
            setSlidesPerView(2);
          } else if (window.innerWidth < 1300) {
            setSlidesPerView(3);
          } else {
            setSlidesPerView(4);
          }
        };
        
        handleResize();
        getReviewsRequest({ setData: setReviews })
        
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getAllTariffRequest({setData: setTariffPlans})
    }, [])

    const tariffColors = {
        red: {color: 'd11e22', effectColor: 'rgba(255, 214, 214, 0.3)', image: Speedometr1},
        orange: {color: 'f46522', effectColor: 'rgba(255, 246, 214, 0.3)', image: Speedometr2},
        yellow: {color: 'fcbd4b', effectColor: 'rgba(255, 246, 214, 0.3)', image: Speedometr3},
        blue: {color: '01a8ba', effectColor: 'rgba(214, 235, 255, 0.3)', image: Speedometr4},
        green: {color: '029547', effectColor: 'rgba(214, 255, 218, 0.3)', image: Speedometr5},
    };

    const handleClickFormModal = () => {
        setIsOpenModalForm(!isOpenModalForm)
    }

    const handleCloseModalForm = () => {
        setIsOpenModalForm(false)
    }

    return(
        <Grid container sx={{ marginTop: '35px' }}>
            <FormReviewModal open={isOpenModalForm} onClose={handleCloseModalForm} setData={setReviews}/>
            <Grid item xs={12} md={12} lg={8} xl={8}>
                <Box sx={{ textAlign: 'center', }}>
                    <Typography className='main-page-title'>Проверка автомобиля по VIN и госномеру</Typography>
                    <VideoAnimation />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CustomTextField />
                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <Box className='info-image-container'>
                    <img src={InfoAboutCheckImage} className="info-about-check-image" alt="info-about-check" />
                </Box>
            </Grid>
            <Box className='tariff-plan-title-container' sx={{ textAlign: 'center', width: '100%' }}>
                <Typography className='tariff-plan-title'>Тарифные планы</Typography>
            </Box>
            <Grid id='tariff-plans' item container xs={12} md={12} lg={12} xl={12} sx={{ alignItems: 'center' }}>
                {tariffPlans.map((tariff) => {
                    console.log(tariff)
                    const tariffColor = tariffColors[String(tariff?.color)];
                    return(
                        <Grid item xs={6} md={6} lg={2.4} xl={2.4} key={tariff.id}>
                            <PlanCard 
                                plan={tariff.name}
                                color={tariffColor?.color}
                                effectColor={tariffColor?.effectColor}
                                discount={tariff.profit_percentage}
                                quantity={tariff.request_quantity}
                                price={tariff.price}
                                image={tariffColor?.image} 
                            />
                        </Grid>
                    )
                })}            
            </Grid>
            <Grid item container xs={12} className="info-in-report-grid-container">
                <Grid item xs={12} md={12} lg={6} lx={8}>
                    <InfoInReport />
                </Grid>
                <Grid item xs={12} md={12} lg={6} lx={4} sx={{ textAlign: 'right' }}>
                    <img src={InfoInReportPNG} alt="Info In Report" className="info-in-report-image"/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box id='reviews' className="main-page-reviews">                    
                    <Swiper
                        // install Swiper modules
                        modules={[Scrollbar, Autoplay, Navigation]}
                        spaceBetween={5}
                        slidesPerView={slidesPerView}
                        navigation
                        scrollbar={{ draggable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="review-swiper-container"
                    >
                        {reviews?.results?.map((review, index) => (
                            <SwiperSlide className="review-swiper-slide" key={index}>
                                <ReviewCard
                                    name={review.user_name}
                                    avatar={`${BASE_URL_WITHOUT_PREFIX}${review.user_avatar}`}
                                    text={review.text}
                                    convenienceRating={review.convenience_rating}
                                    qualityRating={review.quality_rating}
                                    informativenessRating={review.informativeness_rating}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>    
                <Box className="review-button-container">
                    <Button className="review-button" onClick={handleClickFormModal}>Оставить отзыв</Button>
                </Box>
            </Grid>
            <Box className='small-screen-faq-container'>
                <img src={FaqIcon} className='small-screen-faq-img' alt="" />
            </Box>
            <Grid item xs={12} md={8} xl={8} className='faq-grid-container'>
                
                <FAQ />
            </Grid>
            <Grid item xs={12} md={4} xl={4} className='faq-img-grid-container'>
                <img src={FaqIcon} className='faq-img-main' alt="" />
            </Grid>
            <Grid item xs={12}>
                <InfoContacts />
            </Grid>
        </Grid>
    )
}

export default MainPage