type Customer = {
  id: string;
  code: string;
  fullname: string;
};

type ContractStatus = {
  id: string;
  code: string;
  name: string;
};

type DataContractType = {
  key?: number;
  id?: string;
  code?: string;
  name?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  customer?: Customer;
  contractStatus?: ContractStatus;
};

type DataContractCustomerType = {
  code?: string;
  fullname?: string;
  id?: string;
};
