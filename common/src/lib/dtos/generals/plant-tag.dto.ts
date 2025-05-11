import { IsString, Matches } from 'class-validator';

export class PlantTagDto {
  @IsString()
  // @Matches(/^[a-z0-9]+$/, {
  //   message:
  //     'plantTag must contain only lowercase letters and numbers with no special characters',
  // })
  plantTag: string;
}
