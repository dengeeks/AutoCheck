import { 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    GridToolbarExport,
    } from "@mui/x-data-grid"


const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton text='lskdajlf' style={{ color: '#3f51b5' }} />
        <GridToolbarFilterButton style={{ color: '#3f51b5' }} />
        <GridToolbarDensitySelector style={{ color: '#3f51b5' }} />
        <GridToolbarExport style={{ color: '#3f51b5' }} />
      </GridToolbarContainer>
    )
  }

export default CustomToolbar