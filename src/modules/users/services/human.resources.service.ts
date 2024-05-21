import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListHumanResourcesAction,
  setUserProfileAction,
} from '../reducers/slicers/human.resources.slice';
// import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
// import dayjs from 'dayjs';

type FilterHumanResourcesType = {
  applicationUserId?: string;
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  orderCol?: string;
  orderDir?: string;
  code?: string;
  userId?: string;
  statusId?: string;
  roleId?: string;
  time?: string;
  roleType?: string;
  tenant?: string;
};

export const useHumanResources = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  // const user = useRootSelector((state) => state.auth.user);

  const getUserProfile = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      tenant,
    };

    const urlParams = generateUrlParams(queryParams);

    const { data, succeeded } = await caller(
      () => api.post(`/ApplicationUsers/get-profile?${urlParams}`),
      {
        loadingKey: 'get-user-profile',
      },
    );
    if (succeeded) {
      dispatch(
        setUserProfileAction({
          data,
        }),
      );
    }
  }, [caller, api]);

  const getListUsers = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
    }: FilterHumanResourcesType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/Employee/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-employee',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListHumanResourcesAction({
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

  return {
    getListUsers,
    getUserProfile,
  };
};
