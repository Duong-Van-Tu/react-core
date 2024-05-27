import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addKPIAction,
  deleteKPIAction,
  setDataReportAction,
  setDataStatusAction,
  setListKPIAction,
  updateKPIAction,
} from '../reducers/slicers/kpi.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { Status } from '../enum/status.enum';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';
import { Messages } from '@/constants/message';

type FilterKPIType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
};
export const useKPI = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllKPI = useCallback(
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
        () => api.post(`/Goal/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-kpi',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListKPIAction({
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

  const addKPI = useCallback(
    async (values: DataKPIType) => {
      const dataAddKPI = convertToUppercaseFirstLetter({ ...values, userSuggestId: user?.id });

      const { data, succeeded } = await caller(
        () => api.post(`/Goal/add-or-update?tenant=${tenant}`, [{ data: dataAddKPI }]),
        { loadingKey: 'add-kpi', successMessage: Messages.CREATE_SUCCESS },
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
      const { id, ...rest } = values;
      const dataAddKPI = convertToUppercaseFirstLetter({ ...rest, userSuggestId: user?.id });

      const { data, succeeded } = await caller(
        () => api.post(`/Goal/add-or-update?tenant=${tenant}`, [{ id, data: dataAddKPI }]),
        { loadingKey: 'edit-kpi', successMessage: Messages.UPDATE_SUCCESS },
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
    async (goalIds: string[]) => {
      const deleteIds = goalIds.join(',');
      const { succeeded } = await caller(
        () => api.del(`/Goal/delete-by-ids/${deleteIds}/${user?.id}?tenant=${tenant}`),
        { loadingKey: 'delete-kpi', successMessage: Messages.DELETE_SUCCESS },
      );

      if (succeeded) {
        dispatch(deleteKPIAction(goalIds));

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
        { loadingKey: 'kpi-editStatus', successMessage: Messages.UPDATE_SUCCESS },
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
        status: Status.Updated,
      });

      const { data, succeeded } = await caller(
        () => api.put(`/Goal/update-status-by-id?tenant=${tenant}`, dataUpdateStatusKPI),
        { loadingKey: 'kpi-refuseEdit', successMessage: Messages.UPDATE_SUCCESS },
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
          loadingKey: 'report-kpi',
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

  const getAllStatusKPI = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/GoalStatus/get-all?tenant=${tenant}`),
      {
        loadingKey: 'status-kpi',
      },
    );

    if (succeeded) {
      dispatch(setDataStatusAction(data));
    }
  }, [api, caller]);

  return {
    getAllKPI,
    addKPI,
    deleteKPI,
    updateKPI,
    updateStatusKPI,
    refuseEditKPI,
    showReport,
    getAllStatusKPI,
  };
};
