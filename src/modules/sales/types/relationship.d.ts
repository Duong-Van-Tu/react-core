type RelationshipStatus = {
  code: string;
  name: string;
  id: string;
};

type DataRelationshipType = {
  customerName: string;
  position: string;
  reason: string;
  point: number;
  customer: string;
  currentRelationshipLevel: string;
  targetRelationshipLevel: string;
  relationshipStatus: RelationshipStatus;
  applicationUser: ApplicationUser;
  id: string;
};
