import { Box } from "@mui/material"
import ChangePasswordForm from "../../components/AuthForms/ChangePasswordForm/ChangePasswordForm"
import useDocumentTitle from "../../utils/useDocumentTitle"

const ChangePassword = () => {
    useDocumentTitle('Смена пароля')
    
    return(
        <Box className='registration-form' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ChangePasswordForm />
        </Box>
    )
}

export default ChangePassword