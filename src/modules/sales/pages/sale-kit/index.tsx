/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { userSaleKit } from '../../services/sale-kit.service';
import { useRootSelector } from '@/hooks/selector.hook';
import ListSaleKit from './list-sale-kit';
import { Search, SearchParams } from '@/components/search';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { usePermission } from '@/hooks/permission.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { ModalProvider } from '../../components/modals/sale-kit';
import SaleKitHeader from './sale-kit.header';
import { Spin, Pagination as PageAnt } from 'antd';
import { Pagination } from '@/constants/pagination';

export default function SaleKitPage() {
  const { getAllSaleKit, downLoadDocument } = userSaleKit();
  const { isAdministrator } = usePermission();

  const [loading] = useWatchLoading(['get-sale-kit', true]);

  const { data, pagination } = useRootSelector((state) => state.sale.saleKit);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

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
    getAllSaleKit({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, []);

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllSaleKit({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  return (
    <ModalProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.saleKit' })}</h3>
      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      {isAdministrator && <SaleKitHeader checkedList={checkedList} />}
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.saleKit' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {pagination?.totalRecords} {formatMessage({ id: 'title.document.saleKit' })}
        </span>
      </div>
      {!loading ? (
        <>
          <ListSaleKit
            isAdministrator={isAdministrator}
            setCheckedList={setCheckedList}
            checkedList={checkedList}
            data={data}
            downLoadDocument={downLoadDocument}
          />
          <PageAnt
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
            onChange={(page) =>
              getAllSaleKit({
                pageIndex: page,
                pageSize: Pagination.PAGESIZE,
              })
            }
            current={pagination?.pageIndex}
            pageSize={Pagination.PAGESIZE}
            total={pagination?.totalRecords}
          />
        </>
      ) : (
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        />
      )}
    </ModalProvider>
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
const searchContainer = css`
  margin: 2.6rem 0;
`;
