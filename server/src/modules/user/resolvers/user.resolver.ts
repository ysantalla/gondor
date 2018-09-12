import { UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Args, Mutation, Query, Resolver, Subscription, Context, Info, ResolveProperty,  } from '@nestjs/graphql';

import { Prisma, User } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { AuthService } from '../../common/services/auth.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../../common/guards/auth.guard';

const APP_SECRET: string = process.env.APP_SECRET;

@Resolver('User')
export class UserResolver {

  constructor(
    private authService: AuthService,
    private readonly prisma: Prisma,
  ) { }

  @Query('users')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async users(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
    ): Promise<User[]> {
    return await this.prisma.query.users(args, info);
  }

  @Query('user')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async user(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    return await this.prisma.query.user({where: { id }}, info);
  }

  @Query('usersConnection')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async usersConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.usersConnection({...args}, info);
  }

  @Mutation('createUser')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async createUser(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const password = await bcrypt.hash(args.data.password, 10);
    const userCreated = await this.prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password,
        },
      },
      info,
    );
    return userCreated;
  }

  @Mutation('updateUser')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async updateUser(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const userExist = await this.prisma.exists.User({
      id: args.where.id,
    });

    if (!userExist) {
      throw new ApolloError(`User not found`);
    }

    if (args.data.password) {
      const password = await bcrypt.hash(args.data.password, 10);
      args.data.password = password;
    }

    return await this.prisma.mutation.updateUser(
      {
        where: { ...args.where },
        data: {
          ...args.data,
        },
      },
      info,
    );
  }

  @Mutation('deleteUser')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteUser(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const userExist = await this.prisma.exists.User({
      id: args.where.id});

    if (!userExist) {
      throw new ApolloError(`User not found`);
    }

    return await this.prisma.mutation.deleteUser(
      {
        where: {...args.where},
      },
      info,
    );
  }

  @Mutation('deleteManyUsers')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteManyUsers(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    return await this.prisma.mutation.deleteManyUsers({
      where: {...args.where},
    },
    info,
    );
  }

  @Subscription('userSubscription')
  userSubscription() {
    return {
      subscribe: async (obj: any, args: any, context, info: GraphQLResolveInfo) => {
        // console.log(context.token);
        return await this.prisma.subscription.user(args, info);
      },
    };
  }
}
