import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListSaleKitAction,
  setListSaleKitActionRole,
  setListSaleKitRoleAction,
} from '../reducers/slicers/sale-kit.slice';
import { generateUrlParams } from '@/utils/common';

export type FilterSaleKitType = {
  id?: string;
  ids?: string;
  textSearch?: string;
  roleType?: string;
  roleId?: string;
  tenant?: string;
  dataUpdate?: DataSaleKitUpdateType;
  time?: string;
  applicationUserId?: string;
};
export const userSaleKit = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();

  const getAllSaleKit = useCallback(
    async ({ textSearch, tenant, roleType, roleId, time }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        TextSearch: textSearch,
        RoleType: roleType,
        RoleId: roleId,
        Time: `1-1-${time}`,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(() => api.get(`/SaleKit/get-all?${urlParams}`), {
        loadingKey: 'get-sale-kit',
      });

      if (succeeded) {
        dispatch(
          setListSaleKitAction({
            data,
          }),
        );
      }
    },
    [caller, api],
  );

  const getAllSaleKitRole = useCallback(
    async ({ textSearch, tenant, roleType, roleId }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        TextSearch: textSearch,
        RoleType: roleType,
        RoleId: roleId,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const response = await caller(() => api.get(`/ApplicationRoleSaleKit/get-all?${urlParams}`), {
        loadingKey: 'get-sale-kit-role',
      });

      if (response) {
        const { data, succeeded } = response;

        if (succeeded) {
          dispatch(
            setListSaleKitActionRole({
              data,
            }),
          );
        }
      }
    },
    [caller, api],
  );

  const deleteSaleKit = useCallback(
    async ({ tenant, ids, applicationUserId }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const response = await caller(
        () => api.del(`/SaleKit/delete-by-ids/${ids}/${applicationUserId}?${urlParams}`),
        { loadingKey: 'delete-sale-kit' },
      );

      if (response) {
        getAllSaleKit({});
      }
    },

    [api, caller],
  );

  const updateSaleKitWithRole = useCallback(
    async ({ tenant, dataUpdate }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      await caller(() => api.put(`/ApplicationRoleSaleKit/update?${urlParams}`, dataUpdate), {
        loadingKey: 'update-sale-kit-with-role',
      });
    },

    [api, caller],
  );

  const getAllRoleInSaleKit = useCallback(
    async ({ textSearch, tenant, roleType }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        TextSearch: textSearch,
        RoleType: roleType,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.get(`/ApplicationRoles/get-all?${urlParams}`),
        {
          loadingKey: 'get-all-role',
        },
      );

      if (succeeded) {
        dispatch(
          setListSaleKitRoleAction({
            data,
          }),
        );
      }
    },
    [caller, api],
  );

  const downLoadDocument = useCallback(
    async ({ id, tenant }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        id,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const data = await caller(() => api.get(`/SaleKit/download-document?${urlParams}`), {
        loadingKey: 'download-sale-kit',
      });

      return data;
    },
    [caller, api],
  );

  return {
    getAllSaleKit,
    downLoadDocument,
    getAllRoleInSaleKit,
    getAllSaleKitRole,
    updateSaleKitWithRole,
    deleteSaleKit,
  };
};
