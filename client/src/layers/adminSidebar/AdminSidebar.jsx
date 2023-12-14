import React, {useState} from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
;import { Link } from 'react-router-dom';
import './AdminSidebar.css'

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentsIcon from '@mui/icons-material/Payments';
import BrushIcon from '@mui/icons-material/Brush';
import HistoryIcon from '@mui/icons-material/History';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContactsIcon from '@mui/icons-material/Contacts';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    
  return (
    <Box className={`sidebar-container ${isOpen ? 'open' : 'closed-sidebar'}`}>
        <Box className='sidebar-header'>
            {isOpen ? 
                <>
                    <Typography className='sidebar-header-title'>Админ панель</Typography>
                    <ArrowForwardIcon onClick={toggleSidebar}/> 
                </>
            :
                <ArrowBackIcon onClick={toggleSidebar}/>}
        </Box>
        <List>
            <Link to='tariff-plans' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Тарифные планы" /> : ''}
                    <PaymentsIcon />
                </ListItem>
            </Link>
            <Link to='users' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Пользователи" /> : ''}
                    <PeopleAltIcon />
                </ListItem>
            </Link>
            <Link to='contacts' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Контакты" /> : ''}
                    <ContactsIcon />
                </ListItem>
            </Link>
            <Link to='statistic' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Статистика" /> : ''}
                    <AssessmentIcon />
                </ListItem>
            </Link>
            <Link to='referral-system' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Реферальная система" /> : ''}
                    <GroupAddIcon />
                </ListItem>
            </Link>
            <Link to='violators' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Нарушители" /> : ''}
                    <FmdBadIcon />
                </ListItem>
            </Link>
            <Link to='newsletter' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Рассылка" /> : ''}
                    <MarkAsUnreadIcon />
                </ListItem>
            </Link>
            <Link to='ticket-system' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Тикетная система" /> : ''}
                    <ConfirmationNumberIcon />
                </ListItem>
            </Link>
            <Link to='report-history' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="История отчетов" /> : ''}
                    <HistoryIcon />
                </ListItem>
            </Link>
            <Link to='design' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Дизайн" /> : ''}
                    <BrushIcon />
                </ListItem>
            </Link>

        </List>
    </Box>
  );
};

export default Sidebar;
