import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
    {
      field: 'first_name',
      headerName: 'Имя',
      align: 'center',
      width: 180,
    },
    {
      field: 'last_name',
      headerName: 'Фамилия',
      align: 'center',
      width: 180,
    },
    {
        field: 'email',
        headerName: 'Email',
        align: 'center',
        width: 280,
    },
    {
        field: 'referred_count',
        headerName: 'Приглашенные пользователи',
        align: 'center',
        width: 280,
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

export default function AdminReferralSystemDataGrid({rows}) {
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
