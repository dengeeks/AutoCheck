import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import './TicketsDataGrid.css'

export default function TicketsDataGrid({ rows }) {
    const navigate = useNavigate()
    
    const handleCellClick = (params) => {
        navigate(`/user-profile/ticket/${params.id}`);
    };

    const columns = [
      { field: 'theme', headerName: 'Тема', width: 200 },
      { field: 'text', headerName: 'Сообщение', width: 180},
      {
        field: 'response',
        headerName: 'Ответ',
        width: 100,
        renderCell: (params) => (
          params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
        ),
      },
    ];
  
    return (
        <Box
            sx={{
                width: { xs: '75vw', sm: '85vw' },
                overflowX: 'auto',
                margin: '0 auto',
            }}>
        <DataGrid 
            rows={rows} 
            columns={columns} 
            onCellClick={handleCellClick}
            disableColumnMenu
            hideFooterPagination={true}
            className="ticket-data-grid"
        />
      </Box>
    );
  }