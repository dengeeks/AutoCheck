import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import './TicketsDataGrid.css'


const columns = [
    {
      field: 'subject',
      headerName: 'Тема',
      width: 230,
      disableColumnMenu: true 
    },
    {
        field: 'is_closed',
        headerName: 'Ответ',
        width: 110,
        disableColumnMenu: true,
        renderCell: (params) => (
          params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
        ),
    },
    {
      field: 'unread_messages_count',
      headerName: 'Новых сообщений',
      width: 180,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.value !== 0) {
          return (
            <Box sx={{ 
              background: '#d32f2f',
              color: 'white',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center'
            }}>
              <Typography>{params.value}</Typography>
            </Box>
          );
        } else {
          return null;
        }
      },
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