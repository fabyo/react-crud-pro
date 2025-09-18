import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional() // Opcional
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
