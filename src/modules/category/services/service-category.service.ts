import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setListServiceAction,
  deleteServiceAction,
  addServiceAction,
  updateServiceAction,
} from '../reducers/slicers/service.slice';
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

export const useService = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllService = useCallback(
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
        () => api.post(`/Service/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-service',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListServiceAction({
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

  const addKService = useCallback(
    async (values: DataServiceCategoryType) => {
      const dataAddService = convertToUppercaseFirstLetter({ ...values });

      console.log('Payload for API: ', [{ data: dataAddService }]);

      const { data, succeeded } = await caller(
        () => api.post(`/Service/add-or-update?tenant=${tenant}`, [{ data: dataAddService }]),
        { loadingKey: 'add-service' },
      );

      if (succeeded) {
        dispatch(addServiceAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteService = useCallback(
    async (serviceIds: string[]) => {
      const ids = serviceIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/Service/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-service' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteServiceAction(serviceIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const updateService = useCallback(
    async (values: DataServiceCategoryType) => {
      const dataUpdateService = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/Service/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateService },
          ]),
        { loadingKey: 'edit-service' },
      );

      if (succeeded) {
        dispatch(updateServiceAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllService, deleteService, addKService, updateService };
};
