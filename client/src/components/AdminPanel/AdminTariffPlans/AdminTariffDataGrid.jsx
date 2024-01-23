import Box from '@mui/material/Box';
import { forwardRef } from 'react';
import {useNavigate} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomToolbar from '../CustomAdminDataGrid/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
    {
      field: 'name',
      headerName: 'Название',
      align: 'center',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Цена',
      align: 'center',
      width: 150,
    },
    {
      field: 'request_quantity',
      headerName: 'Количество запросов',
      align: 'center',
      width: 230,
    },
    {
      field: 'color',
      headerName: 'Цвет',
      align: 'center',
      width: 120,
    },
    {
        field: 'price_for_one',
        headerName: 'Цена за один',
        align: 'center',
        width: 180,
        valueGetter: (params) =>
        `${(params.row.price / params.row.request_quantity).toFixed(1) || 0}`,
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

export default function AdminTariffPlansDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/admin/tariff-plans/${params.id}`);
    };
    
    return (
      <Box sx={{ width: '90vw', overflowX: 'auto', margin: '0 auto'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={handleCellClick}
          hideFooter
          slots={{ columnMenu: CustomToolbar }}
        />
      </Box>
    );
}