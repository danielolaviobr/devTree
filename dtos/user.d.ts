export interface User {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
  token?: string;
}
