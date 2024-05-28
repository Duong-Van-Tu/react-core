type ProjectStatus = {
  code: string;
  name: string;
  id: string;
};

type DataProjectType = {
  key?: number;
  id?: string;
  code?: string;
  name?: string;
  result?: string;
  type?: string;
  point?: number;
  note?: string;
  applicationUser?: string;
  service?: string;
  projectStatus?: ProjectStatusType;
};

type DataProjectApplicationUserType = {
  id?: string;
  userName?: string;
  code?: string;
};
