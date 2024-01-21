import { Typography, Box, Grid, Button } from "@mui/material"
import { useState, useEffect } from "react"
import VideoAnimation from "../components/VideoAnimation/VideoAnimation"
import CustomTextField from "../components/CustomTextField/CustomTextField"
import ReviewCard from "../components/ReviewCard/ReviewCard"
import InfoInReport from "../components/InfoInReport/InfoInReport"
import FAQ from "../components/FAQ/FAQ"
import InfoContacts from "../components/InfoContacts/InfoContacts"
import FormReviewModal from "../components/FormModal/FormReviewModal"
import { getReviewsRequest } from "../api/getReviewsRequest"
import '../styles/MainPage.css'

import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import InfoAboutCheckImage from "../media/images/InfoAboutCheck.png"
import InfoInReportPNG from "../media/images/InfoInReport.png"
import FaqIcon from "../media/images/faq_icon1.png"
import AllPlans from "../components/AllPlans/AllPlans"


const MainPage = () => {
    const [isOpenModalForm, setIsOpenModalForm] = useState(false)
    const [slidesPerView, setSlidesPerView] = useState(4)
    const [reviews, setReviews] = useState([])

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
                <AllPlans />
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
                                    id={review.id}
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
            <Grid item id='faq' xs={12} md={8} xl={8} className='faq-grid-container'>
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