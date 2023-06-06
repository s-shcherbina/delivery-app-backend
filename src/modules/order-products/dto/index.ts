import { IsNotEmpty, IsNumber } from 'class-validator';

export class createOrderProductDTO {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  goodId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
