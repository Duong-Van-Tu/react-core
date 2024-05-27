type ApplicationRolesType = {
  id: string;
  name: string | null;
  displayName: string;
  description: string | null;
  applicationUserId: string;
};

type ApplicationUserStatusType = {
  code: string;
  name: string;
  id: string;
};

type DataUserType = {
  id?: string;
  key?: number;
  userName?: string;
  passwordHash?: string | null;
  firstName?: string;
  lastName?: string;
  fullName?: string | null;
  code?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  applicationUserStatus?: ApplicationUserStatusType;
  dateOfBirth: string;
  startDate: string;
  endDate: string;
  currentPosition: string | null;
  createdApplicationUserId?: string;
  lastModifiedApplicationUserId?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  sms?: boolean;
  notes?: string | null;
  review: string;
  applicationRoles?: ApplicationRolesType[];
};
