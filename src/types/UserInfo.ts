import { Device } from './';

export interface UserInfo {
  id: string;
  idHash: string;
  version: string;
  handle: string;
  photo: string;
  description: string;
  email?: string;
  name: string;
  prevVersion: string;
  userDoc: boolean;
  devices?: Device[];
}
