/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { ModalContractProvider } from '../../components/modals/contract';
import TableContract from './table-contract';
import { useLocale } from '@/hooks/locale.hook';
export default function ContractPage() {
  const { formatMessage } = useLocale();
  const dispatch = useDispatch();
  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Danh mục',
          en_US: 'Category',
        },
      },
      {
        title: {
          vi_VN: 'Hợp đồng',
          en_US: 'Contract',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalContractProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.contract' })}</h3>
      <TableContract />
    </ModalContractProvider>
  );
}

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-bottom: 0.5rem;
`;
