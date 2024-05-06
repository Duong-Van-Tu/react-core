import { ReactElement } from 'react';
import { useIntl } from 'react-intl';

type WrapperRouteComponent = {
  titleId: string;
  children: ReactElement;
};
export default function WrapperRouteComponent({ titleId, children }: WrapperRouteComponent) {
  const { formatMessage } = useIntl();
  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  return children;
}
