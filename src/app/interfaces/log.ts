export const events = {
  newUser: 0,
  logIn: 1,
  logOut: 2,
  updateProfile: 3,
  deleteProfile: 4,
};

export interface Log {
  uid: string;
  datetime: string; //Data.toLocalString()
  event: number;
  type:number;//0 -1 - 2 | Admin - specialist - client
}
