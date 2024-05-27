import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import {
  addContractAction,
  deleteContractAction,
  setAllContractAction,
  setListContractAction,
  updateContractAction,
} from '../reducers/slicers/contract.slice';
import { useDispatch } from 'react-redux';
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

export const useContract = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllContract = useCallback(
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
        () => api.post(`/Contract/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-contract',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListContractAction({
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

  const addKContract = useCallback(
    async (values: DataContractType) => {
      const dataAddContract = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () => api.post(`/Contract/add-or-update?tenant=${tenant}`, [{ data: dataAddContract }]),
        { loadingKey: 'add-contract' },
      );

      if (succeeded) {
        dispatch(addContractAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteContract = useCallback(
    async (contractIds: string[]) => {
      const ids = contractIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/Contract/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-contract' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteContractAction(contractIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const updateContract = useCallback(
    async (values: DataContractType) => {
      const dataUpdateContract = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Contract/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateContract },
          ]),
        { loadingKey: 'edit-contract' },
      );
      console.log('data: ', data);

      if (succeeded) {
        dispatch(updateContractAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const getAllCustomerContract = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      UserId: user?.id,
      RoleId: user?.applicationRoles[0].id,
      tenant: tenant,
    };

    const urlParams = generateUrlParams(queryParams);

    const { data, succeeded } = await caller(() => api.get(`/Customer/get-all?${urlParams}`), {
      loadingKey: 'get-customer',
    });

    if (succeeded) {
      dispatch(setAllContractAction({ dataCustomer: data }));
    }
  }, [caller, api, dispatch, user, tenant]);

  return { getAllContract, addKContract, deleteContract, updateContract, getAllCustomerContract };
};
