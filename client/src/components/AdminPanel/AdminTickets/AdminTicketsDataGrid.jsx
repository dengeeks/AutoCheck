import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';


const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
    {
      field: 'user_first_name',
      headerName: 'Имя',
      align: 'center',
      width: 150,
    },
    {
      field: 'user_last_name',
      headerName: 'Фамилия',
      align: 'center',
      width: 150,
    },
    {
      field: 'subject',
      headerName: 'Тема',
      align: 'center',
      width: 230,
    },
    {
      field: 'text',
      headerName: 'Вопрос',
      align: 'center',
      width: 120,
    },
    {
        field: 'is_answered',
        headerName: 'Ответ',
        align: 'center',
        width: 180,
        renderCell: (params) => (
          params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
        ),
    },
    {
      field: 'change',
      headerName: 'Редактировать',
      width: 200,
      align: 'center',
      renderCell: (params) => (
        <div>
          <EditIcon />
        </div>
      ),
    },
];

export default function AdminTicketsDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/admin/ticket/${params.id}`);
    };
    return (
      <Box sx={{ width: '90vw', overflowX: 'auto', margin: '0 auto'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={handleCellClick}
          hideFooter
        />
      </Box>
    );
}