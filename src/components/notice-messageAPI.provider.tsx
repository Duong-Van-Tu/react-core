import React, { ReactNode, useEffect } from 'react';
import { message } from 'antd';
import { useWatchMessage } from '@/hooks/message.hook';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { errors, successes } = useWatchMessage('global');

  const openMessage = (type: MessageType, content: ReactNode | string) => {
    messageApi.open({
      type,
      content,
    });
  };

  useEffect(() => {
    for (const error of errors) {
      openMessage('error', error);
    }
  }, [errors]);

  useEffect(() => {
    for (const success of successes) {
      openMessage('success', success);
    }
  }, [successes]);

  return <>{contextHolder}</>;
};

export default App;
