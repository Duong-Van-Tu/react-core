import { useApi, useCaller } from '@/hooks/api.hook';
import { useQuery } from '@/hooks/query.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setListKPI } from '../reducers/slicers/kpi.slice';

export const useKPI = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const { tenant } = useQuery();

  const getAllKPI = useCallback(async () => {
    const { data } = await caller(() => api.get(`/Goal/get-all?tenant=${tenant}`), {
      loadingKey: 'get-kpi',
    });
    dispatch(setListKPI(data));
  }, [caller, api]);

  const addKPI = useCallback(
    async (data: any) => {
      await caller(() => api.post(`/Goal/add-or-update?tenant=${tenant}`, data));
    },
    [api, caller],
  );

  return { getAllKPI, addKPI };
};
