type BenefitStatusCode = 'PENDING' | 'UPDATED' | 'REQUEST' | 'CONFIRMED';

type BenefitStatus = {
  code: BenefitStatusCode;
  name: string;
  id: string;
};

type DataBenefitType = {
  id?: string;
  totalBenefit?: string;
  monthlySalary?: string;
  targetSalary?: string;
  totalSalary?: string;
  suggestMonthlySalary?: string;
  suggestTargetSalary?: string;
  suggestTotalSalary?: string;
  applicationUser?: ApplicationUser;
  benefitStatus?: BenefitStatus;
  applicationUserId?: string;
  status?: string;
};

type UserBenefit = {
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  phone: string;
};
