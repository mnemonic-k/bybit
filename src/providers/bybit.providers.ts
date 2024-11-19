import { RestClientV5, WebsocketClient } from 'bybit-api';

const api_key = 'key';
const api_secret = 'secret';

export const ByBitProviders = [
  {
    provide: 'BYBIT_CLIENT',
    useFactory: () => {
      const client = new RestClientV5({
        demoTrading: true,
        key: api_key,
        secret: api_secret,
      });

      return client;
    },
  },

  {
    provide: 'BYBIT_WEBSOCKET',
    useFactory: () => {
      const wsClient = new WebsocketClient({
        market: 'v5',
        demoTrading: true,
        key: api_key,
        secret: api_secret,
      });

      return wsClient;
    },
  },
];
