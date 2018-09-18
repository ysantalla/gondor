import { Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-core';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  getUserId(token: string, secret: string): string {
    if (token) {
      const tokenDecoded: any = jwt.verify(token, secret);
      return tokenDecoded.user.id;
    }

    throw new AuthenticationError('Not valid token');
  }

  getUser(token: string, secret: string): any {
    if (token) {
      const tokenDecoded: any = jwt.verify(token, secret);
      return tokenDecoded.user;
    }

    throw new AuthenticationError('Not valid token');
  }
}