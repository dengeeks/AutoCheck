import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Имя',
      width: 150,
    },
    {
      field: 'last_name',
      headerName: 'Фамилия',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Электронная почта',
      width: 250,
    },
    {
      field: 'full_name',
      headerName: 'Полное имя',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
        field: 'current_tariff',
        headerName: 'Текущий тариф',
        width: 90,
    },
    {
        field: 'request_quantity',
        headerName: 'Количество запросов',
        width: 90,
    },
];

export default function AdminUsersDataGrid({rows}) {
    return (
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
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