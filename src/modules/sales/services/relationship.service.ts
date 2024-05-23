import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addRelationshipAction,
  deleteRelationshipAction,
  setDataReportAction,
  setDataStatusAction,
  setListRelationshipAction,
  updateRelationshipAction,
} from '../reducers/slicers/relationship.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { Status } from '../enum/status.enum';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';

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
            },
            totalExtend,
          }),
        );
      }
    },
    [caller, api],
  );

  const addRelationship = useCallback(
    async (values: DataRelationshipType) => {
      const dataAddRelationship = convertToUppercaseFirstLetter({
        ...values,
        userSuggestId: user?.id,
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
        { loadingKey: 'delete-relationship' },
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
    async (values: DataRelationshipType) => {
      const dataUpdateStatusRelationship = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () =>
          api.put(
            `/Relationship/update-status-by-id?tenant=${tenant}`,
            dataUpdateStatusRelationship,
          ),
        { loadingKey: 'edit-status' },
      );

      if (succeeded) {
        dispatch(updateRelationshipAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const refuseEditRelationship = useCallback(
    async (values: DataRelationshipType) => {
      const dataUpdateStatusRelationship = convertToUppercaseFirstLetter({
        id: values.id,
        status: Status.Updated,
      });

      const { data, succeeded } = await caller(
        () =>
          api.put(
            `/Relationship/update-status-by-id?tenant=${tenant}`,
            dataUpdateStatusRelationship,
          ),
        { loadingKey: 'refuse-edit' },
      );

      if (succeeded) {
        dispatch(updateRelationshipAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const showReport = useCallback(
    async (values: DataRelationshipType) => {
      const { data, succeeded } = await caller(
        () => api.get(`/Relationship/get-by-id/${values.id}?tenant=${tenant}`),
        {
          loadingKey: 'report-relationship',
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

  return {
    getAllRelationship,
    addRelationship,
    deleteRelationship,
    updateRelationship,
    updateStatusRelationship,
    refuseEditRelationship,
    showReport,
    getAllStatusRelationship,
  };
};
