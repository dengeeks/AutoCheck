import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Loader from "../../../components/Loader/Loader"
import AdminUserBlockModal from "../../../components/AdminPanel/AdminUsers/AdminUserBlockModal"
import '../../../styles/AdminChangeForm.css'
import GenerateUserPassword from "./GenerateUserPassword"

import { unblockUser } from "../../../api/Admin/users/unblockUserRequest"
import { adminChangeUserInfo } from "../../../api/Admin/users/changeUserInfo"
import { getOneUser } from "../../../api/Admin/users/getOneUserRequest"


const AdminUsersChange = () => {
    const { authTokens } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [editedUser, setEditedUser] = useState({ first_name: '', last_name: '', email: '', current_tariff: '', request_quantity: 0, is_blocked: false });
    const [openModal, setOpenModal] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()
  
    useEffect(() => {
      getOneUser({ id: id, token: authTokens.access, setData: setUser, setLoading: setLoading });
    }, [id, authTokens.access]);
  
    useEffect(() => {
        setEditedUser({ ...user });
    }, [user]);
  
    const handleInputChange = (fieldName, value) => {
        setEditedUser((prev) => ({ ...prev, [fieldName]: value }));
    };

    const handleUnblockUser = () => {
        unblockUser({user: id, token: authTokens.access})
        navigate('/admin/users/')
    }

    const handleUserChange = () => {
        const confirmed = window.confirm("Вы уверены что хотите применить изменения?");
        if (confirmed) {
            adminChangeUserInfo({
                id: id,
                first_name: editedUser.first_name, 
                last_name: editedUser.last_name, 
                email: editedUser.email, 
                request_quantity: editedUser.request_quantity,
                token: authTokens.access,
            })
        }
    }

    const onClose = () => {
        setOpenModal(false)
    }

    if (loading) {
      return <Loader />;
    }
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <AdminUserBlockModal open={openModal} onClose={onClose} id={id} token={authTokens.access}/>
        <Box className='admin-change-form-header'>
          <Typography className='admin-change-from-title'>Пользователь номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
            <TextField
                className='admin-change-form-field'
                label="Имя"
                value={editedUser?.first_name || ''}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                type='text'
            />
            <TextField
                className='admin-change-form-field'
                label="Фамилия"
                value={editedUser?.last_name || ''}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                type='text'
            />
            <TextField
                className='admin-change-form-field'
                label="Почта"
                value={editedUser?.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type='text'
            />
            <GenerateUserPassword id={id} token={authTokens.access} />
            <TextField
                className='admin-change-form-field'
                label="Тарифный план"
                value={editedUser?.current_tariff || ''}
                disabled
            />
            <TextField
                className='admin-change-form-field'
                label="Количество запросов"
                value={editedUser?.request_quantity || ''}
                type='number'
                onChange={(e) => handleInputChange('request_quantity', e.target.value)}
            />       

            <Box className='admin-change-form-footer'>
                {editedUser.is_blocked ? 
                    <Button className='admin-change-save-btn' sx={{ width: '50%' }} onClick={() => handleUnblockUser()}>Разблокировать</Button> 
                :
                    <Button className='admin-change-delete-btn' onClick={() => setOpenModal(true)} sx={{ width: '50%' }}>Заблокировать</Button>
                }
                <Button className='admin-change-save-btn' sx={{ width: '45%' }} onClick={() => handleUserChange()}>Сохранить изменения</Button>
            </Box>
        </Box>
      </Box>
    );
};
  
export default AdminUsersChange;
  
  