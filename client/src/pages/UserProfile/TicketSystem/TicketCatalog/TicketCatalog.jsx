import { Button, Typography, Box } from "@mui/material"
import { useState } from "react"
import TicketsNotFoundImg from '../../../../media/images/TicketsNotFound.png'
import TicketsDataGrid from "../../../../components/Tickets/TicketsDataGrid/TicketsDataGrid"
import TicketCreateModal from "../../../../components/Tickets/TicketCreateModal/TicketCreateModal"
import './TicketCatalog.css'


const TicketSystem = () => {
  const [isOpen, setIsOpen] = useState(false)
    const data = [
        { id: 1, title: 'hello world', theme: 'hello wolrd', is_responsed: false },
        { id: 2, title: 'hello world', theme: 'hello wolrd', is_responsed: false },
        { id: 3, title: 'hello world', theme: 'hello wolrd', is_responsed: false },
        { id: 4, title: 'hello world', theme: 'hello wolrd', is_responsed: false },
    ];

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Box sx={{ overflowY: 'none' }}>
      <TicketCreateModal open={isOpen} onClose={handleCloseModal} />
      <Typography className='ticket-system-title'>Ваши запросы</Typography>
      <Box className='ticket-system-btn-container' onClick={handleOpenModal}>
            <Button className='create-ticket-btn'>Создать запрос</Button>
      </Box>

      {data ? (
        <TicketsDataGrid rows={data} />
      ) : (
        <>
          <Typography>Список пуст</Typography>
          <img src={TicketsNotFoundImg} alt="Запросы отсутствуют" width={200} />
        </>
      )}
    </Box>
  );
}

export default TicketSystem;
