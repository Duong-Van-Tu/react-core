import { useApi, useCaller } from '@/hooks/api.hook';
import { useQuery } from '@/hooks/query.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addKPIAction,
  deleteKPIAction,
  setDataReportAction,
  setListKPIAction,
  updateKPIAction,
} from '../reducers/slicers/kpi.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { Status } from '../enum/status.enum';

export const useKPI = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const { tenant } = useQuery();
  const user = useRootSelector((state) => state.auth.user);

  const getAllKPI = useCallback(
    async (
      pageIndex: number = Pagination.PAGEINDEX,
      pageSize: number = Pagination.PAGESIZE,
      searchText?: string,
    ) => {
      const { data, succeeded } = await caller(
        () =>
          api.post(
            `/Goal/get-list-with-pagination?PageIndex=${pageIndex}&PageSize=${pageSize}&UserId=${user?.id}&RoleId=${user?.applicationRoles[0].id}&TextSearch=${searchText ?? ''}&tenant=${tenant}`,
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

      const { data, succeeded } = await caller(
        () => api.post(`/Goal/add-or-update?tenant=${tenant}`, [{ data: dataAddKPI }]),
        { loadingKey: 'add-kpi' },
      );

      if (succeeded) {
        dispatch(addKPIAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateKPI = useCallback(
    async (values: DataKPIType) => {
      const dataAddKPI = convertToUppercaseFirstLetter({ ...values, userSuggestId: user?.id });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Goal/add-or-update?tenant=${tenant}`, [{ id: values.id, data: dataAddKPI }]),
        { loadingKey: 'edit-kpi' },
      );

      if (succeeded) {
        dispatch(updateKPIAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteKPI = useCallback(
    async (goalId: string) => {
      const { succeeded } = await caller(() =>
        api.post(`/Goal/delete-by-ids/${goalId}/${user?.id}?tenant=${tenant}`),
      );

      if (succeeded) {
        dispatch(deleteKPIAction(goalId));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  // status
  const updateStatusKPI = useCallback(
    async (values: DataKPIType) => {
      const dataUpdateStatusKPI = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () => api.put(`/Goal/update-status-by-id?tenant=${tenant}`, dataUpdateStatusKPI),
        { loadingKey: 'edit-status' },
      );

      if (succeeded) {
        dispatch(updateKPIAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const refuseEditKPI = useCallback(
    async (values: DataKPIType) => {
      const dataUpdateStatusKPI = convertToUppercaseFirstLetter({
        id: values.id,
        applicationUserId: values.userSuggest?.id,
        status: Status.AcceptRequest,
      });

      const { data, succeeded } = await caller(
        () => api.put(`/Goal/update-status-by-id?tenant=${tenant}`, dataUpdateStatusKPI),
        { loadingKey: 'refuse-edit' },
      );

      if (succeeded) {
        dispatch(updateKPIAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const showReport = useCallback(
    async (values: DataKPIType) => {
      const { data, succeeded } = await caller(
        () => api.get(`/Goal/get-by-id/${values.id}?tenant=${tenant}`),
        {
          loadingKey: 'refuse-edit',
        },
      );

      if (succeeded) {
        dispatch(setDataReportAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllKPI, addKPI, deleteKPI, updateKPI, updateStatusKPI, refuseEditKPI, showReport };
};
