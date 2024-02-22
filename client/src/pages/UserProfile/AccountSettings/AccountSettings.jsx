import { Container, Box, TextField, Button, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import DialogImageCrop from "../../../components/AvatarUploader/DialogImageCropper";
import { validateAccountSettings } from "./ValidateAccountSettings";
import './AccountSettings.css'
import { UpdateUserInfo } from "../../../api/AccountSettings/UpdateUserInfo";
import Loader from "../../../components/Loader/Loader";
import useDocumentTitle from "../../../utils/useDocumentTitle";


const AccountSettings = () => {    
    const {authTokens, user, logoutUser, updateUser } = useContext(AuthContext)
    const [editedUser, setEditedUser] = useState({first_name: '', last_name: '', email: ''})
    const [newAvatar, setNewAvatar] = useState()
    const [newPassword, setNewPassword] = useState({password: '', password1: ''})
    useDocumentTitle('Настройки аккаунта')
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    const avatarInputRef = useRef(null);

    useEffect(() => {
        setEditedUser({...user})
    }, [user])

    const handleAttachFileClick = () => {
        avatarInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const newAvatar = e.target.files[0];
        setNewAvatar(newAvatar)
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setNewPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleAccountSettingSubmit = () => {
        if (newPassword.password !== newPassword.password1) {
            setError({password: 'Пароли не совпадают'})
        } else {
            if (validateAccountSettings({
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                email: editedUser.email,
                password: newPassword.password,
                setError: setError,
            })) {
                UpdateUserInfo({
                    first_name: editedUser.first_name,
                    last_name: editedUser.last_name,
                    email: editedUser.email,
                    password: newPassword.password,
                    token: authTokens.access,
                    updateUser: updateUser,
                })
            }
        }
    }

    return(
        <Container className='profile-settings-container'>
            {newAvatar && 
                <DialogImageCrop selectedImage={newAvatar} />
            }
            <Typography
                className='profile-settings-main-title'
            >
                Настройки аккаунта
            </Typography>
            <Box className='profile-settings-avatar-container'>
                <Typography
                    className='profile-settings-avatar-title' 
                    sx={{ marginBottom: '5px' }}    
                >
                    Аватарка профиля
                </Typography>
                <Box>
                    <img 
                        src={user?.avatar} 
                        className='profile-settings-avatar-img user-avatar-border'
                        alt="avatar" 
                        onClick={() => handleAttachFileClick()}
                    />
                </Box>
                <input
                    type="file"
                    ref={avatarInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    accept=".jpg, .jpeg, .png"
                    multiple
                />
                <Button className='profile-settings-avatar-btn' onClick={() => handleAttachFileClick()}>
                    Изменить аватар <AccountCircleIcon sx={{ marginLeft: '15px' }} />
                </Button>
            </Box>
            <Box>
                <Typography className='profile-settings-title'>Личные данные</Typography>
            </Box>
                <Box className='profile-settings-fields-container' sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField 
                        className='profile-settings-field'
                        value={editedUser.first_name}
                        onChange={handleFieldChange}
                        label='Имя'
                        name='first_name'
                        helperText={error.first_name}
                        error={!!error.first_name}
                    />
                    <TextField 
                        className='profile-settings-field' 
                        value={editedUser.last_name} 
                        onChange={handleFieldChange}
                        label='Фамилия'
                        name='last_name'
                        helperText={error.last_name}
                        error={!!error.last_name}
                    />
                    <TextField 
                        className='profile-settings-field' 
                        value={editedUser.email}
                        onChange={handleFieldChange}
                        label='E-mail'
                        name='email'
                        helperText={error.email}
                        error={!!error.email}
                    />
                </Box>
            <Typography className='profile-settings-change-title'>
                Сменить пароль
            </Typography>
            <Box className='profile-settings-fields-container' sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField 
                    className='profile-settings-field' 
                    value={newPassword.password}
                    onChange={handlePasswordChange}
                    label='Новый пароль'
                    name='password'
                    helperText={error.password}
                    error={!!error.password}
                />
                <TextField 
                    className='profile-settings-field'
                    value={newPassword.password1}
                    onChange={handlePasswordChange}
                    label='Повтор пароля'
                    name='password1'
                    helperText={error.password}
                    error={!!error.password}
                />
            </Box>
            <Box className='profile-settings-btns'>
                <Button className='profile-settings-save-changes' onClick={handleAccountSettingSubmit}>
                    Сохранить изменения
                </Button>
                <Button className='profile-settings-exit' onClick={logoutUser}>
                    Выйти
                </Button>     
            </Box>
        </Container>
    )
}

export default AccountSettings