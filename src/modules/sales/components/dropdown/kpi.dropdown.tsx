/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalKPI } from '../modals/kpi';
import { usePermission } from '@/hooks/permission.hook';
import { useQuery } from '@/hooks/query.hook';
import { RoleType } from '@/enum/role.enum';
import { useMemo } from 'react';
import { Status } from '../../enum/status.enum';
import { ModalKPIType } from '../../enum/modal.enum';

enum MenuItem {
  EditKPI = 1,
  ModifyKPI,
  RequestEdit,
  FinalizeKPI,
  ReviewEdit,
  Report,
  UpdateRequest,
  Delete,
}
type KPIDropdownProps = {
  data?: DataKPIType;
};

export function KPIDropdown({ data }: KPIDropdownProps) {
  const { openModal } = useModalKPI();
  const { formatMessage } = useLocale();
  const { isSale, isSupplier, isSaleDirector } = usePermission();

  const { tab } = useQuery();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditKPI:
        openModal(ModalKPIType.EditKPI, data);
        break;
      case MenuItem.FinalizeKPI:
        openModal(ModalKPIType.FinalizeKPI, data);
        break;
      case MenuItem.RequestEdit:
        openModal(ModalKPIType.RequestEdit, data);
        break;
      case MenuItem.Report:
        openModal(ModalKPIType.Report, data);
        break;
      case MenuItem.ModifyKPI:
        openModal(ModalKPIType.ModifyKPI, data);
        break;
      case MenuItem.Delete:
        openModal(ModalKPIType.DeleteKPI, data);
        break;
      default:
      case MenuItem.UpdateRequest:
        openModal(ModalKPIType.UpdateRequest, data);
        break;
    }
  };

  const directorItems: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = [];
    if (tab === RoleType.MySelf) {
      items.push(
        {
          key: MenuItem.EditKPI,
          label: formatMessage({ id: 'title.dropdown.kpi.editKPI' }),
          onClick: () => handleItemClick(MenuItem.EditKPI),
        },
        {
          key: MenuItem.Report,
          label: formatMessage({ id: 'title.dropdown.kpi.report' }),
          onClick: () => handleItemClick(MenuItem.Report),
        },
      );
      if (data?.goalStatus?.code === Status.Pending) {
        items.push({
          key: MenuItem.FinalizeKPI,
          label: formatMessage({ id: 'title.dropdown.finalize' }),
          onClick: () => handleItemClick(MenuItem.FinalizeKPI),
        });
      }
    } else {
      if (data?.goalStatus?.code === Status.Pending) {
        items.push(
          {
            key: MenuItem.FinalizeKPI,
            label: formatMessage({ id: 'title.dropdown.finalize' }),
            onClick: () => handleItemClick(MenuItem.FinalizeKPI),
          },
          {
            key: MenuItem.ModifyKPI,
            label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
            onClick: () => handleItemClick(MenuItem.ModifyKPI),
          },

          {
            key: MenuItem.Delete,
            label: formatMessage({ id: 'dropdown.delete' }),
            onClick: () => handleItemClick(MenuItem.Delete),
          },
        );
      }
      if (data?.goalStatus?.code === Status.Request) {
        items.push({
          key: MenuItem.RequestEdit,
          label: 'Xem đề xuất chỉnh sửa',
          onClick: () => handleItemClick(MenuItem.RequestEdit),
        });
      }
      items.push({
        key: MenuItem.Report,
        label: formatMessage({ id: 'title.dropdown.kpi.report' }),
        onClick: () => handleItemClick(MenuItem.Report),
      });
    }
    return items;
  }, [tab, data]);

  const saleItems: MenuProps['items'] = useMemo(() => {
    const items = [];
    if (data?.goalStatus?.code === Status.Pending) {
      items.push(
        {
          key: MenuItem.EditKPI,
          label: formatMessage({ id: 'title.dropdown.kpi.editKPI' }),
          onClick: () => handleItemClick(MenuItem.EditKPI),
        },

        {
          key: MenuItem.Delete,
          label: formatMessage({ id: 'dropdown.delete' }),
          onClick: () => handleItemClick(MenuItem.Delete),
        },
      );
    }
    if (data?.goalStatus?.code === Status.Updated) {
      items.push({
        key: MenuItem.FinalizeKPI,
        label: formatMessage({ id: 'title.dropdown.finalize' }),
        onClick: () => handleItemClick(MenuItem.FinalizeKPI),
      });
    }

    if (data?.goalStatus?.code === Status.Processing) {
      items.push({
        key: MenuItem.RequestEdit,
        label: isSaleDirector
          ? 'Xem đề xuất chỉnh sửa'
          : formatMessage({ id: 'title.dropdown.requestEdit' }),
        onClick: () => handleItemClick(MenuItem.RequestEdit),
      });
    }

    items.push({
      key: MenuItem.Report,
      label: formatMessage({ id: 'title.dropdown.kpi.report' }),
      onClick: () => handleItemClick(MenuItem.Report),
    });
    return items;
  }, [tab, data]);

  const adminItems: MenuProps['items'] = [
    {
      key: MenuItem.UpdateRequest,
      label: formatMessage({ id: 'title.dropdown.updateResult' }),
      onClick: () => handleItemClick(MenuItem.UpdateRequest),
    },
  ];

  return (
    <Dropdown
      menu={{
        items: isSaleDirector ? directorItems : isSale || isSupplier ? saleItems : adminItems,
      }}
      placement="bottomRight"
    >
      <span css={dropdownIcon}>
        <CustomIcon type="three-dot" width={16} height={18} />
      </span>
    </Dropdown>
  );
}

const dropdownIcon = css`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
