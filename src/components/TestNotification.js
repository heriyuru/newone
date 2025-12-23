"use client";
import { useState } from 'react';

export default function TestNotification() {
  const [status, setStatus] = useState('');

  const handleTest = async () => {
    setStatus('Sending request...');
    try {
      const res = await fetch('/api/notify/send-test', {
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        setStatus('✅ Sent! Check your notifications (Minimize app to see it).');
      } else {
        setStatus('❌ Error: ' + data.error);
      }
    } catch (err) {
      setStatus('❌ Network Error');
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #333' }}>
      <h3>Test Notification System</h3>
      <p>Click this to fetch the token from MongoDB and send an alert.</p>
      
      <button 
        onClick={handleTest}
        style={{
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        Send Test Notification
      </button>
      
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}