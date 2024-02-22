import { Box } from "@mui/material"
import FeedbackForm from "../components/FeedbackForm/FeedbackForm"
import useDocumentTitle from "../utils/useDocumentTitle"


const FeedbackPage = () => {
    useDocumentTitle('Обратная связь')
    return(
        <Box sx={{ margin: '0 auto', paddingTop: '25px' }}>
            <FeedbackForm />
        </Box>
    )
}

export default FeedbackPage