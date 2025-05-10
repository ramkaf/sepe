import { Matches } from 'class-validator';

export class PlantTagDto {
  @Matches(/^[a-z0-9]+$/, {
    message:
      'plantTag must contain only lowercase letters and numbers with no special characters',
  })
  plantTag: string;
}
