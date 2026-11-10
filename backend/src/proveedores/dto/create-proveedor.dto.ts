import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}
