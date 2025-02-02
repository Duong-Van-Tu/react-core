import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListIncomeAction,
  setListIncomeActionWithRoleAdmin,
  setListIncomeActionWithRoleUser,
  setListIncomeDetail,
  setListIncomeUserAction,
} from '../reducers/slicers/income.slice';
// import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';

export type FilterIncomeType = {
  pageIndex: number;
  pageSize: number;
  month?: string;
  year?: string;
  textSearch?: string;
  orderCol?: string;
  orderDir?: string;
  code?: string;
  userId?: string;
  statusId?: string;
  roleId?: string;
  time?: string;
  roleType?: string;
};

export const useIncome = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  // const user = useRootSelector((state) => state.auth.user);

  const getListIncome = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      time = dayjs().year().toString(),
    }: FilterIncomeType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant,
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        Time: `1-1-${time}`,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/EmployeeSalary/get-list-all-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-income',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListIncomeAction({
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

  const getListIncomeUser = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      tenant,
    };

    const urlParams = generateUrlParams(queryParams);

    const { data, succeeded } = await caller(
      () => api.get(`/EmployeeSalary/get-list-all-by-user-with-pagination?${urlParams}`),
      {
        loadingKey: 'get-list-income-user',
      },
    );
    if (succeeded) {
      dispatch(
        setListIncomeUserAction({
          data,
        }),
      );
    }
  }, [caller, api]);

  const getListIncomeWithRoleUser = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      time = dayjs().year().toString(),
    }: FilterIncomeType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant,
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        Time: `1-1-${time}`,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/EmployeeSalary/get-list-role-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-income-with-role-user',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListIncomeActionWithRoleUser({
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

  const getListIncomeWithRoleAdmin = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      time = dayjs().year().toString(),
    }: FilterIncomeType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant,
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        Time: `1-1-${time}`,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/EmployeeSalary/get-list-admin-role-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-income-with-role-admin',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListIncomeActionWithRoleAdmin({
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

  const getListIncomeDetail = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      month,
      year,
      userId,
    }: FilterIncomeType) => {
      const queryParams: { [key: string]: string | undefined } = {
        tenant,
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        month,
        year,
        userId,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/EmployeeSalaryDetail/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-income-detail',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;

        dispatch(
          setListIncomeDetail({
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

  return {
    getListIncomeDetail,
    getListIncome,
    getListIncomeWithRoleUser,
    getListIncomeWithRoleAdmin,
    getListIncomeUser,
  };
};
