import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setListHumanResourcesAction } from '../reducers/slicers/human-resources.slice';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams } from '@/utils/common';
import dayjs from 'dayjs';

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

  const getListUsers = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      time = dayjs().year().toString(),
    }: FilterHumanResourcesType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        TextSearch: textSearch,
        Time: `1-1-${time}`,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.get(`/ApplicationUsers/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-list-user',
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
  };
};
