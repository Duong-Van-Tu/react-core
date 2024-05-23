/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { userSaleKit } from '../../services/sale.kit.service';
import { useRootSelector } from '@/hooks/selector.hook';
import ListSaleKit from './list.sale.kit';
import { Search } from '@/components/search';
import { Button, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { PlusCircleOutlined } from '@ant-design/icons';
import { usePermission } from '@/hooks/permission.hook';
import { Link } from 'react-router-dom';

export default function SaleKitPage() {
  const { getAllSaleKit, downLoadDocument } = userSaleKit();
  const { isAdmin } = usePermission();

  const { data } = useRootSelector((state) => state.sale.saleKit);
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
    getAllSaleKit({});
  }, []);

  return (
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.saleKit' })}</h3>
      <div css={searchContainer}>
        <Search onSearch={() => {}} />
      </div>
      {isAdmin && (
        <Row css={rowHeaderStyle} justify="space-between" align="bottom">
          <Col>
            <Button disabled={checkedList.length === 0} onClick={() => {}} size="large" danger>
              Xoá mục tiêu đã chọn
            </Button>
          </Col>
          <Col>
            <Row gutter={[10, 10]} justify="space-between" align="bottom">
              <Col>
                <Button size="large">
                  <Link to="/sales/sale-kit/auth">Quản lý quyền truy cập</Link>
                </Button>
              </Col>
              <Col>
                <Button
                  icon={<PlusCircleOutlined />}
                  onClick={() => {}}
                  size="large"
                  type="primary"
                >
                  Thêm tài liệu
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.saleKit' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {data?.length} {formatMessage({ id: 'title.document.saleKit' })}
        </span>
      </div>
      <ListSaleKit
        isAdmin={isAdmin}
        setCheckedList={setCheckedList}
        checkedList={checkedList}
        data={data}
        downLoadDocument={downLoadDocument}
      />
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
const searchContainer = css`
  margin: 2.6rem 0;
`;
const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
