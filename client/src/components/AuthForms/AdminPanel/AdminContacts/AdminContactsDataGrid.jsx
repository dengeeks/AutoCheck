import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'social_network',
      headerName: 'Социальная сеть',
      width: 100,
    },
    {
      field: 'link',
      headerName: 'Ссылка',
      width: 150,
    },
    {
      field: 'qr_code',
      headerName: 'QR CODE',
      width: 50,
    },
];

export default function AdminTariffPlansDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/admin/tariff-plans/${params.id}`);
    };
    return (
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={handleCellClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    );
}
