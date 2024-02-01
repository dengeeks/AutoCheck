import { Box, Typography, Button } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react";
import './AdminDesign.css'
import { getWebsiteLogo } from "../../../api/WebsiteLogo/getWebsiteLogo";
import AuthContext from "../../../context/AuthContext";
import { changeWebsiteLogo } from "../../../api/WebsiteLogo/changeWebsiteLogo";

const AdminDesign = () => {
    const logoInputRef = useRef(null);
    const [logo, setLogo] = useState([]);
    const {authTokens} = useContext(AuthContext)

    const handleFileInputChange = (e) => {
        const newLogo = e.target.files[0];
        const confirmed = window.confirm("Вы уверены что хотите сменить логотип?");
        if (confirmed) {
            changeWebsiteLogo({
                logo: newLogo,
                token: authTokens.access
            })
        }
    };

    useEffect(() => {
        getWebsiteLogo({
            setData: setLogo,
        })
    }, [])

    const handleAttachLogo = () => {
        logoInputRef.current.click();
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Typography className='admin-data-title'>Дизайн</Typography>
            <input
                type="file"
                ref={logoInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept=".jpg, .jpeg, .png"
                multiple
            />
            <Button 
                className='design-btn-change' 
                onClick={handleAttachLogo}
            >
                Установить новый логотип
            </Button>
            <Box sx={{ textAlign:'center' }}>
                <img src={logo.logo} alt="logo" className='design-logo-demo' />
            </Box>
            <Typography>Ожидаемый размер 3795 × 1157</Typography>
        </Box>
    )
}

export default AdminDesign