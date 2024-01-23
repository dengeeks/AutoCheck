import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useNavigate } from 'react-router-dom';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Имя',
      align: 'center',
      width: 150,
    },
    {
      field: 'last_name',
      headerName: 'Фамилия',
      align: 'center',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Электронная почта',
      align: 'center',
      width: 220,
    },
    {
      field: 'full_name',
      headerName: 'Полное имя',
      sortable: false,
      align: 'center',
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
        field: 'current_tariff',
        headerName: 'Текущий тариф',
        align: 'center',
        width: 180,
    },
    {
        field: 'is_blocked',
        headerName: 'Заблокирован',
        align: 'center',
        width: 180,
        renderCell: (params) => (
          params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
        ),
    },
    {
        field: 'request_quantity',
        headerName: 'Количество запросов',
        align: 'center',
        width: 210,
    },
    {
      field: 'change',
      headerName: 'Редактировать',
      width: 170,
      align: 'center',
      renderCell: (params) => (
        <div>
          <EditIcon />
        </div>
      ),
    },
];

export default function AdminUsersDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
      navigate(`/admin/users/${params.id}`);
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