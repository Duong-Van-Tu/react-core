type DataOpportunityType = {
  id?: string;
  customerName?: string;
  accountable?: string;
  technicalLead?: string;
  need?: string;
  beneficiary?: string;
  estimatedTime?: string;
  budget?: string;
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
};

type ApplicationUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
};

type OpportunityStatus = {
  id?: string;
  code?: string;
  name?: string;
};
