import { useIntl } from 'react-intl';

type LocaleFormatterProps = {
  id: string;
};
export const LocaleFormatter = ({ id }: LocaleFormatterProps) => {
  const { formatMessage } = useIntl();

  return <span>{formatMessage({ id })}</span>;
};
