import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import { getOneTariffPlan, changeTariffPlan } from "../../../../api/admin/tariff/changeTariffPlanRequest"
import { deleteTariffPlan } from "../../../../api/admin/tariff/deleteTariffPlanRequest"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../../context/AuthContext"
import '../styles/AdminChangeForm.css'


const AdminTariffChange = () => {
    const { authTokens } = useContext(AuthContext);
    const [tariff, setTariff] = useState({});
    const [loading, setLoading] = useState(true);
    const [editedTariff, setEditedTariff] = useState({ name: '', price: 0, request_quantity: 0 });
    const { id } = useParams();
  
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
                token: authTokens.access
            })
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Вы уверены что хотите удалить запись ?");
        if (confirmed) {
            deleteTariffPlan({
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
          <Typography className='admin-change-from-title'>Тариф номер {id}</Typography>
        </Box>
        <Box className='admin-change-from'>
          <TextField
            className='admin-change-form-field'
            placeholder="Name"
            value={editedTariff?.name || ''}
            type='text'
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextField
            className='admin-change-form-field'
            placeholder="Price"
            value={editedTariff?.price || 0}
            type='number'
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <TextField
            className='admin-change-form-field'
            placeholder="Request Quantity"
            value={editedTariff?.request_quantity || 0}
            type='number'
            onChange={(e) => handleInputChange('request_quantity', e.target.value)}
          />
          <Box className='admin-change-form-footer'>
            <Button className='admin-change-save-btn' onClick={handleSaveChanges}>Сохранить изменения</Button>
            <Button className='admin-change-delete-btn' onClick={handleDelete}>Удалить</Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AdminTariffChange;
  
  