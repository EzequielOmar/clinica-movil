export const events = {
  signUpEmailPass: 0,
  logInEmailPass: 1,
  logOut: 2,
  updateProfile: 3,
  deleteProfile: 4,
};

export interface Log {
  uid: string;
  event: string;
  datetime: string; //Data.toLocalString()
}
