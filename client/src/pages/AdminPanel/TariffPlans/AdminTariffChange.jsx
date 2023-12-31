import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button, MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Loader from "../../../components/Loader/Loader"
import '../../../styles/AdminChangeForm.css'

import { deleteTariffPlan } from "../../../api/Admin/tariff/deleteTariffPlanRequest"
import { getOneTariffPlan, changeTariffPlan } from "../../../api/Admin/tariff/changeTariffPlanRequest"


const AdminTariffChange = () => {
    const { authTokens } = useContext(AuthContext);
    const [tariff, setTariff] = useState({});
    const [loading, setLoading] = useState(true);
    const [editedTariff, setEditedTariff] = useState({ name: '', price: 0, request_quantity: 0, color: '' });
    const { id } = useParams();
    const navigate = useNavigate()
  
    useEffect(() => {
      getOneTariffPlan({ id: id, token: authTokens.access, setData: setTariff, setLoading: setLoading });
    }, [id, authTokens.access]);
  
    useEffect(() => {
      setEditedTariff({ ...tariff });
    }, [tariff]);
  
    const handleInputChange = (fieldName, value) => {
      setEditedTariff((prev) => ({ ...prev, [fieldName]: value }));
    };
  
    const handleSaveChanges = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            changeTariffPlan({
                id: id,
                name: editedTariff.name,
                price: editedTariff.price,
                request_quantity: editedTariff.request_quantity,
                color: editedTariff.color,
                token: authTokens.access
            })
            navigate('/admin/tariff-plans')
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteTariffPlan({
                id: id,
                token: authTokens.access
            })
            navigate('/admin/tariff-plans')
        }
    }
  
    if (loading) {
      return <Loader />;
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <Box className='admin-change-form-header'>
          <Typography className='admin-change-from-title'>Тариф номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
          <TextField
            className='admin-change-form-field'
            label="Название"
            value={editedTariff?.name || ''}
            type='text'
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextField
            className='admin-change-form-field'
            label="Цена"
            value={editedTariff?.price || 0}
            type='number'
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <TextField
            className='admin-change-form-field'
            label="Количество запросов"
            value={editedTariff?.request_quantity || 0}
            type='number'
            onChange={(e) => handleInputChange('request_quantity', e.target.value)}
          />
          
          <Select
            labelId="color-selector-label"
            value={editedTariff?.color || ''}
            fullWidth
            onChange={(e) => handleInputChange('color', e.target.value)}
            displayEmpty
            sx={{ marginTop: '10px' }}
          >
            <MenuItem value="" disabled>Выберите цвет</MenuItem>
            <MenuItem value="red">Красный</MenuItem>
            <MenuItem value="orange">Оранжевый</MenuItem>
            <MenuItem value="yellow">Желтый</MenuItem>
            <MenuItem value="blue">Синий</MenuItem>
            <MenuItem value="green">Зелёный</MenuItem>
          </Select>
          <Box className='admin-change-form-footer'>
            <Button className='admin-change-save-btn' onClick={handleSaveChanges}>Сохранить изменения</Button>
            <Button className='admin-change-delete-btn' onClick={handleDelete}>Удалить</Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AdminTariffChange;
  
  