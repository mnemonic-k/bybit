import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform((value) => String(value)?.trim())
  price: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform((value) => String(value)?.trim())
  qty: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform((value) => String(value)?.trim())
  symbol: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @Transform((value) => String(value)?.trim())
  leverage?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @Transform((value) => String(value)?.trim())
  takeProfit?: string;
}
