import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class LabelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isSystem: boolean;
}
