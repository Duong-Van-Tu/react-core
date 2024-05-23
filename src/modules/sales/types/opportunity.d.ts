type DataOpportunityType = {
  id?: string;
  customerName?: string;
  accountable?: string;
  technicalLead?: string;
  need?: string;
  beneficiary?: string;
  estimatedTime?: string;
  budget?: string;
  estimatedMoney: ?string;
  commissionMoney?: string;
  opponent1?: string;
  opponent1Attribute?: string;
  opponent2?: string;
  opponent2Attribute?: string;
  strategy?: string;
  lastTimeInteract?: string;
  winningOppotunity?: string;
  reason?: string;
  applicationUser?: ApplicationUser;
  opportunityStatus?: OpportunityStatus;
  saleAndSupplierId?: string;
  status?: string;
  applicationUserId?: string;
};

type OpportunityStatus = {
  id: string;
  code: string;
  name: string;
};

type ApplicationRole = {
  id: string;
  name: string | null;
  displayName: string;
  description: string | null;
  applicationUserId: string;
};

type SaleAndSupplier = {
  id: string;
  userName: string;
  passwordHash: string | null;
  firstName: string;
  lastName: string;
  fullName: string | null;
  avatar: string;
  email: string;
  phone: string;
  applicationUserStatus: string | null;
  createdApplicationUserId: string;
  lastModifiedApplicationUserId: string;
  createdDate: string;
  lastModifiedDate: string;
  sms: boolean;
  notes: string | null;
  applicationRoles: ApplicationRole[];
};

type HistoryOpportunityType = {
  id: string;
  activity: string;
  applicationUser: string;
  goal: string;
  opportunityId: string;
  result: string;
  time: string;
  applicationUserId?: string;
};
