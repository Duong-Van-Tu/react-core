type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  applicationRoles: Role[];
};

type Role = {
  id: string;
  name: string;
  applicationUserId: string;
  description: string;
  displayName: string;
};

type ApplicationUser = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
};
