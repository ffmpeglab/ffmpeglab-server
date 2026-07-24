import { ApiProperty } from '@nestjs/swagger';
import { Contact } from './Contact';
import { Folder, FolderType } from './Folder';
export interface RenderData {
  project: EditorProject;
  layers: {
    layer: EditorLayer;
    media: EncoderProject[];
  }[];
}
export interface WebMediaEmbedProps {
  folderId: string;
  mnemonic: string;
  mediaId: string;
  style: {};
  hideCloseButton?: boolean;
  folderType?: FolderType;
  isEmbed?: false;
}

export class ExtractorResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  extractor: string;
  @ApiProperty()
  _has_drm?: boolean;
  @ApiProperty()
  _filename?: string;
  @ApiProperty()
  _type?: string;
  @ApiProperty()
  _version?: string;
}

export enum BlankSize {
  '10s' = '10s',
  '1m' = '1m',
  '10m' = '10m',
  '1h' = '1h',
}

export interface PexelsVideo {
  video_files: {
    quality: 'hd' | 'sd';
    link: string;
    width: number;
    height: number;
  }[];
}

export class Media extends ExtractorResponse {
  @ApiProperty()
  _id?: string;
  @ApiProperty()
  _rev?: string;
  @ApiProperty()
  _deleted?: boolean;
  @ApiProperty()
  onboarded?: true;
  @ApiProperty()
  uri?: string;
  @ApiProperty()
  prompt?: string;
  @ApiProperty()
  model_name?: string;
  @ApiProperty()
  date: number;
  @ApiProperty()
  isMediaNew: boolean;
  @ApiProperty()
  hasSpectrogram?: boolean;
  @ApiProperty()
  hasImage?: boolean;
  @ApiProperty()
  folderId: string;
  @ApiProperty()
  originalId: string;
  @ApiProperty()
  webpage_url?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  isPlaying?: boolean;
  @ApiProperty()
  isDownloaded?: boolean;
  @ApiProperty()
  isDownloading?: boolean;
  @ApiProperty()
  isOpen?: boolean;
  @ApiProperty()
  isInfoOpen?: boolean;
  @ApiProperty()
  thumbnail?: string;
  @ApiProperty()
  currentPosition?: number;
  @ApiProperty()
  local?: string;
  @ApiProperty()
  torrentFileName?: string;
  @ApiProperty()
  files?: IFile[];
  @ApiProperty()
  magnetURI?: string;
  @ApiProperty()
  infoHash?: string;
  @ApiProperty()
  description?: string;
  staticMnemonic?: string;
  staticMnemonicImage: string;
  staticMnemonicSpectro: string;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  fileType: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  size?: number;
  @ApiProperty()
  type?: string;
  @ApiProperty()
  hasCloud?: boolean;
  @ApiProperty()
  isEncoderProject?: boolean;
  @ApiProperty()
  width: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  orderId?: number;
  @ApiProperty()
  duration?: number;
  @ApiProperty()
  isCopy?: string;
  @ApiProperty()
  mnemonic?: string;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  spectrogram?: string;
  @ApiProperty()
  isAuctionMedia?: boolean;
  @ApiProperty()
  torrentFile?: ArrayBuffer;
  @ApiProperty()
  preview?: Media['id'];
  @ApiProperty()
  isChatMedia?: true;
  @ApiProperty()
  audioSpectrogram_big?: string;
  @ApiProperty()
  filePath?: string;
  @ApiProperty()
  audioSpectrogram_small?: string;
  @ApiProperty()
  isVideo?: boolean;
  @ApiProperty()
  isAudio?: boolean;
  @ApiProperty()
  isTask?: boolean;
  @ApiProperty()
  TaskType?: TaskType;
  @ApiProperty()
  task_id?: string;
  @ApiProperty()
  task?: Task;
  @ApiProperty()
  taskStatus?: string;
  @ApiProperty()
  replays?: number[];
  @ApiProperty()
  currentReplay?: number;
  @ApiProperty()
  replayStatus?: string;
  @ApiProperty()
  isTextFile?: string;
  @ApiProperty()
  isReplace?: boolean;
}

export interface Task {
  task: string;
  task_id?: string;
  llm_config: {
    provider: string;
    model_name: string;
  };
  browser_config: {
    headless: boolean;
    disable_security: boolean;
    proxy?: {
      server: string;
      username: string;
      password: string;
      port: number;
    };
  };
  max_steps?: number;
  max_failures: number;
  use_vision: boolean;
  memory_interval: number;
  planner_interval: number;
  history?: { history: any[] };
  run_history?: boolean;
}

export type TaskType = 'audio' | 'web';

export enum FFMpegPreset {
  ultrafast = 'ultrafast',
  superfast = 'superfast',
  veryfast = 'veryfast',
  faster = 'faster',
  fast = 'fast',
  medium = 'medium',
  slow = 'slow',
  slower = 'slower',
  veryslow = 'veryslow',
}

export enum FFMpegOutputType {
  mp4 = 'mp4',
  gif = 'gif',
  mp3 = 'mp3',
  mov = 'mov',
  avi = 'avi',
  mkv = 'mkv',
}

export class EncoderProject extends Media {
  @ApiProperty()
  encoding: {
    outputFilePath?: string;
    compressionLevel: number;
    width: number;
    height: number;
    crf: number;
    preset: FFMpegPreset;
    output: FFMpegOutputType;
    code?: String[];
    lastUpdated?: number;
    start?: number;
    end?: number;
    soundVolume?: number;
    opacity?: number;
    reverse?: true;
    speed?: SpeedValue;
    transitionIn?: XFade & 'none';
    transitionOut?: XFade & 'none';
    transitionInDuration?: number;
    transitionOutDuration?: number;
    pan?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    resize: {
      x: number;
      y: number;
    };
    color: {
      r?: number;
      g?: number;
      b?: number;
    };
    scale?: number;
  };
}

export enum SpeedValue {
  '50%' = 0.5,
  '60%' = 0.6,
  '70%' = 0.7,
  '80%' = 0.8,
  '90%' = 0.9,
  '100%' = 1,
  '110%' = 1.1,
  '120%' = 1.2,
  '130%' = 1.3,
  '140%' = 1.4,
  '150%' = 1.5,
  '160%' = 1.6,
  '170%' = 1.7,
  '180%' = 1.8,
  '190%' = 1.9,
  '200%' = 2,
}

export enum SpeedValueAsetPts {
  '50%' = 1.5,
  '60%' = 1.4,
  '70%' = 1.3,
  '80%' = 1.2,
  '90%' = 1.1,
  '100%' = 1,
  '110%' = 0.9,
  '120%' = 0.8,
  '130%' = 0.7,
  '140%' = 0.6,
  '150%' = 0.5,
  '160%' = 0.4,
  '170%' = 0.3,
  '180%' = 0.2,
  '200%' = 0.1,
}

export const outputTypes = ['LOW', 'SD', 'HD'];
export const fullOutputTypes = [...outputTypes, 'FULLHD'];
export const aspectRatios = ['16/9', '9/16'];

export const qualityToSize = {
  FULLHD: { width: 1920, height: 1080 },
  HD: { width: 1280, height: 720 },
  SD: { width: 854, height: 480 },
  LOW: { width: 640, height: 360 },
};
export interface EditorComment extends EncoderProject, Contact {
  description: string;
  isEditorComment: true;
  mnemonic: string;
  orderId: number;
}

export class EditorProject extends Folder {
  @ApiProperty()
  isEditorProject?: boolean;
  @ApiProperty()
  editor: {
    length: number;
    width: number;
    height: number;
    lastUpdated: number;
    start?: number;
    end?: number;
    outputFilePath?: string;
    compressionLevel: number;
    framerate?: number;
    opacity?: number;
    aspectRatio?: string;
    preset: FFMpegPreset;
    output: FFMpegOutputType;
    code?: string;
    selectedCode?: 'custom' | 'generated';
  };
}

export class EditorLayer extends Folder {
  @ApiProperty()
  isEditorLayer?: boolean;
  @ApiProperty()
  editor: {
    muted?: boolean;
    videoDisabled?: boolean;
    isCommentLayer?: boolean;
  };
  @ApiProperty()
  media?: EncoderProject[];
}

export interface MediaRes {
  docs: Media[];
}

export interface IFile {
  url: string;
  name: string;
  type: string;
}

export interface Product extends Media {
  price: number;
  isProduct: true;
  productDescription?: string;
  productName?: string;
  status: 'published' | 'draft';
}

export interface MinimalProduct {
  price: number;
  category: string;
  description: string;
  title: string;
  id: string;
  order: number;
  image: string;
}

export enum XFade {
  //fade
  fade = 'fade',
  fadeblack = 'fadeblack',
  fadewhite = 'fadewhite',
  distance = 'distance',
  //wipe
  wipeleft = 'wipeleft',
  wiperight = 'wiperight',
  wipeup = 'wipeup',
  wipedown = 'wipedown',
  //slide
  slideleft = 'slideleft',
  slideright = 'slideright',
  slideup = 'slideup',
  slidedown = 'slidedown',
  //smooth
  smoothleft = 'smoothleft',
  smoothright = 'smoothright',
  smoothup = 'smoothup',
  smoothdown = 'smoothdown',
  //cover
  // coverleft = 'coverleft',
  // coverright = 'coverright',
  // coverup = 'coverup',
  // coverdown = 'coverdown',
  //reveal
  // revealleft = 'revealleft',
  // revealright = 'revealright',
  // revealup = 'revealup',
  // revealdown = 'revealdown',
  //fadegrays
  fadegrays = 'fadegrays',
  //squueze
  squeezev = 'squeezev',
  squeezeh = 'squeezeh',
  //zoomin
  zoomin = 'zoomin',
  //dissolve
  dissolve = 'dissolve',
  //pixelize
  pixelize = 'pixelize',
  //radial
  radial = 'radial',
  //blur
  hblur = 'hblur',
  //wipe
  wipetl = 'wipetl',
  wipetr = 'wipetr',
  wipebl = 'wipebl',
  wipebr = 'wipebr',
  //slice
  hlslice = 'hlslice',
  hrslice = 'hrslice',
  vuslice = 'vuslice',
  vdslice = 'vdslice',
  //crop
  circlecrop = 'circlecrop',
  rectcrop = 'rectcrop',
  circleclose = 'circleclose',
  circleopen = 'circleopen',
  //close/open
  horzclose = 'horzclose',
  horzopen = 'horzopen',
  vertclose = 'vertclose',
  vertopen = 'vertopen',
}
