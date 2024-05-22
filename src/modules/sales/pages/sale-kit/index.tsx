/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { userSaleKit } from '../../services/sale.kit.service';
import { useRootSelector } from '@/hooks/selector.hook';
import ListSaleKit from './list.sale.kit';

export default function SaleKitPage() {
  const { getAllSaleKit, downLoadDocument } = userSaleKit();

  const { data } = useRootSelector((state) => state.sale.saleKit);

  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Sale',
          en_US: 'Sale',
        },
      },
      {
        title: {
          vi_VN: 'Sale kit',
          en_US: 'Sale kit',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  useEffect(() => {
    getAllSaleKit({});
  }, []);

  return (
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.saleKit' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.saleKit' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {data?.length} {formatMessage({ id: 'title.document.saleKit' })}
        </span>
      </div>
      <ListSaleKit data={data} downLoadDocument={downLoadDocument} />
    </Fragment>
  );
}

const subTitleStyle = css`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
  gap: 4px;
  font-size: 1.4rem;
`;
const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;
