type DataSaleKitType = {
  name: string;
  description: string;
  folderName: string;
  originalFileName: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  filePath: string;
  id: string;
};

type DataSaleKitRoleType = {
  access: boolean;
  applicationRoleId: string;
  fileName: string;
  id: string;
  saleKitId: string;
};

type DataSaleKitUpdateType = {
  data: {
    id: string;
    applicationRoleId: string;
    saleKitId: string;
    fileName: string;
    access: boolean;
  }[];
  lastModifiedApplicationUserId: string;
};
