import { Box, Typography, TextField, Button, Container, Grid } from "@mui/material"
import { toast } from "react-toastify";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReferralInfoCard from "../../../components/ReferralInfoCard/ReferralInfoCard";
import { getReferralRequest } from "../../../api/Referrals/getReferralRequest";
import './ReferralSystem.css'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import CheckIcon from '@mui/icons-material/Check';
import Loader from "../../../components/Loader/Loader";


const ReferralSystem = () => {
    const {authTokens} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [isIconChanged, setIsIconChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleCopyClick = () => {
        if (data.referral_code) {
            navigator.clipboard.writeText(`${BASE_URL}${data.referral_code}`)
            toast.success('Ваша реферальная ссылка успешно скопирована')
            setIsIconChanged(true)
        } else {
            toast.success('Не удалось скопировать реферальную ссылку')
        }
    }

    useEffect(() => {
        getReferralRequest({setData: setData, token: authTokens.access, isLoading: setIsLoading})
    }, [authTokens])
    console.log(data)
    if (isLoading) {
        return(
            <Loader />
        )
    }
    return (
        <Container className='referral-system-container'>
            <Grid item container>
                <Grid item xs={12}>
                    <Typography className="referral-system-titile">Делитесь реферальной ссылкой с друзьями!</Typography>

                    <Box className='referral-form-container'>
                        <TextField className='referral-system-form-field' fullWidth label='Реферальный код' value={data.referral_code}/>
                        <Button className='referral-system-form-btn' onClick={() => handleCopyClick()}>
                            {isIconChanged ? <CheckIcon /> : <ContentCopyIcon />}
                        </Button> 
                    </Box>     
                </Grid>
                <Grid item xs={6}>
                    <Typography className='referral-page-info-header'>Всего подключилось по вашей ссылке:</Typography>
                    <Typography className='referral-page-text'>+{data.all_invited || 0} Пользователей</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className='referral-page-info-header'>Вы заработали на рефералах:</Typography>
                    <Typography className='referral-page-text'>+0₽</Typography>
                </Grid>
                {data?.invited_referrals.map((referral, index) => {
                    return(
                        <Grid item xs={6} sx={{ marginTop: '70px' }} key={index}>
                            <ReferralInfoCard 
                                avatar={referral.avatar}
                                first_name={referral.first_name}
                                last_name={referral.last_name}
                                date={referral.created_at}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default ReferralSystem