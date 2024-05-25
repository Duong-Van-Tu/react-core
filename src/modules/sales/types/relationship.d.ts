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

type DataAddRelationship = {
  customerId: string;
  customerName: string;
  position: string;
  currentRelationshipId: string;
  targetRelationshipId: string;
  reason: string;
  point: string;
  applicationUserId: string;
};

type RelationshipCustomer = {
  id: string;
  code: string;
  fullname: string;
};

type RelationshipLevel = {
  id: string;
  code: string;
  description: string;
  review: string;
  pointFrom: string;
  pointTo: string;
};

type GainsRelationshipType = {
  id?: string;
  relationshipId: string;
  dayOfBirth: string;
  email: string;
  phone: string;
  archivement: string;
  aspiration: string;
  clubs: string;
  company: string;
  degree: string;
  dislike: string;
  family: string;
  faviroteActivity: string;
  formerJob: string;
  habit: string;
  hobby: string;
  idol: string;
  longGoal: string;
  nativePlace: string;
  nearGoal: string;
  position: string;
  positionTerm: string;
  schoolAndYear: string;
  speciality: string;
  strongPoint: string;
  weakPoint: string;
  weekendActivity: string;
  address: string;
};

type RelationshipGainsQuestion = {
  id: string;
  relationshipId: string;
  gainsQuestionId: string;
  question: string;
  answer: boolean;
};
