import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { persistor, store } from './store';

const RootComponent = () => {
  const hardcodedDate = '2024-12-24'; 
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = new Date(hardcodedDate);
    const diffInDays = Math.max(0, Math.floor((currentDate - selectedDate) / (1000 * 60 * 60 * 24)));

    
    const calculatedOpacity = Math.max(0, Math.min(1, 1 - diffInDays / 10));
    setOpacity(calculatedOpacity);
  }, []);

  return (
    <div style={{ opacity }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
