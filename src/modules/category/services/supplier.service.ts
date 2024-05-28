import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setListSupplierAction,
  deleteSupplierAction,
  addSupplierAction,
  updateSupplierAction,
} from '../reducers/slicers/supplier.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';
import { Messages } from '@/constants/message';
type FilterSupplierType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
};

export const useSupplier = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllSupplier = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
    }: FilterSupplierType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        UserId: user?.id,
        RoleId: user?.applicationRoles[0].id,
        StatusId: statusId,
        Time: `1-1-${time}`, // value is first day Of year
        TextSearch: textSearch,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/Supplier/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-supplier',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListSupplierAction({
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

  const addKSupplier = useCallback(
    async (values: DataSupplierType) => {
      const dataAddSupplier = convertToUppercaseFirstLetter({ ...values });

      console.log('Payload for API: ', [{ data: dataAddSupplier }]);

      const { data, succeeded } = await caller(
        () => api.post(`/Supplier/add-or-update?tenant=${tenant}`, [{ data: dataAddSupplier }]),
        { loadingKey: 'add-supplier', successMessage: Messages.CREATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(addSupplierAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteSupplier = useCallback(
    async (supplierIds: string[]) => {
      const ids = supplierIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/Supplier/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-supplier', successMessage: Messages.DELETE_SUCCESS },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteSupplierAction(supplierIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const updateSupplier = useCallback(
    async (values: DataSupplierType) => {
      const dataUpdateSupplier = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Supplier/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateSupplier },
          ]),
        { loadingKey: 'edit-supplier', successMessage: Messages.UPDATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(updateSupplierAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllSupplier, deleteSupplier, addKSupplier, updateSupplier };
};
