import { Box } from "@mui/material"
import FeedbackForm from "../components/FeedbackForm/FeedbackForm"


const FeedbackPage = () => {
    return(
        <Box sx={{ margin: '0 auto', paddingTop: '25px' }}>
            <FeedbackForm />
        </Box>
    )
}

export default FeedbackPage