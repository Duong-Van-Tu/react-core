type MessageOptions = {
  type: MessageType;
  messages: string[];
};

type MessageType = 'success' | 'info' | 'warning' | 'error';
