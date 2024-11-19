import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { BYBIT_CODES } from './constants';
import { APIResponseV3 } from 'bybit-api';

export const handleBybitApiError = (response: APIResponseV3<object>) => {
  if (
    ![BYBIT_CODES.success, BYBIT_CODES.notModified].includes(response.retCode)
  ) {
    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: response.retMsg,
    });
  }
};
