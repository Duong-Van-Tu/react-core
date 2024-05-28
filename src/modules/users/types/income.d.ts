type ApplicationUserType = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  code?: string;
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

type DataIncomeUserType = {
  incomeBeforeTax: number;
  incomeNonTax: number;
  dependent: number;
  insurance: number;
  incomeTax: number;
  personalIncomeTax: number;
  incomeRecevied: number;
  userName: string;
  tenantNameRoles: null | string;
  applicationUser: ApplicationUserType;
};

type DataIncomTypeWithRoleAdminType = {
  applicationUser: ApplicationUserType;
  incomeOther: number;
  totalIncome: number;
  incomeRoles: {
    id: string;
    income: number;
  }[];
};

type DataIncomTypeWithRoleUserType = {
  month: number;
  year: number;
  incomeOther: number;
  totalIncome: number;
  incomeRoles: {
    id: string;
    income: number;
  }[];
};

type DataIncomeDetailType = {
  employeeCode: string;
  userId: string;
  month: number;
  year: number;
  incomeEta: number;
  incomeReal: number;
  userName: string;
  typeCP: string;
  projectName: string;
  timeSpent: string;
  note: string;
  id: string;
};
