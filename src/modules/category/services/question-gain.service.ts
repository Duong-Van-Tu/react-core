import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';
import {
  setListQuestionGainAction,
  addQuestionGainAction,
  updateQuestionGainAction,
  deleteQuestionGainAction,
} from '../reducers/slicers/question-gain.slice';

type FilterKPIType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType: string;
};

export const useQuestionGain = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllQuestionGain = useCallback(
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
        () => api.post(`/GainsQuestion/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-questionGain',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListQuestionGainAction({
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

  const addQuestionGain = useCallback(
    async (values: DataQuestionGainsType) => {
      const dataAddQuestionGain = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/GainsQuestion/add-or-update?tenant=${tenant}`, [
            { data: dataAddQuestionGain },
          ]),
        { loadingKey: 'add-questionGain' },
      );

      if (succeeded) {
        dispatch(addQuestionGainAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteQuestionGain = useCallback(
    async (questionIds: string[]) => {
      const ids = questionIds.join(',');
      const ApplicationUserId = `${user?.id}?tenant=${tenant}`;
      const { succeeded } = await caller(
        () => api.del(`/GainsQuestion/delete-by-ids/${ids}/${ApplicationUserId}`),
        { loadingKey: 'delete-questionGain' },
      );

      if (succeeded !== null && succeeded) {
        dispatch(deleteQuestionGainAction(questionIds));
        return true;
      }
      return false;
    },

    [api, caller],
  );

  const updateQuestionGain = useCallback(
    async (values: DataQuestionGainsType) => {
      const dataUpdateQuestionGain = convertToUppercaseFirstLetter({ ...values });

      const { data, succeeded } = await caller(
        () =>
          api.post(`/GainsQuestion/add-or-update?tenant=${tenant}`, [
            { id: values.id, data: dataUpdateQuestionGain },
          ]),
        { loadingKey: 'edit-questionGain' },
      );

      if (succeeded) {
        dispatch(updateQuestionGainAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  return { getAllQuestionGain, addQuestionGain, deleteQuestionGain, updateQuestionGain };
};
