import { ApiProperty } from '@nestjs/swagger';

export class Folder {
  @ApiProperty()
  id: string;
  @ApiProperty()
  isFolder: boolean;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  folderType: FolderType;
  @ApiProperty()
  title: string;
  @ApiProperty()
  isOpen?: boolean;
  @ApiProperty()
  date: number;
  @ApiProperty()
  isEditing?: boolean;
  @ApiProperty()
  isInfoOpen?: boolean;
  @ApiProperty()
  sortId?: number;
  @ApiProperty()
  thumbnail?: string;
  @ApiProperty()
  files?: string[];
  @ApiProperty()
  folderId?: string;
  @ApiProperty()
  orderId: number;
  mnemonic?: string;
  isShared?: boolean;
  isEmbedEnabled?: boolean;
  embedParams?: {
    mediaId: string;
    style: {
      height: number;
      width: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
      position: 'absolute' | 'flex' | 'relative';
    };
    videoEnabled?: boolean;
    audioEnabled?: boolean;
    hideCloseButton?: boolean;
  };
}

export enum FolderType {
  contact = 'contact',
  media = 'media',
  settings = 'settings',
  encoder = 'encoder',
  editor = 'editor',
  database = 'database',
  search = 'search',
}
