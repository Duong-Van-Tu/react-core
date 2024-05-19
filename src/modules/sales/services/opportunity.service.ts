import { Pagination } from '@/constants/pagination';
import { useApi, useCaller } from '@/hooks/api.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { generateUrlParams, getTenant } from '@/utils/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  addOpportunityAction,
  deleteOpportunityAction,
  setDataOpportunityDetail,
  setDataStatusAction,
  setListOpportunityAction,
  updateOpportunityAction,
} from '../reducers/slicers/opportunity.slice';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';

type FilterPrivilegesType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
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
      roleType,
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
        roleType,
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
        dispatch(setDataOpportunityDetail(data));
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
        { loadingKey: 'add-opportunity', messageKey: 'addOpportunity-message' },
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
        { loadingKey: 'edit-opportunity', messageKey: 'editOpportunity-message' },
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
        { loadingKey: 'delete-opportunity' },
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
      const dataUpdateStatusOpportunity = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.put(`/Opportunity/update-status-by-id?tenant=${tenant}`, dataUpdateStatusOpportunity),
        { loadingKey: 'edit-status' },
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

  return {
    getAllOpportunity,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateStatusOpportunity,
    getAllStatusOpportunity,
    getOpportunityById,
  };
};
