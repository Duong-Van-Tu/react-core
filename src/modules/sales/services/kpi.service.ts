import { useApi, useCaller } from '@/hooks/api.hook';
import { useQuery } from '@/hooks/query.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addKPIAction, setListKPIAction } from '../reducers/slicers/kpi.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';

export const useKPI = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const { tenant } = useQuery();
  const user = useRootSelector((state) => state.auth.user);

  const getAllKPI = useCallback(
    async (pageIndex: number = Pagination.PAGEINDEX, pageSize: number = Pagination.PAGESIZE) => {
      const { data, succeeded } = await caller(
        () =>
          api.post(
            `/Goal/get-list-with-pagination?PageIndex=${pageIndex}&PageSize=${pageSize}&UserId=${user?.id}&RoleId=${user?.applicationRoles[0].id}&tenant=${tenant}`,
          ),
        {
          loadingKey: 'get-kpi',
        },
      );
      if (succeeded) {
        const { items, totalRecords } = data;
        dispatch(setListKPIAction({ data: items, totalRecords }));
      }
    },
    [caller, api],
  );

  const addKPI = useCallback(
    async (values: DataKPIType) => {
      const dataAddKPI = convertToUppercaseFirstLetter({ ...values, userSuggestId: user?.id });

      const { data, succeeded } = await caller(() =>
        api.post(`/Goal/add-or-update?tenant=${tenant}`, [{ data: dataAddKPI }]),
      );

      if (succeeded) {
        dispatch(addKPIAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllKPI, addKPI };
};
