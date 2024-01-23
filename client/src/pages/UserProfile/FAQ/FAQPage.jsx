import { Box } from "@mui/material"
import FAQ from "../../../components/FAQ/FAQ"

const FAQPage = () => {
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