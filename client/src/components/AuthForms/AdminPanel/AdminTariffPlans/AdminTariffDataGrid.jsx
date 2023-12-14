import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Название',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Цена',
      width: 150,
    },
    {
      field: 'request_quantity',
      headerName: 'Количество запросов',
      width: 250,
    },
    {
        field: 'price_for_one',
        headerName: 'Цена за один',
        width: 250,
        valueGetter: (params) =>
        `${params.row.price / params.row.request_quantity || 0}`,
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
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
        />
      </Box>
    );
}
