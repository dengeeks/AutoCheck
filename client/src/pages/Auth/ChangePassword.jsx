import { Box } from "@mui/material"
import ChangePasswordForm from "../../components/AuthForms/ChangePasswordForm/ChangePasswordForm"


const ChangePassword = () => {
    return(
        <Box className='registration-form' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ChangePasswordForm />
        </Box>
    )
}

export default ChangePassword