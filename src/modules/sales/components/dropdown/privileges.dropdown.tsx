/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useModalPrivileges } from '../modals/privileges';
import { LocaleFormatter } from '@/components/locale-formatter';
import { usePermission } from '@/hooks/permission.hook';
import { useMemo } from 'react';
import { useQuery } from '@/hooks/query.hook';
import { RoleType } from '@/enum/role.enum';
import { StatusBenefit } from '../../enum/status.enum';
import { ModalPrivilegesType } from '../../enum/modal.enum';

enum MenuItem {
  EditPrivileges = 1,
  Report,
  SuggestedEdit,
  Delete,
  TotalPrivileges,
  FinalizePrivileges,
}

type PrivilegesDropdownProps = {
  data: DataBenefitType;
};

export function PrivilegesDropdown({ data }: PrivilegesDropdownProps) {
  const { openModal } = useModalPrivileges();
  const { isAdministrator, isSale, isSupplier } = usePermission();
  const { tab } = useQuery();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditPrivileges:
        openModal(ModalPrivilegesType.EditPrivileges, data);
        break;
      case MenuItem.SuggestedEdit:
        openModal(ModalPrivilegesType.SuggestedEdit, data);
        break;
      case MenuItem.Report:
        openModal(ModalPrivilegesType.Report, data);
        break;
      case MenuItem.Delete:
        openModal(ModalPrivilegesType.Delete, data);
        break;
      case MenuItem.TotalPrivileges:
        openModal(ModalPrivilegesType.TotalPrivileges, data);
        break;
      case MenuItem.FinalizePrivileges:
        openModal(ModalPrivilegesType.FinalizePrivileges, data);
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = useMemo(() => {
    if (tab === RoleType.Employee) {
      return [
        {
          key: MenuItem.EditPrivileges,
          label: <LocaleFormatter id="dropdown.edit" />,
          onClick: () => handleItemClick(MenuItem.EditPrivileges),
        },
        {
          key: MenuItem.SuggestedEdit,
          label: <LocaleFormatter id="dropdown.privileges.suggestedEdit" />,
          onClick: () => handleItemClick(MenuItem.SuggestedEdit),
        },

        {
          key: MenuItem.Report,
          label: <LocaleFormatter id="dropdown.report" />,
          onClick: () => handleItemClick(MenuItem.Report),
        },
        {
          key: MenuItem.Delete,
          label: <LocaleFormatter id="dropdown.delete" />,
          onClick: () => handleItemClick(MenuItem.Delete),
        },
      ];
    }

    return [];
  }, []);

  const adminItems: MenuProps['items'] = useMemo(() => {
    if (tab === RoleType.Manager) {
      return [
        {
          key: MenuItem.EditPrivileges,
          label: <LocaleFormatter id="dropdown.edit" />,
          onClick: () => handleItemClick(MenuItem.EditPrivileges),
        },
        {
          key: MenuItem.Delete,
          label: <LocaleFormatter id="dropdown.delete" />,
          onClick: () => handleItemClick(MenuItem.Delete),
        },
      ];
    }
    return [
      {
        key: MenuItem.TotalPrivileges,
        label: 'Cập nhập tổng quyền lợi hiện tại',
        onClick: () => handleItemClick(MenuItem.TotalPrivileges),
      },
    ];
  }, [tab]);

  const saleItems: MenuProps['items'] = useMemo(() => {
    if (data.benefitStatus?.code === StatusBenefit.Updated) {
      return [
        {
          key: MenuItem.FinalizePrivileges,
          label: 'Chốt',
          onClick: () => handleItemClick(MenuItem.FinalizePrivileges),
        },
        {
          key: MenuItem.Report,
          label: <LocaleFormatter id="dropdown.report" />,
          onClick: () => handleItemClick(MenuItem.Report),
        },
      ];
    }
    return [
      {
        key: MenuItem.SuggestedEdit,
        label: 'Gửi yêu cầu chỉnh sửa',
        onClick: () => handleItemClick(MenuItem.SuggestedEdit),
      },
      {
        key: MenuItem.Report,
        label: <LocaleFormatter id="dropdown.report" />,
        onClick: () => handleItemClick(MenuItem.Report),
      },
    ];
  }, [data.benefitStatus?.code]);

  return (
    <Dropdown
      menu={{ items: isAdministrator ? adminItems : isSale || isSupplier ? saleItems : items }}
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
