import { Box } from "@mui/material"
import FAQ from "../../../components/FAQ/FAQ"
import useDocumentTitle from "../../../utils/useDocumentTitle"

const FAQPage = () => {
    useDocumentTitle('FAQ')
    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}
        >
            <FAQ />
        </Box>
    )
}

export default FAQPage