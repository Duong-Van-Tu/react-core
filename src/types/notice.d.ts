type Base = {
  type: 'message' | 'notification' | 'event';
  id: string;
  title: string;
};

interface Notification extends Base {
  type: 'notification';
  read?: boolean;
  avatar: string;
  datetime: string;
}

interface Message extends Base {
  type: 'message';
  read?: boolean;
  avatar: string;
  datetime: string;
  description: string;
  clickClose: boolean;
}

interface Event extends Base {
  type: 'event';
  description: string;
  extra: string;
  status: keyof typeof EventStatus;
}

type Notices = Notification | Message | Event;

type Notice<T extends Notices['type'] | 'all' = 'all'> = T extends 'all'
  ? Notices
  : Extract<Notices, { type: T }>;
