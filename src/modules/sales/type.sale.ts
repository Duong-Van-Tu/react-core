export type DataKPIType = {
  key: number;
  proposer: string;
  criteria: string;
  objective: string;
  reality: string;
  targetPoint: string;
  implementationTime: string;
  calculationMethod: string;
};

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

export type DataPrivilegesType = {
  key: number;
  beneficiaryName: string;
  fixedMonthlySalary: string;
  totalTargetVariableSalary: string;
  actualVariableSalary: string;
  status: string;
};

export type DataRelationshipType = {
  key: number;
  jobPosition: string;
  targetLevel: string;
  upgrade: string;
  responsiblePerson: string;
  status: string;
  targetPoint: string;
};
