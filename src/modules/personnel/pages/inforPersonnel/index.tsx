/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableCustom } from '@/components/table';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { ModalInforPersonnelProvider } from '../../components/inforPersonnel';
import { inforPersonnelColumns } from './column';
import { DataInforPersonnelType } from './type.inforPersonnel';

const data: DataInforPersonnelType[] = [
  {
    key: 1,
    fullName: 'Bùi Công Quân',
    location: 'Phòng CNTT',
    dateBirth: '21/11/1999',
    address: '396/1 Dương Quảng Hàm, p6, quận Gò Vấp',
    email: 'quaan.cb@gmail.com',
    phone: '0123123123',
  },
];
export default function InforPersonnelPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Nhân sự',
          en_US: 'Personsel',
        },
      },
      {
        title: {
          vi_VN: 'Thông tin nhân sự',
          en_US: 'Personnel information',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalInforPersonnelProvider>
      <div>
        <h3 css={titleStyle}>Thông tin nhân viên</h3>
        <TableCustom
          columns={inforPersonnelColumns}
          dataSource={data}
          loading={false}
          rowKey={(record) => record.id}
          pagination={{ current: 1, pageSize: 7 }}
          scroll={{ x: 1450 }}
        />
      </div>
    </ModalInforPersonnelProvider>
  );
}

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.3rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #101828;
`;
