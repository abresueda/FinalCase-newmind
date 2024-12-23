import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Notification() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // WebSocket sunucusuna bağlan
    const socket = io('http://localhost:3000', {
      transports: ['websocket'], // Performans için yalnızca websocket kullanılıyor
    });

    // Sadece paymentSuccess event'ini dinle
    socket.on('paymentSuccess', (data) => {
      if (data.title && data.description) {
        setNotification(data); // Gelen paymentSuccess mesajını kaydet
      }
    });

    // Component unmount olduğunda socket bağlantısını kapat
    return () => {
      socket.disconnect();
    };
  }, []); // WebSocket yalnızca component mount edildiğinde bağlanır

  // Bildirimi kapatma işlemi
  const handleCloseNotification = () => {
    setNotification(null);
  };

  return notification ? (
    <div className="notification">
      <p>{notification.title}</p>
      <p>{notification.description}</p>
      <button onClick={handleCloseNotification}>Close</button>
    </div>
  ) : null; // Eğer bildirim yoksa hiçbir şey gösterilmez
}

export default Notification;
