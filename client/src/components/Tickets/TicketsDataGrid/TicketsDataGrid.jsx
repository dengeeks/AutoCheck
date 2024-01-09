import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import './TicketsDataGrid.css'


const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
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
      width: 200,
    },
    {
        field: 'is_answered',
        headerName: 'Ответ',
        align: 'center',
        width: 110,
        renderCell: (params) => (
          params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
        ),
    },
];

export default function UserTicketsDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/user-profile/ticket/${params.id}`);
    };
    return (
      <Box sx={{ width: '80vw', overflowX: 'auto', margin: '0 auto'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={handleCellClick}
          className='ticket-data-grid'
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
        />
      </Box>
    );
}