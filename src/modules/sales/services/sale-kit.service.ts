import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListSaleKitAction,
  setListSaleKitActionRole,
  setListSaleKitRoleAction,
} from '../reducers/slicers/sale-kit.slice';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';
import { Pagination } from '@/constants/pagination';
import { Messages } from '@/constants/message';

export type FilterSaleKitType = {
  id?: string;
  ids?: string;
  pageIndex?: number;
  pageSize?: number;
  textSearch?: string;
  roleType?: string;
  roleId?: string;
  tenant?: string;
  dataUpdate?: DataSaleKitUpdateType;
  time?: string;
  applicationUserId?: string;
  files?: FormData;
};
export const userSaleKit = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();

  const tenant = getTenant();

  const getAllSaleKit = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      tenant,
      roleType,
      roleId,
      time = dayjs().year().toString(),
    }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        RoleType: roleType,
        RoleId: roleId,
        Time: `1-1-${time}`,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/SaleKit/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-sale-kit',
        },
      );

      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListSaleKitAction({
            data: items,
            pagination: {
              pageIndex,
              totalRecords,
              totalPages,
              pageSize,
            },
            totalExtend,
          }),
        );
      }
    },
    [caller, api],
  );

  const getAllSaleKitRole = useCallback(
    async ({
      textSearch,
      tenant,
      roleType,
      roleId,
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
    }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        RoleType: roleType,
        RoleId: roleId,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const response = await caller(
        () => api.get(`/ApplicationRoleSaleKit/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-sale-kit-role',
        },
      );

      if (response) {
        const { data, succeeded } = response;

        if (succeeded) {
          const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
          dispatch(
            setListSaleKitActionRole({
              data: items,
              pagination: {
                pageIndex,
                totalRecords,
                totalPages,
                pageSize,
              },
              totalExtend,
            }),
          );
        }
      }
    },
    [caller, api],
  );

  const addSaleKit = useCallback(
    async ({ tenant, files }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const response = await caller(() => api.post(`/SaleKit/add-document?${urlParams}`, files), {
        loadingKey: 'add-sale-kit',
        successMessage: Messages.CREATE_SUCCESS,
      });

      if (response) {
        getAllSaleKit({
          pageIndex: Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
        });
      }
    },

    [api, caller],
  );

  const deleteSaleKit = useCallback(
    async ({ tenant, ids, applicationUserId }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const response = await caller(
        () => api.del(`/SaleKit/delete-by-ids/${ids}/${applicationUserId}?${urlParams}`),
        { loadingKey: 'delete-sale-kit', successMessage: Messages.DELETE_SUCCESS },
      );

      if (response) {
        getAllSaleKit({
          pageIndex: Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
        });
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
        successMessage: Messages.UPDATE_SUCCESS,
      });
    },

    [api, caller],
  );

  const getAllRoleInSaleKit = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
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
  }, [caller, api]);

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
    addSaleKit,
  };
};
