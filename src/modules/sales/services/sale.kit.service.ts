import { useApi, useCaller } from '@/hooks/api.hook';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setListSaleKitAction } from '../reducers/slicers/sale.kit.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { generateUrlParams, getTenant } from '@/utils/common';
import dayjs from 'dayjs';

export type FilterSaleKitType = {
  id?: string;
  textSearch?: string;
  roleType?: string;
  tenant?: string;
};
export const userSaleKit = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  //   const tenant = getTenant();
  //   const user = useRootSelector((state) => state.auth.user);

  const getAllSaleKit = useCallback(
    async ({ textSearch, tenant, roleType }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        TextSearch: textSearch,
        RoleType: roleType,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const { data, succeeded } = await caller(() => api.get(`/SaleKit/get-all?${urlParams}`), {
        loadingKey: 'get-sale-kit',
      });

      if (succeeded) {
        dispatch(
          setListSaleKitAction({
            data,
          }),
        );
      }
    },
    [caller, api],
  );

  const downLoadDocument = useCallback(
    async ({ id, tenant }: FilterSaleKitType) => {
      const queryParams: { [key: string]: string | undefined } = {
        id,
        tenant: tenant,
      };

      const urlParams = generateUrlParams(queryParams);

      const data = await caller(() => api.get(`/SaleKit/download-document?${urlParams}`), {
        loadingKey: 'download-sale-kit',
      });

      return data;
    },
    [caller, api],
  );

  return {
    getAllSaleKit,
    downLoadDocument,
  };
};
