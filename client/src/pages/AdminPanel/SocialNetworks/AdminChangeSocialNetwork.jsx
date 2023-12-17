import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import { getOneSocialNetwork } from "../../../api/admin/socialNetworks/getOneSocialNetworkRequest"
import { deleteSocialNetwork } from "../../../api/admin/socialNetworks/deleteSocialNetworkRequest"
import { changeSocialNetwork } from "../../../api/admin/socialNetworks/changeSocialNetworkRequest"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AuthContext from "../../../context/AuthContext"
import '../../../styles/AdminChangeForm.css'


const AdminSocialNetworkChange = () => {
    const fileInputRef = useRef(null);
    const { authTokens } = useContext(AuthContext);
    const [socialNetwork, setSocialNetwork] = useState({ social_network: '', link: '', qr_code: '' });
    const [loading, setLoading] = useState(true);
    const [editedSocialNetwork, setEditedSocialNetwork] = useState({ social_network: '', link: '', qr_code: null });
    const { id } = useParams();
  
    useEffect(() => {
      getOneSocialNetwork({ id: id, token: authTokens.access, setData: setSocialNetwork, setLoading: setLoading });
    }, [id]);
  
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
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteSocialNetwork({
                id: id,
                token: authTokens.access
            })
        }
    }
  
    if (loading) {
      return <h1>Loading</h1>;
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <Box className='admin-change-form-header'>
          <Typography className='admin-change-from-title'>Соц. сеть номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
          <select
            style={{ height: '50px' }}
            value={editedSocialNetwork?.social_network || ''}
            onChange={(e) => setEditedSocialNetwork((prev) => ({ ...prev, social_network: e.target.value }))}
          >
            <option value="">Выберите соц. сеть</option>
            <option value="youtube">Youtube</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram</option>
            <option value="facebook">Facebook</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="viber">Viber</option>
            <option value="vk">Vk</option>
          </select>

          <TextField
            className='admin-change-form-field'
            placeholder="Link"
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
  
  