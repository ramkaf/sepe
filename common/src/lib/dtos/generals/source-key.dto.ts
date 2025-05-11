import { Matches } from 'class-validator';

export class SourceKeyDto {
  @Matches(/^\S*$/, { message: 'key should not contain spaces' })
  key: string;
}
