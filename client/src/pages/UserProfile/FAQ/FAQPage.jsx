import { Box } from "@mui/material"
import FAQ from "../../../components/FAQ/FAQ"
import useDocumentTitle from "../../../utils/useDocumentTitle"

const FAQPage = () => {
    useDocumentTitle('FAQ')
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            }}
        >
            <FAQ />
        </Box>
    )
}

export default FAQPage