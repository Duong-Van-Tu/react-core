import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { reduxStore } from '@/redux/store.ts';
import App from './App.tsx';
import './index.css';
import { AgentProvider } from './components/agent.provider.tsx';
import NoticeMessageAPI from './components/notice-messageAPI.provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AgentProvider>
        <App />
        <NoticeMessageAPI />
      </AgentProvider>
    </Provider>
    ,
  </React.StrictMode>,
);
