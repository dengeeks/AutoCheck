import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

const columns = [
    { field: 'id', headerName: 'ID', align: 'center', width: 90 },
    {
      field: 'user_name',
      headerName: 'Пользователь',
      align: 'center',
      width: 200,
    },
    {
      field: 'text',
      headerName: 'Отзыв',
      align: 'center',
      width: 250,
    },
    {
      field: 'convenience_rating',
      headerName: 'Удобство',
      align: 'center',
      width: 150,
    },
    {
        field: 'informativeness_rating',
        headerName: 'Информативность',
        align: 'center',
        width: 200,
    },
    {
        field: 'quality_rating',
        headerName: 'Качество',
        align: 'center',
        width: 150,
    },
    {
      field: 'is_allowed',
      headerName: 'Одобрено',
      align: 'center',
      width: 140,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon color="primary" /> : <DoNotDisturbOnIcon color="error" />
      ),
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

export default function AdminReviewDataGrid({rows}) {
    const navigate = useNavigate()
    const handleCellClick = (params) => {
        navigate(`/admin/reviews/${params.id}`);
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
