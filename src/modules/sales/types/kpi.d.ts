type Status = 'PENDING' | 'COMPLETED' | 'REQUEST' | 'UPDATED' | 'PROCESSING' | 'FAILED';

type UserSuggest = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

type KPIStatus = {
  id: string;
  name: string;
  code: string;
};

type DataKPIType = {
  id?: string;
  key?: number;
  criteria?: string;
  targetKPI?: string;
  targetPoint?: string;
  actualKPI?: string;
  actualPoint?: string;
  startTime?: string;
  endTime?: string;
  calculate?: string;
  userSuggest?: UserSuggest;
  goalStatus?: KPIStatus;
  status?: Status;
  suggestEndTime?: string;
  suggestTargetKPI?: string;
  suggestTargetPoint?: string;
  totalExtend?: number;
};
