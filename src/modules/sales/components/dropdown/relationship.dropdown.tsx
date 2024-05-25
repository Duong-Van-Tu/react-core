/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalRelationship } from '../modals/relationship';
import { ModalRelationshipType } from '../../enum/modal.enum';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';
import { usePermission } from '@/hooks/permission.hook';
import { useMemo } from 'react';
import { useQuery } from '@/hooks/query.hook';
import { RoleType } from '@/enum/role.enum';
import { LocaleFormatter } from '@/components/locale-formatter';

enum MenuItem {
  Report = 1,
  Finalize,
  UpdatePoint,
  Delete,
}

type RelationshipDropdownProps = {
  data?: DataRelationshipType;
};

export function RelationshipDropdown({ data }: RelationshipDropdownProps) {
  const { openModal } = useModalRelationship();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const tenant = getTenant();
  const { isSaleDirector, isSale } = usePermission();
  const { tab } = useQuery();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.Report:
        openModal(ModalRelationshipType.ReportRelationship, data);
        break;
      case MenuItem.Finalize:
        openModal(ModalRelationshipType.FinalizeRelationship, data);
        break;
      case MenuItem.UpdatePoint:
        openModal(ModalRelationshipType.UpdatePoint, data);
        break;
      case MenuItem.Delete:
        openModal(ModalRelationshipType.DeleteRelationship, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Chốt đề xuất',
      onClick: () => handleItemClick(MenuItem.Finalize),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.update' })}</span>,
      onClick: () => navigate(`/sales/relationship/gains/${data?.id}?tenant=${tenant}`),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.evaluate' })}</span>,
      onClick: () =>
        navigate(`/sales/relationship/relationshipGainsQuestion/${data?.id}?tenant=${tenant}`),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.report' })}</span>,
      onClick: () => handleItemClick(MenuItem.Report),
    },
    {
      key: MenuItem.Delete,
      label: <LocaleFormatter id="dropdown.delete" />,
      onClick: () => handleItemClick(MenuItem.Delete),
    },
  ];

  const directorItems = useMemo(() => {
    if (tab === RoleType.MySelf) {
      return items.slice(1);
    }
    return items;
  }, [items, tab]);

  const saleItems = useMemo(() => items.slice(1), [items]);

  const adminItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Cập nhật điểm thực tế',
      onClick: () => handleItemClick(MenuItem.UpdatePoint),
    },
  ];

  return (
    <Dropdown
      menu={{ items: isSaleDirector ? directorItems : isSale ? saleItems : adminItems }}
      placement="bottomRight"
    >
      <Button css={actionIconBtn}>
        <CustomIcon type="three-dot" width={16} height={18} />
      </Button>
    </Dropdown>
  );
}

const actionIconBtn = css`
  background: none;
  border: none;
  box-shadow: unset;
  padding: 0;
`;
