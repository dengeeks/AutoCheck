import { Box } from "@mui/material"
import RegistrationForm from "../../components/AuthForms/RegistrationForm/RegistrationForm"
import '../../styles/Registration.css'
import useDocumentTitle from "../../utils/useDocumentTitle"

const RegistrationPage = () => {
    useDocumentTitle('Регистрация')

    return(
        <Box className='registration-form'  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <RegistrationForm />
        </Box>
    )
}

export default RegistrationPage