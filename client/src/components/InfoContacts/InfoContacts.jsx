import { useEffect, useState } from "react"
import { Grid, Box, Typography, Container } from "@mui/material"
import { getSocialNetworksRequest } from "../../api/getSocialNetworksRequest"
import { Link } from "react-router-dom"

import './InfoContacts.css'
import ViberLogo from '../../media/images/SocialIcons/viber.svg'
import TelegramLogo from '../../media/images/SocialIcons/telegram.svg'
import FacebookLogo from '../../media/images/SocialIcons/facebook.svg'
import WhatsAppLogo from '../../media/images/SocialIcons/whatsapp.svg'
import VKLogo from '../../media/images/SocialIcons/vk.svg'
import InstagramLogo from '../../media/images/SocialIcons/instagram.svg'
import YouTubeLogo from '../../media/images/SocialIcons/youtube.svg'

import OurSourceIcon1 from '../../media/images/SourceIcons/1.png'
import OurSourceIcon2 from '../../media/images/SourceIcons/2.png'
import OurSourceIcon3 from '../../media/images/SourceIcons/3.png'
import OurSourceIcon4 from '../../media/images/SourceIcons/4.png'
import OurSourceIcon5 from '../../media/images/SourceIcons/5.png'
import OurSourceIcon6 from '../../media/images/SourceIcons/6.png'
import OurSourceIcon7 from '../../media/images/SourceIcons/7.png'
import OurSourceIcon8 from '../../media/images/SourceIcons/8.png'
import OurSourceIcon9 from '../../media/images/SourceIcons/9.png'

import FeaturesPayment from '../../media/images/features_payment.jpg'
import FeaturesHelp from '../../media/images/features_help.jpg'
import FeaturesPhone from '../../media/images/features_phone.jpg'


const InfoContacts = () => {
    const [socialNetworks, setSocialNetworks] = useState([])

    useEffect(() => {
        getSocialNetworksRequest({setData: setSocialNetworks})
    }, [])

    const socialNetworkLogos = {
        viber: ViberLogo,
        telegram: TelegramLogo,
        whatsapp: WhatsAppLogo,
        vk: VKLogo,
        facebook: FacebookLogo,
        instagram: InstagramLogo,
        youtube: YouTubeLogo,
    };

    return(
        <Container maxWidth="xl">
            <Grid container>
                <Grid item md={12} xl={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography className='info-fearure-title'>Пользуйся нашим сервисом с любого удобного тебе устройства:</Typography> 
                    </Box>
                
                    <Box className='feature-info-container'>
                        <Box className='feature-box'>
                            <img src={FeaturesPhone} alt="" className="feature-image" />
                            <Typography className="feature-title">На твоем смартфоне</Typography>
                            <Typography className="feature-text">В любой момент можно проверить авто</Typography>
                        </Box>
                        <Box className='feature-box'>
                            <img src={FeaturesPayment} alt="" className="feature-image" />
                            <Typography className="feature-title">Оплачивай, как удобно</Typography>
                            <Typography className="feature-text">Любой способ оплаты на выбор</Typography>
                        </Box>
                        <Box className='feature-box'>
                            <img src={FeaturesHelp} alt="" className="feature-image" />
                            <Typography className="feature-title">Ежедневная поддержка</Typography>
                            <Typography className="feature-text">Рады помочь по телефону и онлайн с 7:00 до 24:00 по МСК</Typography>
                        </Box>
                    </Box>

                    <Box className='service-social-links-container'>
                        {socialNetworks?.map((network) => {
                            const logo = socialNetworkLogos[network.social_network];
                            return(
                                <Box className='service-social-link' key={network.id}>
                                    <Link to={`${network.link}`} target="_blank" rel="noopener noreferrer" style={{ color: 'black', textDecoration: 'none' }}>
                                        <Box className='social-link-header'>
                                            {logo && <img className='social-link-logo' src={logo} alt={`${network.social_network} Logo`} />}
                                            <Typography className='social-link-name'>{network?.social_network}</Typography> 
                                        </Box>
                                        <img src={network.qr_code} className='social-link-qr-code' alt="telegram QR" />
                                    </Link>
                                </Box>
                            )
                        })}
                    </Box>
                </Grid>
                <Grid item container md={12} xl={6} className='our-sources-grid-container'>
                    <Grid item xs={12} sx={{ textAlign: 'center', marginLeft: '180px' }}>
                        <Box><Typography className='our-sources-title'>Наши источники</Typography></Box>
                    </Grid>

                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon1} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon2} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon3} className='our-source-icon' alt="" /></Grid>

                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon4} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon5} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon6} className='our-source-icon' alt="" /></Grid>

                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon7} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon8} className='our-source-icon' alt="" /></Grid>
                    <Grid item xs={4} className='source-icon-container'><img src={OurSourceIcon9} className='our-source-icon' alt="" /></Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default InfoContacts