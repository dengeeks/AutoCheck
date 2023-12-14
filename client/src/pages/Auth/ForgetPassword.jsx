import ForgetPasswordForm from "../../components/AuthForms/ForgetPasswordForm/ForgetPasswordForm"
import { Box } from "@mui/material"

const ForgetPasswordPage = () => {
    return(
        <Box className='registration-form' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ForgetPasswordForm />
        </Box>
    )
}

export default ForgetPasswordPage