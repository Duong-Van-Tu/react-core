import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addRelationshipAction,
  deleteRelationshipAction,
  setDataCustomerAction,
  setDataLevelAction,
  setDataGainsRelationshipDetailAction,
  setDataStatusAction,
  setListRelationshipAction,
  updateRelationshipAction,
  setDataRelationshipGainsQuestionAction,
} from '../reducers/slicers/relationship.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';
import { Messages } from '@/constants/message';

type FilterRelationshipType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
};
export const useRelationship = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllRelationship = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
      roleType,
    }: FilterRelationshipType) => {
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
        () => api.post(`/Relationship/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-relationship',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListRelationshipAction({
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

  const getGainsRelationshipById = useCallback(
    async (id: string) => {
      const { data, succeeded } = await caller(
        () => api.get(`/Gains/get-by-relationship-id/${id}`),
        {
          loadingKey: 'gainsDetail-loading',
          messageKey: 'gainsDetail-message',
        },
      );
      if (succeeded) {
        dispatch(setDataGainsRelationshipDetailAction(data));
      }
    },
    [caller, api],
  );

  const updateGainsRelationship = useCallback(
    async (values: GainsRelationshipType) => {
      const { id, ...rest } = values;
      const dataUpdateGainsRelationship = convertToUppercaseFirstLetter({
        ...rest,
      });

      const { succeeded } = await caller(
        () => api.post('/Gains/add-or-update', [{ id, data: dataUpdateGainsRelationship }]),
        {
          loadingKey: 'updateGainsDetail-loading',
          messageKey: 'updateGainsDetail-message',
        },
      );

      return !!succeeded;
    },
    [caller, api],
  );

  const addRelationship = useCallback(
    async (values: DataAddRelationship) => {
      const dataAddRelationship = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Relationship/add-or-update?tenant=${tenant}`, [{ data: dataAddRelationship }]),
        { loadingKey: 'add-relationship' },
      );

      if (succeeded) {
        dispatch(addRelationshipAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateRelationship = useCallback(
    async (values: DataRelationshipType) => {
      const { id, ...rest } = values;
      const dataAddRelationship = convertToUppercaseFirstLetter({
        ...rest,
        userSuggestId: user?.id,
      });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Relationship/add-or-update?tenant=${tenant}`, [
            { id, data: dataAddRelationship },
          ]),
        { loadingKey: 'edit-relationship' },
      );

      if (succeeded) {
        dispatch(updateRelationshipAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteRelationship = useCallback(
    async (RelationshipIds: string[]) => {
      const deleteIds = RelationshipIds.join(',');
      const { succeeded } = await caller(
        () => api.del(`/Relationship/delete-by-ids/${deleteIds}/${user?.id}?tenant=${tenant}`),
        { loadingKey: 'delete-relationship', successMessage: Messages.DELETE_SUCCESS },
      );

      if (succeeded) {
        dispatch(deleteRelationshipAction(RelationshipIds));

        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  // status
  const updateStatusRelationship = useCallback(
    async (values: DataFinalizeRelationship) => {
      const dataUpdateStatusRelationship = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.put(
            `/Relationship/update-status-by-id?tenant=${tenant}`,
            dataUpdateStatusRelationship,
          ),
        { loadingKey: 'edit-relationshipStatus' },
      );

      if (succeeded) {
        dispatch(updateRelationshipAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const getAllStatusRelationship = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/RelationshipStatus/get-all?tenant=${tenant}`),
      {
        loadingKey: 'status-relationship',
      },
    );

    if (succeeded) {
      dispatch(setDataStatusAction(data));
    }
  }, [api, caller]);

  const getListCustomer = useCallback(async () => {
    const { data, succeeded } = await caller(() => api.get(`/Customer/get-all?tenant=${tenant}`), {
      loadingKey: 'relationship-customer',
    });

    if (succeeded) {
      dispatch(setDataCustomerAction(data));
    }
  }, [api, caller]);

  const getAllLevel = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/RelationshipLevel/get-all?tenant=${tenant}`),
      {
        loadingKey: 'relationship-level',
      },
    );

    if (succeeded) {
      dispatch(setDataLevelAction(data));
    }
  }, [api, caller]);

  const getRelationshipGainsQuestion = useCallback(
    async (id: string) => {
      const { data, succeeded } = await caller(
        () => api.get(`/RelationshipGainsQuestion/get-by-relationship-id/${id}?tenant=${tenant}`),
        {
          loadingKey: 'relationship-gainsQuestion',
        },
      );

      if (succeeded) {
        dispatch(setDataRelationshipGainsQuestionAction(data));
      }
    },
    [api, caller],
  );

  const updateRelationshipGainsQuestion = useCallback(
    async (values: RelationshipGainsQuestion[]) => {
      const { data, succeeded } = await caller(
        () => api.post(`/RelationshipGainsQuestion/add-or-update?tenant=${tenant}`, values),
        {
          loadingKey: 'relationship-updateGainsQuestion',
        },
      );

      if (succeeded) {
        dispatch(setDataRelationshipGainsQuestionAction(data));
        return succeeded;
      }
      return false;
    },
    [api, caller],
  );

  const UpdatePoint = useCallback(
    async (values: DataUpdatePointRelationship) => {
      const { id, ...rest } = values;
      const dataUpdatePoint = convertToUppercaseFirstLetter(rest);
      const { data, succeeded } = await caller(
        () =>
          api.put(`Relationship/update-result?tenant=${tenant}`, [{ id, data: dataUpdatePoint }]),
        {
          loadingKey: 'relationship-updatePoint',
        },
      );

      if (succeeded) {
        dispatch(setListRelationshipAction(data));
        return succeeded;
      }
      return false;
    },
    [api, caller],
  );
  return {
    getAllRelationship,
    addRelationship,
    deleteRelationship,
    updateRelationship,
    updateStatusRelationship,
    getAllStatusRelationship,
    getListCustomer,
    getAllLevel,
    getGainsRelationshipById,
    updateGainsRelationship,
    getRelationshipGainsQuestion,
    updateRelationshipGainsQuestion,
    UpdatePoint,
  };
};
