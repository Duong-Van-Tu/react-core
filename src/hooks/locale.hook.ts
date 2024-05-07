import type { MessageDescriptor } from 'react-intl';

import { useIntl } from 'react-intl';

import en_US from '@/locales/en-US';
import vi_VN from '@/locales/vi-VN';

export const localeConfig = {
  vi_VN: vi_VN,
  en_US: en_US,
};

type Id = keyof typeof en_US;

interface Props extends MessageDescriptor {
  id: Id;
}

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
  };
};
