import { useIntl } from 'react-intl';

type LocaleFormatterProps = {
  id: string;
  email?: any;
};
export const LocaleFormatter = ({ id, email }: LocaleFormatterProps) => {
  const { formatMessage } = useIntl();
  const descriptionMessage = formatMessage(
    {
      id,
    },
    { email },
  );
  return <span>{descriptionMessage}</span>;
};
