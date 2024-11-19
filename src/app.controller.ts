import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_STATUS } from './common/constants';
import { WebsocketClient } from 'bybit-api';

@Controller('orders')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('BYBIT_WEBSOCKET') private readonly bybitWsClient: WebsocketClient,
  ) {
    this.setupWebsocket();
  }

  private setupWebsocket() {
    this.bybitWsClient.on('update', (message) => {
      const { data } = message;
      const { orderId, orderStatus } = data[0];

      if ([ORDER_STATUS.Filled, ORDER_STATUS.Triggered].includes(orderStatus)) {
        console.log(`Order completed - ${orderId}`);
      }
    });

    this.bybitWsClient.subscribeV5('order', 'linear');
  }

  @Post()
  @ApiOperation({ summary: 'Create order using bybit api' })
  @HttpCode(HttpStatus.OK)
  async createOrder(@Body() body: CreateOrderDto): Promise<object> {
    const { symbol, leverage } = body;

    await this.appService.setMarginMode('REGULAR_MARGIN');

    if (leverage) {
      await this.appService.setLeverage(symbol, leverage);
    }

    const resOrderSubmit = await this.appService.submitOrder(body);

    const { orderId } = resOrderSubmit.result;

    return { orderId };
  }
}
