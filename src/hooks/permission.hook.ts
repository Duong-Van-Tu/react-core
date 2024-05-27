import { useRootSelector } from './selector.hook';

export enum Role {
  SaleDirector = 'SaleDirector',
  Sale = 'Sale',
  Admin = 'Admin',
  Administrator = 'Administrator',
  Supplier = 'Supplier',
}

export const usePermission = () => {
  const applicationRoles = useRootSelector((state) => state.auth.user?.applicationRoles);

  const isAdmin = applicationRoles?.some((role) => role.name === Role.Admin);
  const isAdministrator = applicationRoles?.some((role) => role.name === Role.Administrator);
  const isSaleDirector = applicationRoles?.some((role) => role.name === Role.SaleDirector);
  const isSale = applicationRoles?.some((role) => role.name === Role.Sale);
  const isSupplier = applicationRoles?.some((role) => role.name === Role.Supplier);

  return { isAdmin, isSaleDirector, isSale, isSupplier, isAdministrator };
};
