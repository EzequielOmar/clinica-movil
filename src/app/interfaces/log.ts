export const events = {
  newUser: 1,
  logIn: 2,
  logOut: 3,
  updateProfile: 4,
  deleteProfile: 5,
};

export interface Log {
  uid: string;
  datetime: string; //Data.toLocalString()
  event: number;
  type: number; //1 - 2 - 3 | Admin - specialist - client
}
