export * from './Contact';
export * from './Media';
export * from './UserInfo';
export * from './Files';

import { Contact } from './Contact';
import { Media } from './Media';
import { UserInfo } from './UserInfo';
import { Folder } from './Folder';

export type EmptyFunc = () => null;
export enum FTSIndex {
  title = 'titleFTSIndex',
  name = 'nameFTSIndex',
  text = 'textFTSIndex',
}
export interface IProxy {
  country_code: string;
  city_name?: string;
  proxy_address?: string;
  port?: number;
  username?: string;
  password?: string;
}

export interface DocsGeneric {
  docs: (Folder | Media | Contact | UserInfo)[];
  rows: {
    _id: string;
    doc: Folder | Media | Contact | UserInfo;
  }[];
}

export interface Device {
  id: string;
  manufacturer: string;
  createdAt: number;
  isDevice: boolean;
  model: string;
  ip?: string;
  userAgent: string;
  os: string;
  platform: 'ios' | 'android' | 'web' | 'mac' | 'windows' | 'linux';
}
