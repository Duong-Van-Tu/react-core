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
  id?: number;
  key?: number;
  criteria?: string;
  targetKPI: string;
  targetPoint: string;
  actualPoint?: string;
  startTime: string;
  endTime: string;
  calculate: string;
  userSuggest?: UserSuggest;
  goalStatus?: KPIStatus;
};
