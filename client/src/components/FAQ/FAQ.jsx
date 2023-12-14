import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import faqAnswer1 from '../../media/images/1.png'
import faqAnswer2 from '../../media/images/2.png'
import faqAnswer3 from '../../media/images/3.png'
import { Link } from 'react-router-dom';
import './FAQ.css'


const FAQItem = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);
  
    const handleToggle = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Accordion expanded={expanded} onChange={handleToggle}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {expanded ? <ExpandLessIcon sx={{ marginRight: 1 }} /> : <ExpandMoreIcon sx={{ marginRight: 1 }} /> }
          <Typography className="faq-question-text" variant="h6">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {answer}
        </AccordionDetails>
      </Accordion>
    );
  };

const FAQ = () => {
  return (
    <Box className='faq-container'>
      <Typography className='faq-title-text'>Ответы на вопросы</Typography>
      <FAQItem
        question="Как узнать VIN, госномер и номер кузова?"
        answer={
            <Grid container>
                <Grid item xs={6}>
                    <Typography className='answer-second-title'>Загляните в документы</Typography>
                    <Typography className='faq-answer-text'>В свидетельство о регистрации (СТС), паспорт транспортного средства (ПТС) или полис ОСАГО. Госномер записанв строке «Регистрационный знак», VIN — в «Идентификационном номере».</Typography>
                    <Typography className='faq-answer-text'>Для проверки праворульных авто вам понадобится номер кузова. Он записан в строке «Кузов №» или «Шасси №».</Typography>
                </Grid>
                <Grid item xs={6}>
                    <img src={faqAnswer1} className='faq-answer-image' alt="" />
                </Grid>

                <Grid item xs={6}>                 
                    <Typography className='answer-second-title'>Осмотрите автомобиль</Typography>
                    <Typography className='faq-answer-text'>Госномер написан на пластинах спереди и сзади, а VIN — на панели под стеклом, стойке у передней двери и под капотом.</Typography>
                    <img src={faqAnswer2} className='faq-answer-image' alt="" />
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ marginTop: '30px' }} className='faq-answer-text'>Номер кузова написан на табличке под капотом в строке «Frame №» или «Chassis №».</Typography>
                    <img src={faqAnswer3} className='faq-answer-image' alt="" />
                </Grid>
            </Grid>
        }
      />
      <FAQItem
        question="Сколько времени занимает проверка?"
        answer={
            <Typography className='faq-answer-text'>
                Обычно отчёт формируется за несколько минут. Но если базы данных наших партнёров не отвечают, проверка длится дольше. Как только информация появляется, мы отправляем отчёт вам на почту.
            </Typography>
            
        }
      />
      <FAQItem
        question="Что делать если отчет не приходит?"
        answer={
            <Typography className='faq-answer-text'>
                Обычно нужно просто подождать: мы отправляем отчёт сразу, как получаем данные из базы партнёра.
                Письмо может попасть в папку «Спам» — проверьте её. Также результаты проверок сохраняются в разделе «Мои отчёты».
            </Typography>
            }
      />
      <Typography className='support-text'>Если у вас остались вопросы, <Link to='/feedback' style={{ color: '#498EDF', textDecoration: 'none' }}>напишите нам</Link> ✍️</Typography>
    </Box>
  );
};

export default FAQ;