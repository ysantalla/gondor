import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthenticationError } from 'apollo-server-core';
import { AuthService } from '../services/auth.service';

const APP_SECRET: string = process.env.APP_SECRET;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private readonly authService: AuthService,
      private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = this.authService.getUser(ctx.getContext().token, APP_SECRET);

    const hasRole = () => user.roles.some((role) => roles.includes(role.name));

    if (user && user.roles && hasRole()) {
        return true;
    }
    throw new AuthenticationError('Not valid role');
    return false;
  }
}