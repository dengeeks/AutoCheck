import React from 'react';
import { Modal, Typography, Box } from '@mui/material';
import HelpModal1 from '../../media/images/HelpModal1.png'
import HelpModal2 from '../../media/images/HelpModal2.png'
import HelpModal3 from '../../media/images/HelpModal3.png'
import CloseIcon from '@mui/icons-material/Close';
import './HelpModal.css'


const HelpModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="help-modal-container"  sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <Box sx={{ display: 'inline-flex' }}>
            <Typography className="main-title-help-modal">Как узнать VIN, госномер и номер кузова</Typography>
            <CloseIcon
              className='help-modal-close-icon'
              onClick={onClose}
            />
        </Box>
        
        <Typography className="title-help-modal">Загляните в документы</Typography>
        <Typography className="text-help-modal">В свидетельство о регистрации (СТС), паспорт транспортного средства (ПТС) или полис ОСАГО. Госномер записанв строке «Регистрационный знак», VIN — в «Идентификационном номере».
        <br /><br />Для проверки праворульных авто вам понадобится номер кузова. Он записан в строке «Кузов №» или «Шасси №».</Typography>
        <Box className='help-modal-image-container'>
           <img src={HelpModal1} alt="Документы" className='help-modal-image' /> 
        </Box>
        
        <Typography className="title-help-modal">Осмотрите автомобиль</Typography>
        <Typography className="text-help-modal">Госномер написан на пластинах спереди и сзади, а VIN — на панели под стеклом, стойке у передней двери и под капотом.</Typography>
        <Box className='help-modal-image-container'>
            <img src={HelpModal2} alt="Автомобиль" className='help-modal-image' />
        </Box>
        
        <Typography className="text-help-modal">Номер кузова написан на табличке под капотом в строке «Frame №» или «Chassis №».</Typography>
        <Box className='help-modal-image-container'>
            <img src={HelpModal3} alt="Табличка под капотом" className='help-modal-image' />
        </Box>
        
      </Box>
    </Modal>
  );
};

export default HelpModal;
