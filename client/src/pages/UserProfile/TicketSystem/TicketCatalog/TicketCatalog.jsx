import { Button, Typography, Box } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import AuthContext from "../../../../context/AuthContext"
import TicketCreateModal from "../../../../components/Tickets/TicketCreateModal/TicketCreateModal"
import UserTicketsDataGrid from "../../../../components/Tickets/TicketsDataGrid/TicketsDataGrid"
import Loader from "../../../../components/Loader/Loader"
import TicketsNotFoundImg from '../../../../media/images/TicketsNotFound.png'
import './TicketCatalog.css'
import { getTickets } from "../../../../api/Tickets/getTickets"
import useDocumentTitle from "../../../../utils/useDocumentTitle"


const TicketSystem = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {authTokens} = useContext(AuthContext)
  const [tickets, setTickets] = useState([])
  useDocumentTitle('Помощь')

  useEffect(() => {
    getTickets({setData: setTickets, isLoading: setIsLoading, token: authTokens.access})
  }, [authTokens])

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  console.log(tickets)

  if (isLoading) {
    return(
      <Loader />
    )
  }
  return (
    <Box sx={{ overflowY: 'none' }}>
      <TicketCreateModal open={isOpen} onClose={handleCloseModal} />
      <Typography className='ticket-system-title'>Ваши запросы</Typography>
      <Box className='ticket-system-btn-container' onClick={handleOpenModal}>
            <Button className='create-ticket-btn'>Создать запрос</Button>
      </Box>

      {tickets ? (
        <UserTicketsDataGrid rows={tickets} />
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
