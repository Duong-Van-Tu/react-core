type ApplicationRolesType = {
  id: string;
  name: string | null;
  displayName: string;
  description: string | null;
  applicationUserId: string;
};

type DataHumanResourcesType = {
  id?: string;
  userName?: string;
  passwordHash?: string | null;
  firstName?: string;
  lastName?: string;
  fullName?: string | null;
  avatar?: string;
  email?: string;
  phone?: string;
  applicationUserStatus?: string | null;
  createdApplicationUserId?: string;
  lastModifiedApplicationUserId?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  sms?: boolean;
  notes?: string | null;
  applicationRoles?: ApplicationRolesType[];
};
