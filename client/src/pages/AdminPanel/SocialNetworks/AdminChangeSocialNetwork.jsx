import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button, Select, MenuItem } from "@mui/material"
import { getOneSocialNetwork } from "../../../api/admin/socialNetworks/getOneSocialNetworkRequest"
import { deleteSocialNetwork } from "../../../api/admin/socialNetworks/deleteSocialNetworkRequest"
import { changeSocialNetwork } from "../../../api/admin/socialNetworks/changeSocialNetworkRequest"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Loader from "../../../components/Loader/Loader"
import AuthContext from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import '../../../styles/AdminChangeForm.css'


const AdminSocialNetworkChange = () => {
    const fileInputRef = useRef(null);
    const { authTokens } = useContext(AuthContext);
    const [socialNetwork, setSocialNetwork] = useState({ social_network: '', link: '', qr_code: '' });
    const [loading, setLoading] = useState(true);
    const [editedSocialNetwork, setEditedSocialNetwork] = useState({ social_network: '', link: '', qr_code: null });
    const { id } = useParams();
    const navigate = useNavigate()
  
    useEffect(() => {
      getOneSocialNetwork({ id: id, token: authTokens.access, setData: setSocialNetwork, setLoading: setLoading });
    }, [id, authTokens]);
  
    useEffect(() => {
      setEditedSocialNetwork({ ...socialNetwork });
    }, [socialNetwork]);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setEditedSocialNetwork((prev) => ({ ...prev, qr_code: file }));
    };    

    const handleAttachFileClick = () => {
      fileInputRef.current.click();
    };
    
    const handleSaveChanges = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            const isFile = editedSocialNetwork.qr_code instanceof File;
            changeSocialNetwork({
                id: id,
                social_network: editedSocialNetwork.social_network,
                link: editedSocialNetwork.link,
                qr_code: isFile ? editedSocialNetwork.qr_code : null,
                token: authTokens.access
            })
            navigate('/admin/social-networks')
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteSocialNetwork({
                id: id,
                token: authTokens.access
            })
            navigate('/admin/social-networks')
        }
    }
  
    if (loading) {
      return <Loader />;
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <Box className='admin-change-form-header'>
          <Typography className='admin-change-from-title'>Соц. сеть номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
          <Select
            labelId="color-selector-label"
            value={editedSocialNetwork?.social_network || ''}
            fullWidth
            onChange={(e) => setEditedSocialNetwork((prev) => ({ ...prev, social_network: e.target.value }))}
            displayEmpty
            sx={{ marginTop: '10px' }}
          >
            <MenuItem value="" disabled>Выберите соц. сеть</MenuItem>
            <MenuItem value="youtube">Youtube</MenuItem>
            <MenuItem  value="instagram">Instagram</MenuItem>
            <MenuItem value="telegram">Telegram</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="whatsapp">WhatsApp</MenuItem>
            <MenuItem value="viber">Viber</MenuItem>
            <MenuItem value="vk">Vk</MenuItem>
          </Select>
          <TextField
            className='admin-change-form-field'
            label="Ссылка"
            value={editedSocialNetwork?.link || ''}
            type='text'
            onChange={(e) => setEditedSocialNetwork((prev) => ({ ...prev, link: e.target.value }))}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
            multiple
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button className='feedback-file-button' sx={{ marginTop: '5px' }} onClick={handleAttachFileClick} startIcon={<UploadFileIcon />} >Добавить</Button>
          </Box>

          <Box className='admin-change-form-footer'>
            <Button className='admin-change-save-btn' onClick={handleSaveChanges}>Сохранить изменения</Button>
            <Button className='admin-change-delete-btn' onClick={handleDelete}>Удалить</Button>
          </Box>
        </Box>
        {editedSocialNetwork?.qr_code?.name ? 
          <img src={URL.createObjectURL(editedSocialNetwork.qr_code)} alt="QR Code" width='150px' style={{ marginTop: '25px' }} /> 
          : 
          <img src={editedSocialNetwork.qr_code} alt="QR Code" width='150px' style={{ marginTop: '25px' }} />}
      </Box>
    );
};
  
export default AdminSocialNetworkChange;
  
  