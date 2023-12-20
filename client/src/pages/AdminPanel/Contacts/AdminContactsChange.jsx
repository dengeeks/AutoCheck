import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import { getOneContact } from "../../../api/admin/contacts/getOneContactRequest"
import { deleteContact } from "../../../api/admin/contacts/deleteContactRequest"
import { changeContactsRequest } from "../../../api/admin/contacts/changeContactsRequest"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import Loader from "../../../components/Loader/Loader"
import '../../../styles/AdminChangeForm.css'


const AdminContactChange = () => {
    const { authTokens } = useContext(AuthContext);
    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(true);
    const [editedContact, setEditedContact] = useState({ name: '', info: '' });
    const { id } = useParams();

    const navigate = useNavigate()
  
    useEffect(() => {
      getOneContact({ id: id, token: authTokens.access, setData: setContact, setLoading: setLoading });
    }, [id, authTokens.access]);
  
    useEffect(() => {
      setEditedContact({ ...contact });
    }, [contact]);
  
    const handleInputChange = (fieldName, value) => {
      setEditedContact((prev) => ({ ...prev, [fieldName]: value }));
    };
  
    const handleSaveChanges = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            changeContactsRequest({
                id: id,
                name: editedContact.name,
                info: editedContact.info,
                token: authTokens.access
            })
            navigate('/admin/contacts')
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteContact({
                id: id,
                token: authTokens.access
            })
            navigate('/admin/contacts')
        }
    }
  
    if (loading) {
      return <Loader />;
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <Box className='admin-change-form-header'>
          <Typography className='admin-change-from-title'>Контакт номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
          <TextField
            className='admin-change-form-field'
            label="Название"
            value={editedContact?.name || ''}
            type='text'
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextField
            className='admin-change-form-field'
            label="Информация"
            value={editedContact?.info || ''}
            onChange={(e) => handleInputChange('info', e.target.value)}
          />
          <Box className='admin-change-form-footer'>
            <Button className='admin-change-save-btn' onClick={handleSaveChanges}>Сохранить изменения</Button>
            <Button className='admin-change-delete-btn' onClick={handleDelete}>Удалить</Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AdminContactChange;
  
  