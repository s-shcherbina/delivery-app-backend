import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createOrderProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  shopId: number;
}
