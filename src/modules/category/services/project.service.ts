import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addProjectAction,
  deleteProjectAction,
  setAllApplicationUserAction,
  setDataStatusProjectAction,
  setListProjectAction,
  updateProjectAction,
} from '../reducers/slicers/project.slice';

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

export const useProject = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllProject = useCallback(
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
        () => api.post(`/Project/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-project',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListProjectAction({
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

  const addKProject = useCallback(
    async (values: DataProjectType) => {
      const dataAddProject = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () => api.post(`/Project/add-or-update?tenant=${tenant}`, [{ data: dataAddProject }]),
        { loadingKey: 'add-project' },
      );

      if (succeeded) {
        dispatch(addProjectAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteProject = useCallback(
    async (projectIds: string[]) => {
      const ids = projectIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/Project/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-project' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteProjectAction(projectIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const EditProject = useCallback(
    async (values: DataProjectType) => {
      const dataEditProject = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.put(`/Project/update?tenant=${tenant}`, [{ id: values.id, data: dataEditProject }]),
        { loadingKey: 'edit-project' },
      );

      if (succeeded) {
        dispatch(updateProjectAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateProject = useCallback(
    async (values: DataProjectType) => {
      const dataUpdateProject = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.put(`/Project/update-result?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateProject },
          ]),
        { loadingKey: 'update-project' },
      );

      if (succeeded) {
        dispatch(updateProjectAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const getAllApplicationUserProject = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      UserId: user?.id,
      RoleId: user?.applicationRoles[0].id,
      tenant: tenant,
    };

    const urlParams = generateUrlParams(queryParams);

    const { data, succeeded } = await caller(
      () => api.get(`/ApplicationUsers/get-all?${urlParams}`),
      {
        loadingKey: 'get-applicationUsers',
      },
    );

    if (succeeded) {
      dispatch(setAllApplicationUserAction({ dataApplicationUser: data }));
    }
  }, [caller, api, dispatch, user, tenant]);

  const getAllStatusProject = useCallback(async () => {
    const queryParams: { [key: string]: string | undefined } = {
      UserId: user?.id,
      RoleId: user?.applicationRoles[0].id,
      tenant: tenant,
    };

    const urlParams = generateUrlParams(queryParams);

    const { data, succeeded } = await caller(() => api.get(`/ProjectStatus/get-all?${urlParams}`), {
      loadingKey: 'status-project',
    });

    if (succeeded) {
      dispatch(setDataStatusProjectAction({ dataStatus: data }));
    }
  }, [caller, api, dispatch, user, tenant]);

  return {
    getAllProject,
    addKProject,
    deleteProject,
    EditProject,
    getAllApplicationUserProject,
    updateProject,
    getAllStatusProject,
  };
};
