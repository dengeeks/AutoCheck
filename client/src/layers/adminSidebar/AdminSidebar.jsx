import React, {useState, useEffect, useContext} from 'react';
import { Box, List, ListItem, ListItemText, Typography, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDepartment } from '../../api/getDepartmentRequest';
import './AdminSidebar.css';

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
import InstagramIcon from '@mui/icons-material/Instagram';
import ForumIcon from '@mui/icons-material/Forum';
import AuthContext from '../../context/AuthContext';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [department, setDepartment] = useState([])
  const {authTokens} = useContext(AuthContext)

  const reviewsQuantity = department && department.find(result => result.name === 'reviews')?.quantity;
  const usersQuantity = department && department.find(result => result.name === 'users')?.quantity;

  const saveSidebarState = (state) => {
    localStorage.setItem('sidebarState', JSON.stringify(state));
  };

  const loadSidebarState = () => {
    const storedState = localStorage.getItem('sidebarState');
    if (storedState) {
      setIsOpen(JSON.parse(storedState));
    }
  };

  useEffect(() => {
    loadSidebarState();
    getDepartment({setData: setDepartment, token: authTokens.access})
  }, []);

  useEffect(() => {
    saveSidebarState(isOpen);
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    
  return (
    <Box className={`sidebar-container ${isOpen ? 'open' : 'closed-sidebar'}`}>
        <Box className='sidebar-header'>
            {isOpen ? 
                <>
                    <Typography className='sidebar-header-title'>Админ панель</Typography>
                    <ArrowBackIcon onClick={toggleSidebar}/>
                </>
            :
                <ArrowForwardIcon onClick={toggleSidebar}/> }
        </Box>
        <List>
            <Link to='tariff-plans' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <PaymentsIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Тарифные планы" /> : ''}
                </ListItem>
            </Link>
            <Link to='users' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <PeopleAltIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Пользователи" /> : ''}
                    {usersQuantity ? <Badge className='admin-sidebar-badge' color='error' badgeContent={`+${usersQuantity}`} /> : ''}
                </ListItem>
            </Link>
            <Link to='reviews' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <ForumIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Отзывы" /> : ''}
                    {reviewsQuantity ? <Badge className='admin-sidebar-badge' color='error' badgeContent={`+${reviewsQuantity}`} /> : ''}
                    
                </ListItem>
            </Link>
            <Link to='social-networks' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <InstagramIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Социальные сети" /> : ''}
                </ListItem>
            </Link>
            <Link to='contacts' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <ContactsIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Контакты" /> : ''}
                </ListItem>
            </Link>
            <Link to='statistic' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <AssessmentIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Статистика" /> : ''} 
                </ListItem>
            </Link>
            <Link to='referral-system' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <GroupAddIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Реферальная система" /> : ''}
                </ListItem>
            </Link>
            <Link to='blocked' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <FmdBadIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Нарушители" /> : ''}
                </ListItem>
            </Link>
            <Link to='mailing' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <MarkAsUnreadIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Рассылка" /> : ''}
                </ListItem>
            </Link>
            <Link to='ticket-system' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <ConfirmationNumberIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Тикетная система" /> : ''}
                </ListItem>
            </Link>
            <Link to='report-history' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <HistoryIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="История отчетов" /> : ''}
                </ListItem>
            </Link>
            <Link to='design' style={{ color: 'black', textDecoration: 'none' }}>
                <ListItem button>
                    <BrushIcon />
                    {isOpen ? <ListItemText className='sidebar-list-item' primary="Дизайн" /> : ''}
                </ListItem>
            </Link>

        </List>
    </Box>
  );
};

export default Sidebar;
