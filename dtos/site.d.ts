import { User } from "./auth";

export interface Site {
  id: string;
  name: string;
  url: string;
  userId: string;
  numberOfAccesses: number;
  user: User;
}
