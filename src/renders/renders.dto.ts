import { ApiProperty } from '@nestjs/swagger';

import type { EditorLayer, EditorProject } from 'src/types';

import {
  EditorLayer as EditorLayerClass,
  EditorProject as EditorProjectClass,
} from 'src/types';

export class RenderDto {
  @ApiProperty({ type: EditorProjectClass })
  project: EditorProject;

  @ApiProperty({ type: EditorLayerClass, isArray: true })
  layers: EditorLayer[];
}

export class RunDto {
  @ApiProperty()
  id: string;
}
