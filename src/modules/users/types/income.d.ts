type ApplicationUserType = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
};

type RoleType = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  applicationUserId: string;
};

type DataIncomeType = {
  id?: string;
  incomeBeforeTax?: number;
  incomeNonTax?: number;
  dependent?: number;
  insurance?: number;
  incomeTax?: number;
  personalIncomeTax?: number;
  incomeRecevied?: number;
  applicationUser?: ApplicationUserType;
  roles?: RoleType[];
};

type DataIncomTypeWithRoleAdmin = {
  applicationUser: ApplicationUserType;
  incomeOther: number;
  totalIncome: number;
  incomeRoles: {
    id: string;
    income: number;
  }[];
};

type DataIncomTypeWithRoleUser = {
  month: number;
  year: number;
  incomeOther: number;
  totalIncome: number;
  incomeRoles: {
    id: string;
    income: number;
  }[];
};
