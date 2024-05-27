import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setListRelationshipLvAction,
  addRelationshipLvAction,
  updateRelationshipLvAction,
  deleteRelationshipLvAction,
} from '../reducers/slicers/relationshipLv.slice';
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

export const useRelationshipLv = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllRelationshipLv = useCallback(
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
          loadingKey: 'get-relationshipLv',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListRelationshipLvAction({
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

  const addKRelationshipLv = useCallback(
    async (values: DataReationshipLevelType) => {
      const dataAddRelationshipLv = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/RelationshipLevel/add-or-update?tenant=${tenant}`, [
            { data: dataAddRelationshipLv },
          ]),
        { loadingKey: 'add-realtionshipLv' },
      );

      if (succeeded) {
        dispatch(addRelationshipLvAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateRelationshipLv = useCallback(
    async (values: DataReationshipLevelType) => {
      const dataUpdateRelationshipLv = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/RelationshipLevel/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateRelationshipLv },
          ]),
        { loadingKey: 'edit-realtionshipLv' },
      );

      if (succeeded) {
        dispatch(updateRelationshipLvAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteRelationshipLv = useCallback(
    async (relationshipLvIds: string[]) => {
      const ids = relationshipLvIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/RelationshipLevel/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-relationshipLv' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteRelationshipLvAction(relationshipLvIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllRelationshipLv, addKRelationshipLv, deleteRelationshipLv, updateRelationshipLv };
};
