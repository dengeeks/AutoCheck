import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
    {
      field: 'social_network',
      headerName: 'Социальная сеть',
      align: 'center',
      width: 200,
    },
    {
      field: 'link',
      headerName: 'Ссылка',
      align: 'center',
      width: 200,
    },
    {
      field: 'qr_code',
      headerName: 'QR CODE',
      align: 'center',
      width: 200,
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

export default function AdminSocialNetworksDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/admin/social-networks/${params.id}`);
    };
    return (
      <Box sx={{ width: '90vw', overflowX: 'auto', margin: '0 auto'}}>
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
