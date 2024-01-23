import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import './TicketsDataGrid.css'


const columns = [
    { field: 'id', headerName: 'ID', width: 90, disableColumnMenu: true },
    {
      field: 'subject',
      headerName: 'Тема',
      width: 230,
      disableColumnMenu: true 
    },
    {
      field: 'text',
      headerName: 'Вопрос',
      width: 200,
      disableColumnMenu: true 
    },
    {
        field: 'is_answered',
        headerName: 'Ответ',
        width: 110,
        disableColumnMenu: true,
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
          hideFooter        
          hideFooterPagination
          hideFooterSelectedRowCount
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