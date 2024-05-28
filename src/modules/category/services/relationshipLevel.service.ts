import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListRelationshipLevelAction,
  addRelationshipLevelAction,
  updateRelationshipLevelAction,
  deleteRelationshipLevelAction,
} from '../reducers/slicers/relationshipLevel.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';

type FilterKPIType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
};

export const useRelationshipLevel = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllRelationshipLevel = useCallback(
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
        () => api.post(`/RelationshipLevel/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-relationshipLevel',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListRelationshipLevelAction({
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

  const addKRelationshipLevel = useCallback(
    async (values: DataReationshipLevelType) => {
      const dataAddRelationshipLv = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/RelationshipLevel/add-or-update?tenant=${tenant}`, [
            { data: dataAddRelationshipLv },
          ]),
        { loadingKey: 'add-relationshipLevel' },
      );

      if (succeeded) {
        dispatch(addRelationshipLevelAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateRelationshipLevel = useCallback(
    async (values: DataReationshipLevelType) => {
      const dataUpdateRelationshipLv = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/RelationshipLevel/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateRelationshipLv },
          ]),
        { loadingKey: 'edit-relationshipLevel' },
      );

      if (succeeded) {
        dispatch(updateRelationshipLevelAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteRelationshipLevel = useCallback(
    async (relationshipLvIds: string[]) => {
      const ids = relationshipLvIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/RelationshipLevel/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-relationshipLevel' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteRelationshipLevelAction(relationshipLvIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  return {
    getAllRelationshipLevel,
    addKRelationshipLevel,
    updateRelationshipLevel,
    deleteRelationshipLevel,
  };
};
