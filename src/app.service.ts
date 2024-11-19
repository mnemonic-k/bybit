import { Inject, Injectable } from '@nestjs/common';
import {
  AccountMarginModeV5,
  APIResponseV3WithTime,
  OrderResultV5,
  RestClientV5,
} from 'bybit-api';
import { CreateOrderDto } from './dto/create-order.dto';
import { handleBybitApiError } from './common/helpers';

@Injectable()
export class AppService {
  constructor(
    @Inject('BYBIT_CLIENT') private readonly bybitClient: RestClientV5,
  ) {}

  async submitOrder(
    data: CreateOrderDto,
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    const { symbol, qty, price, takeProfit } = data;

    const res = await this.bybitClient.submitOrder({
      category: 'linear',
      side: 'Buy',
      orderType: 'Limit',
      symbol,
      qty,
      price,
      ...(takeProfit ? { takeProfit } : {}),
      isLeverage: 1,
    });

    handleBybitApiError(res);

    return res;
  }

  async setMarginMode(marginMode: AccountMarginModeV5) {
    const res = await this.bybitClient.setMarginMode(marginMode);

    handleBybitApiError(res);

    return res;
  }

  async setLeverage(
    symbol: string,
    leverage: string,
  ): Promise<APIResponseV3WithTime<object>> {
    const res = await this.bybitClient.setLeverage({
      category: 'linear',
      symbol,
      buyLeverage: leverage,
      sellLeverage: leverage,
    });

    handleBybitApiError(res);

    return res;
  }
}
