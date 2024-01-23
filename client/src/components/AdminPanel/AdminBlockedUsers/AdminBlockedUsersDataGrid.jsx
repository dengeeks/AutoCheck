import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';


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
      width: 250,
    },
    {
        field: 'request_quantity',
        headerName: 'Количество запросов',
        align: 'center',
        width: 210,
    },
    {
        field: 'block_reason',
        headerName: 'Причина блокировки',
        align: 'center',
        width: 210,
    },
    {
        field: 'blocked_until',
        headerName: 'Длительность блокировки',
        align: 'center',
        width: 240,
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

export default function BlockedUsersDataGrid({rows}) {
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
        />
      </Box>
    );
}