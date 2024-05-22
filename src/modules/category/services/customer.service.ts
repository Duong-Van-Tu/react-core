import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListCustomerAction,
  addCustomerAction,
  deleteCustomerAction,
  updateCustomerAction,
} from '../reducers/slicers/customer.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';

type FilterKPIType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
};

export const useCustomer = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllCustomer = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
      roleType,
    }: FilterKPIType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        UserId: user?.id,
        RoleId: user?.applicationRoles[0].id,
        StatusId: statusId,
        Time: `1-1-${time}`, // value is first day Of year
        TextSearch: textSearch,
        tenant: tenant,
        roleType,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/Customer/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-customer',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListCustomerAction({
            data: items,
            pagination: {
              pageIndex,
              totalRecords,
              totalPages,
            },
            totalExtend,
          }),
        );
      }
    },
    [caller, api],
  );

  const addKCustomer = useCallback(
    async (values: DataCustomerType) => {
      const dataAddCustomer = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () => api.post(`/Customer/add-or-update?tenant=${tenant}`, [{ data: dataAddCustomer }]),
        { loadingKey: 'add-customer' },
      );

      if (succeeded) {
        dispatch(addCustomerAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteCustomer = useCallback(
    async (customerIds: string[]) => {
      const ids = customerIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/Customer/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-customer' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteCustomerAction(customerIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const updateCustomer = useCallback(
    async (values: DataCustomerType) => {
      const dataAddKPI = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Customer/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataAddKPI },
          ]),
        { loadingKey: 'edit-customer' },
      );

      if (succeeded) {
        dispatch(updateCustomerAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllCustomer, addKCustomer, deleteCustomer, updateCustomer };
};
