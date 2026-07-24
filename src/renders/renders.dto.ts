import { ApiProperty } from '@nestjs/swagger';
import type { EditorLayer, EditorProject, EncoderProject } from 'src/types';
import {
  EncoderProject as EncoderProjectClass,
  EditorLayer as EditorLayerClass,
  EditorProject as EditorProjectClass,
} from 'src/types';
export class LayerDto {
  @ApiProperty({ type: EditorLayerClass })
  layer: EditorLayer;
  @ApiProperty({ type: EncoderProjectClass, isArray: true })
  media: EncoderProject[];
}
export class RenderDto {
  @ApiProperty({ type: EditorProjectClass })
  project: EditorProject;

  @ApiProperty({ type: LayerDto, isArray: true })
  layers: LayerDto[];
}
