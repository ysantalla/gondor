import { Args, Mutation, Query, Resolver, Context, Info, Parent } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Prisma, User } from '../../../generated/prisma';
import { ApolloError } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';
import { AuthService } from '../../common/services/auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';

const APP_SECRET: string = process.env.APP_SECRET;

@Resolver('Auth')
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
    private readonly prisma: Prisma,
  ) {}

  @Query('me')
  @UseGuards(AuthGuard)
  async me(
    @Context('token') token: string,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo):
     Promise<User> {
    const id = this.authService.getUserId(token, APP_SECRET);
    return this.prisma.query.user({where: { id } }, info);
  }

  @Mutation('signup')
  async signup(
    @Parent() parant: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const roleId = await this.prisma.query.role({ where: { name: 'USER' } }, `{id}`);
    const password = await bcrypt.hash(args.data.password, 10);

    if (!roleId) {
      const createUser = await this.prisma.mutation.createUser(
        {
          data: {
            ...args.data,
            password,
            roles: {
              create: {
                name: 'USER',
                description: 'USER ROLE',
              },
            },
          },
        },
        `{id firstname lastname email roles {name}}`,
      );

      return {
        token: jwt.sign(
          {
            user: {
              id: createUser.id,
              firstname: createUser.firstname,
              email: createUser.email,
              roles: createUser.roles,
            },
          },
          APP_SECRET,
          {
            expiresIn: '24h',
          },
        ),
        createUser,
      };
    }

    const user = await this.prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password,
          roles: {
            connect: {
              id: roleId.id,
            },
          },
        },
      },
      `{id firstname lastname email roles {name}}`,
    );

    return {
      token: jwt.sign(
        {
          user: {
            id: user.id,
            firstname: user.firstname,
            email: user.email,
            roles: user.roles,
          },
        },
        APP_SECRET,
        {
          expiresIn: '24h',
        },
      ),
      user,
    };
  }

  @Mutation('login')
  async login(
    @Parent() parant: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const user: any = await this.prisma.query.user(
      { where: {email:  args.email} },
      `{id firstname email password roles  {name}}`,
    );
    if (!user) {
      throw new ApolloError(`No such user found for email: ${args.email}`);
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new ApolloError('Invalid password');
    }

    return {
      token: jwt.sign(
        {
          user: {
            id: user.id,
            firstname: user.firstname,
            email: user.email,
            roles: user.roles,
          },
        },
        APP_SECRET,
        {
          expiresIn: '24h',
        },
      ),
      user,
    };
  }

  @Mutation('changePassword')
  @UseGuards(AuthGuard)
  async changePassword(
    @Parent() parant: any,
    @Context('token') token: string,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const userId = this.authService.getUserId(token, APP_SECRET);

    const user: any = await this.prisma.query.user(
      { where: { id: userId } },
      `{id password}`,
    );

    if (!user) {
      throw new ApolloError('No such user found');
    }

    const valid = await bcrypt.compare(args.data.oldPassword, user.password);
    if (!valid) {
      throw new ApolloError('Invalid old password');
    }

    const newPasswordHash = await bcrypt.hash(args.data.newPassword, 10);

    try {
      return await this.prisma.mutation.updateUser({
        where: { id: userId },
        data: { password: newPasswordHash },
      });
    } catch (e) {
      return new ApolloError(e);
    }
  }

  @Mutation('profile')
  @UseGuards(AuthGuard)
  async profile(
    @Parent() parant: any,
    @Context('token') token: string,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = this.authService.getUserId(token, APP_SECRET);

    try {
      const user: any = await this.prisma.mutation.updateUser(
        {
          where: { id: userId },
          data: { ...args.data },
        },
        `{id firstname lastname email roles {name}}`,
      );

      return {
        token: jwt.sign(
          {
            user: {
              id: user.id,
              firstname: user.firstname,
              email: user.email,
              roles: user.roles,
            },
          },
          APP_SECRET,
          {
            expiresIn: '24h',
          },
        ),
        user,
      };
    } catch (e) {
      return e;
    }
  }
}
