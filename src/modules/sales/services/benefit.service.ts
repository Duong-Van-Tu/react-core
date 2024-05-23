import { Pagination } from '@/constants/pagination';
import { useApi, useCaller } from '@/hooks/api.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { generateUrlParams, getTenant } from '@/utils/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  addBenefitAction,
  deleteBenefitAction,
  setDataBenefitDetailAction,
  setDataStatusAction,
  setDataUserBenefitAction,
  setListBenefitAction,
  updateBenefitAction,
} from '../reducers/slicers/benefit.slice';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { RoleType } from '@/enum/role.enum';
import { StatusBenefit } from '../enum/status.enum';

type FilterPrivilegesType = {
  pageIndex: number;
  pageSize: number;
  textSearch?: string;
  statusId?: string;
  time?: string;
  roleType?: string;
};

export const useBenefit = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const tenant = getTenant();
  const user = useRootSelector((state) => state.auth.user);

  const getAllBenefit = useCallback(
    async ({
      pageIndex = Pagination.PAGEINDEX,
      pageSize = Pagination.PAGESIZE,
      textSearch,
      statusId,
      time = dayjs().year().toString(),
      roleType = RoleType.MySelf,
    }: FilterPrivilegesType) => {
      const queryParams: { [key: string]: string | undefined } = {
        PageIndex: pageIndex.toString(),
        PageSize: pageSize.toString(),
        UserId: user?.id,
        RoleId: user?.applicationRoles[0].id,
        StatusId: statusId,
        Time: `1-1-${time}`, // value is first day Of year
        TextSearch: textSearch,
        RoleType: roleType,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(
        () => api.post(`/Benefit/get-list-with-pagination?${urlParams}`),
        {
          loadingKey: 'get-benefit',
        },
      );
      if (succeeded) {
        const { items, totalRecords, pageIndex, totalPages, totalExtend } = data;
        dispatch(
          setListBenefitAction({
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

  const getBenefitById = useCallback(
    async (id: string) => {
      const { data, succeeded } = await caller(() => api.get(`/Benefit/get-by-id/${id}`), {
        loadingKey: 'get-benefitDetail',
        messageKey: 'benefitDetail-message',
      });
      if (succeeded) {
        dispatch(setDataBenefitDetailAction(data));
      }
    },
    [caller, api],
  );

  const addBenefit = useCallback(
    async (values: DataBenefitType) => {
      const dataAddBenefit = convertToUppercaseFirstLetter({
        ...values,
      });

      const { data, succeeded } = await caller(
        () => api.post(`/Benefit/add-or-update?tenant=${tenant}`, [{ data: dataAddBenefit }]),
        { loadingKey: 'add-benefit', messageKey: 'addBenefit-message' },
      );

      if (succeeded) {
        dispatch(addBenefitAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateBenefit = useCallback(
    async (values: DataBenefitType) => {
      const { id, ...rest } = values;
      const dataAddBenefit = convertToUppercaseFirstLetter(rest);

      const { data, succeeded } = await caller(
        () => api.post(`/Benefit/add-or-update?tenant=${tenant}`, [{ id, data: dataAddBenefit }]),
        { loadingKey: 'edit-benefit', messageKey: 'editBenefit-message' },
      );

      if (succeeded) {
        dispatch(updateBenefitAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateTotalBenefit = useCallback(
    async (values: DataBenefitType) => {
      const { id, ...rest } = values;
      const dataAddBenefit = convertToUppercaseFirstLetter(rest);

      const { data, succeeded } = await caller(
        () =>
          api.put(`/Benefit/update-total-benefit?tenant=${tenant}`, [{ id, data: dataAddBenefit }]),
        { loadingKey: 'edit-totalBenefit', messageKey: 'editBenefit-message' },
      );

      if (succeeded) {
        dispatch(updateBenefitAction(data[0]));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const deleteBenefit = useCallback(
    async (benefitIds: string[]) => {
      const deleteIds = benefitIds.join(',');
      const { succeeded } = await caller(
        () => api.del(`/Benefit/delete-by-ids/${deleteIds}/${user?.id}?tenant=${tenant}`),
        { loadingKey: 'delete-benefit' },
      );

      if (succeeded) {
        dispatch(deleteBenefitAction(benefitIds));

        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  // status
  const updateStatusBenefit = useCallback(
    async (values: DataBenefitType) => {
      const dataUpdateStatusBenefit = convertToUppercaseFirstLetter(values);

      const { data, succeeded } = await caller(
        () => api.post(`/BenefitStatus/add-or-update?tenant=${tenant}`, dataUpdateStatusBenefit),
        { loadingKey: 'edit-statusBenefit' },
      );

      if (succeeded) {
        dispatch(updateBenefitAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const updateStatusById = useCallback(
    async (values: DataBenefitType) => {
      const dataUpdateStatusBenefit = convertToUppercaseFirstLetter(values);

      const { data, succeeded } = await caller(
        () => api.put(`/Benefit/update-status-by-id?tenant=${tenant}`, dataUpdateStatusBenefit),
        { loadingKey: 'edit-statusById' },
      );

      if (succeeded) {
        dispatch(updateBenefitAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const refuseEditBenefit = useCallback(
    async (values: DataBenefitType) => {
      const dataUpdateStatusBenefit = convertToUppercaseFirstLetter({
        id: values.id,
        applicationUserId: values.applicationUser?.id,
        status: StatusBenefit.Confirm,
      });

      const { data, succeeded } = await caller(
        () => api.put(`/Benefit/update-status-by-id?tenant=${tenant}`, dataUpdateStatusBenefit),
        { loadingKey: 'refuseEdit-benefit' },
      );

      if (succeeded) {
        dispatch(updateBenefitAction(data));
        return succeeded;
      }
      return false;
    },

    [api, caller],
  );

  const getAllStatusBenefit = useCallback(async () => {
    const { data, succeeded } = await caller(
      () => api.get(`/BenefitStatus/get-all?tenant=${tenant}`),
      {
        loadingKey: 'status-benefit',
      },
    );

    if (succeeded) {
      dispatch(setDataStatusAction(data));
    }
  }, [api, caller]);

  const getUsersBenefit = useCallback(async () => {
    const { data, succeeded } = await caller(() => api.get(`/Benefit/get-user?tenant=${tenant}`), {
      loadingKey: 'getUsers-benefit',
    });

    if (succeeded) {
      dispatch(setDataUserBenefitAction(data));
    }
  }, [api, caller]);

  return {
    getAllBenefit,
    addBenefit,
    updateBenefit,
    deleteBenefit,
    updateStatusBenefit,
    getAllStatusBenefit,
    getBenefitById,
    getUsersBenefit,
    refuseEditBenefit,
    updateTotalBenefit,
    updateStatusById,
  };
};
