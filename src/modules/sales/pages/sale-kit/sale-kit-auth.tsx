/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import ListSaleKit from './list-sale-kit';
import { usePermission } from '@/hooks/permission.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useState } from 'react';
import { userSaleKit } from '../../services/sale-kit.service';
import { Select, Spin, Pagination as PageAnt } from 'antd';
import { Link } from 'react-router-dom';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Pagination } from '@/constants/pagination';

const SaleKitAuth = () => {
  const { formatMessage } = useLocale();
  const { isAdministrator } = usePermission();
  const { getAllSaleKitRole, downLoadDocument, getAllRoleInSaleKit } = userSaleKit();

  const [loading] = useWatchLoading(['get-sale-kit-role', true]);

  const { dataSaleKitRole, dataRole, pagination } = useRootSelector((state) => state.sale.saleKit);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [itemSelect, setItemSelect] = useState<string>('');
  const [dataSelect, setDataSelect] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    getAllRoleInSaleKit();
  }, []);

  useEffect(() => {
    if (itemSelect) {
      getAllSaleKitRole({
        roleId: itemSelect,
        pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [itemSelect]);

  useEffect(() => {
    if (dataRole.length > 0) {
      const data = dataRole.map((it) => ({
        value: it.id,
        label: it.displayName,
      }));

      setItemSelect(data[0].value);
      setDataSelect(data);
    }
  }, [dataRole]);

  const handleSelect = (roleId: string) => {
    setItemSelect(roleId);
  };

  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon width={12} height={14} type="prev" />
        <Link css={goBackLinkStyle} to={'/sales/sale-kit'}>
          {formatMessage({ id: 'title.back' })}
        </Link>
      </div>
      <h1 css={titleStyle}>{formatMessage({ id: 'title.document.saltKitAuth' })}</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <h2
          style={{
            fontSize: '14px',
            color: '#667085',
          }}
        >
          {formatMessage({ id: 'title.role' })}
        </h2>
        <Select
          style={{
            width: '200px',
          }}
          value={itemSelect}
          options={dataSelect}
          onChange={handleSelect}
        />
      </div>
      {!loading ? (
        <>
          <ListSaleKit
            isAdministrator={isAdministrator}
            setCheckedList={setCheckedList}
            checkedList={checkedList}
            dataWithRole={dataSaleKitRole}
            downLoadDocument={downLoadDocument}
          />
          <PageAnt
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
            onChange={(page) =>
              getAllSaleKitRole({
                roleId: itemSelect,
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
    </div>
  );
};

export default SaleKitAuth;

const containerStyle = css`
  width: 100%;
  max-width: 120rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 3.7rem;
  svg path {
    fill: rgba(0, 0, 0, 1);
  }
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin: 8rem 0 6rem;
`;

const goBackLinkStyle = css`
  cursor: pointer;
  font-size: 1.4rem;
  color: #000;
`;
