/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, TabsProps } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { useOrganize } from '../../services/organize.service';
import { useRootSelector } from '@/hooks/selector.hook';

export default function InformationOrganizePage() {
  const { getListTabOrganize } = useOrganize();

  const { formatMessage } = useLocale();

  const dispatch = useDispatch();

  const { dataTabs } = useRootSelector((state) => state.user.organize);

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Nhân sự',
          en_US: 'Personnel',
        },
      },
      {
        title: {
          vi_VN: 'Thông tin tổ chức',
          en_US: 'Organizational information',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  useEffect(() => {
    getListTabOrganize();
  }, []);

  const items: TabsProps['items'] = useMemo(() => {
    return dataTabs.map((tab, i) => ({
      key: tab.tenantId,
      label: tab.tenantName,
      children: <div>{i}</div>,
    }));
  }, [dataTabs]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: ' center',
          justifyContent: 'space-between',
        }}
      >
        <h3 css={titleStyle}>{formatMessage({ id: 'title.document.inforOrganizational' })}</h3>
      </div>
      <Tabs items={items} />
    </div>
  );
}

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 500;
  margin-bottom: 2.4rem;
  color: #101828;
`;
