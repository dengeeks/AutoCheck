import React, { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';


const NotificationWebSocket = ({ user_id }) => {
  const {updateUser} = useContext(AuthContext)

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/notification/${user_id}/`);

    // socket.onopen = () => {
    //   console.log('WebSocket connected');
    // };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateUser()
      toast.success(`Ваш баланс пополнен на ${data.message}₽`, {
        autoClose: false,
      })
    };

    // socket.onclose = () => {
    //   console.log('WebSocket closed');
    // };

    return () => {
      socket.close();
    };
  }, [user_id]);
};

export default NotificationWebSocket