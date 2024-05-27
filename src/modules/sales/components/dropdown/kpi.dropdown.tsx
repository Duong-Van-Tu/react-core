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
  const { isSale, isAdministrator, isSaleDirector, isSupplier } = usePermission();

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

  const items: MenuProps['items'] = useMemo(() => {
    if (isSaleDirector) {
      return tab === RoleType.MySelf
        ? [
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
            {
              key: MenuItem.Delete,
              label: formatMessage({ id: 'dropdown.delete' }),
              onClick: () => handleItemClick(MenuItem.Delete),
            },
          ]
        : data?.goalStatus?.code === Status.Pending
          ? [
              {
                key: MenuItem.FinalizeKPI,
                label: formatMessage({ id: 'title.dropdown.finalize' }),
                onClick: () => handleItemClick(MenuItem.FinalizeKPI),
              },
              {
                key: MenuItem.RequestEdit,
                label: isSaleDirector
                  ? 'Xem đề xuất chỉnh sửa'
                  : formatMessage({ id: 'title.dropdown.requestEdit' }),
                onClick: () => handleItemClick(MenuItem.RequestEdit),
              },
              {
                key: MenuItem.ModifyKPI,
                label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
                onClick: () => handleItemClick(MenuItem.ModifyKPI),
              },
              {
                key: MenuItem.Report,
                label: formatMessage({ id: 'title.dropdown.kpi.report' }),
                onClick: () => handleItemClick(MenuItem.Report),
              },
              {
                key: MenuItem.Delete,
                label: formatMessage({ id: 'dropdown.delete' }),
                onClick: () => handleItemClick(MenuItem.Delete),
              },
            ]
          : data?.goalStatus?.code === Status.Request
            ? [
                {
                  key: MenuItem.RequestEdit,
                  label: isSaleDirector
                    ? 'Xem đề xuất chỉnh sửa'
                    : formatMessage({ id: 'title.dropdown.requestEdit' }),
                  onClick: () => handleItemClick(MenuItem.RequestEdit),
                },
                {
                  key: MenuItem.ModifyKPI,
                  label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
                  onClick: () => handleItemClick(MenuItem.ModifyKPI),
                },
                {
                  key: MenuItem.Report,
                  label: formatMessage({ id: 'title.dropdown.kpi.report' }),
                  onClick: () => handleItemClick(MenuItem.Report),
                },
                {
                  key: MenuItem.Delete,
                  label: formatMessage({ id: 'dropdown.delete' }),
                  onClick: () => handleItemClick(MenuItem.Delete),
                },
              ]
            : [
                {
                  key: MenuItem.ModifyKPI,
                  label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
                  onClick: () => handleItemClick(MenuItem.ModifyKPI),
                },
                {
                  key: MenuItem.Report,
                  label: formatMessage({ id: 'title.dropdown.kpi.report' }),
                  onClick: () => handleItemClick(MenuItem.Report),
                },
                {
                  key: MenuItem.Delete,
                  label: formatMessage({ id: 'dropdown.delete' }),
                  onClick: () => handleItemClick(MenuItem.Delete),
                },
              ];
    }

    if (isSale || isSupplier) {
      return data?.goalStatus?.code === Status.Updated
        ? [
            {
              key: MenuItem.FinalizeKPI,
              label: formatMessage({ id: 'title.dropdown.finalize' }),
              onClick: () => handleItemClick(MenuItem.FinalizeKPI),
            },
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
            {
              key: MenuItem.Delete,
              label: formatMessage({ id: 'dropdown.delete' }),
              onClick: () => handleItemClick(MenuItem.Delete),
            },
          ]
        : [
            {
              key: MenuItem.RequestEdit,
              label: isSaleDirector
                ? 'Xem đề xuất chỉnh sửa'
                : formatMessage({ id: 'title.dropdown.requestEdit' }),
              onClick: () => handleItemClick(MenuItem.RequestEdit),
            },
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
            {
              key: MenuItem.Delete,
              label: formatMessage({ id: 'dropdown.delete' }),
              onClick: () => handleItemClick(MenuItem.Delete),
            },
          ];
    }
    if (isAdministrator) {
      return [
        {
          key: MenuItem.UpdateRequest,
          label: formatMessage({ id: 'title.dropdown.updateResult' }),
          onClick: () => handleItemClick(MenuItem.UpdateRequest),
        },
      ];
    }
    return [];
  }, [isSaleDirector, tab, data, formatMessage]);

  return (
    <Dropdown
      menu={{
        items,
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
