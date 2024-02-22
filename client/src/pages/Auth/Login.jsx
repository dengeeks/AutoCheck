import LoginForm from "../../components/AuthForms/LoginForm/LoginForm"
import { Box } from "@mui/material"
import useDocumentTitle from "../../utils/useDocumentTitle"

const LoginPage = () => {
    useDocumentTitle('Авторизация')

    return(
        <Box className='registration-form' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoginForm />
        </Box>
    )
}

export default LoginPage