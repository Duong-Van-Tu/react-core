import { Pagination } from '@/constants/pagination';
import { useApi, useCaller } from '@/hooks/api.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { generateUrlParams, getTenant } from '@/utils/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  addHistoryOpportunityAction,
  addOpportunityAction,
  deleteOpportunityAction,
  setDataOpportunityDetailAction,
  setDataSaleAndSupplierAction,
  setDataStatusAction,
  setListHistoryOpportunityAction,
  setListOpportunityAction,
  updateOpportunityAction,
} from '../reducers/slicers/opportunity.slice';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Messages } from '@/constants/message';

type FilterPrivilegesType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
};

export const useOpportunity = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllOpportunity = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
    }: FilterPrivilegesType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        UserId: user?.id,
        RoleId: user?.applicationRoles[0].id,
        StatusId: statusId,
        Time: `1-1-${time}`, // value is first day Of year
        TextSearch: textSearch,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/Opportunity/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-opportunity',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListOpportunityAction({
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

  const getOpportunityById = useCallback(
    async (id: string) => {
      const { data, succeeded } = await caller(() => api.get(`/Opportunity/get-by-id/${id}`), {
        loadingKey: 'get-opportunityDetail',
        messageKey: 'opportunityDetail-message',
      });
      if (succeeded) {
        dispatch(setDataOpportunityDetailAction(data));
      }
    },
    [caller, api],
  );

  const addOpportunity = useCallback(
    async (values: DataOpportunityType) => {
      const dataAddOpportunity = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Opportunity/add-or-update?tenant=${tenant}`, [{ data: dataAddOpportunity }]),
        { loadingKey: 'add-opportunity', successMessage: Messages.CREATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(addOpportunityAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateOpportunity = useCallback(
    async (values: DataOpportunityType) => {
      const dataAddOpportunity = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Opportunity/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataAddOpportunity },
          ]),
        { loadingKey: 'edit-opportunity', successMessage: Messages.UPDATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(updateOpportunityAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteOpportunity = useCallback(
    async (opportunityIds: string[]) => {
      const deleteIds = opportunityIds.join(',');
      const { succeeded } = await caller(
        () => api.del(`/Opportunity/delete-by-ids/${deleteIds}/${user?.id}?tenant=${tenant}`),
        { loadingKey: 'delete-opportunity', successMessage: Messages.DELETE_SUCCESS },
      );

      if (succeeded) {
        dispatch(deleteOpportunityAction(opportunityIds));

        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  // status
  const updateStatusOpportunity = useCallback(
    async (values: DataOpportunityType) => {
      const dataUpdateStatusOpportunity = convertToUppercaseFirstLetter(values);

      const { data, succeeded } = await caller(
        () =>
          api.put(`/OpportunityStatus/add-or-update?tenant=${tenant}`, dataUpdateStatusOpportunity),
        { loadingKey: 'edit-statusOpportunity', successMessage: Messages.UPDATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(updateOpportunityAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateStatusOpportunityById = useCallback(
    async (values: DataOpportunityType) => {
      const dataUpdateStatusOpportunity = convertToUppercaseFirstLetter(values);

      const { data, succeeded } = await caller(
        () =>
          api.put(`/Opportunity/update-status-by-id?tenant=${tenant}`, dataUpdateStatusOpportunity),
        { loadingKey: 'edit-statusOpportunityById', successMessage: Messages.UPDATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(updateOpportunityAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const getAllStatusOpportunity = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/OpportunityStatus/get-all?tenant=${tenant}`),
      {
        loadingKey: 'status-opportunity',
      },
    );

    if (succeeded) {
      dispatch(setDataStatusAction(data));
    }
  }, [api, caller]);

  const getAllSaleAndSupplier = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/ApplicationUsers/get-all?tenant=${tenant}`),
      {
        loadingKey: 'getAllSaleAndSupplier-opportunity',
      },
    );

    if (succeeded) {
      dispatch(setDataSaleAndSupplierAction(data));
    }
  }, [api, caller]);

  const assignSaleAndSupplier = useCallback(
    async (values: DataOpportunityType) => {
      const { data, succeeded } = await caller(
        () =>
          api.post(`/Opportunity/assign-user?tenant=${tenant}`, {
            id: values.id,
            applicationUserId: values.saleAndSupplierId,
          }),
        {
          loadingKey: 'assignUser-opportunity',
          successMessage: Messages.UPDATE_SUCCESS,
        },
      );

      if (succeeded) {
        dispatch(updateOpportunityAction(data));
        return succeeded;
      }
      return false;
    },
    [api, caller],
  );

  const getAllHistoryOpportunity = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
    }: FilterPrivilegesType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        UserId: user?.id,
        RoleId: user?.applicationRoles[0].id,
        StatusId: statusId,
        Time: `1-1-${time}`, // value is first day Of year
        TextSearch: textSearch,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/OpportunityHistory/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-historyOpportunity',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListHistoryOpportunityAction({
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

  const addHistoryOpportunity = useCallback(
    async (values: HistoryOpportunityType) => {
      const dataAddOpportunity = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/OpportunityHistory/add-or-update?tenant=${tenant}`, [
            { data: dataAddOpportunity },
          ]),
        { loadingKey: 'add-historyOpportunity', successMessage: Messages.CREATE_SUCCESS },
      );

      if (succeeded) {
        dispatch(addHistoryOpportunityAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return {
    getAllOpportunity,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateStatusOpportunity,
    getAllStatusOpportunity,
    getOpportunityById,
    getAllSaleAndSupplier,
    assignSaleAndSupplier,
    updateStatusOpportunityById,
    getAllHistoryOpportunity,
    addHistoryOpportunity,
  };
};
