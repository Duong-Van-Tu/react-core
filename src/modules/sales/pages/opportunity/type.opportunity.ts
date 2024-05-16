export type DataOpportunityType = {
  key: number;
  customers: string;
  decisionMakers: string;
  technicalLeads: string;
  beneficiaries: string;
  customerNeeds: string;
  expectedTime: string;
  budget: string;
};
export type DataUpdateOpportunityType = {
  key: number;
  target:string;
  activites:string;
  time:string;
  result:string
};
export type DataUpdateHistoryOpportunityType = {
  key: number;
  updateTime:string;
  updatePerson:string;
  target:string;
};
