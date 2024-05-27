import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setListTabOrganizeAction } from '../reducers/slicers/organize.slice';
import { generateUrlParams, getTenant } from '@/utils/common';
import { useRootSelector } from '@/hooks/selector.hook';
// import { Pagination } from '@/constants/pagination';
// import dayjs from 'dayjs';

export type FilterIncomeType = {
  pageIndex: number;
  pageSize: number;
  tenant?: string;
  textSearch?: string;
};

export const useOrganize = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getListTabOrganize = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      tenant,
      userName: user?.userName,
    };

    const urlParams = generateUrlParams(queryParams);

    const data = await caller(() => api.get(`/User/get-list-tenant-by-user?${urlParams}`), {
      loadingKey: 'get-list-tab-organize',
    });

    if (data) {
      dispatch(
        setListTabOrganizeAction({
          data,
        }),
      );
    }
  }, [caller, api]);

  return {
    getListTabOrganize,
  };
};
