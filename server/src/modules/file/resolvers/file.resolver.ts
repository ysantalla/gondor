import { UseGuards, Logger } from '@nestjs/common';

import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
  Context,
} from '@nestjs/graphql';

import { Prisma, File } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { FileService } from '../../common/services/file.service';

@Resolver('File')
export class FileResolver {
  constructor(
    private readonly prisma: Prisma,
    private readonly fileService: FileService,
  ) {}

  @Query('files')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async files(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<File[]> {
    return await this.prisma.query.files(args, info);
  }

  @Query('file')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async file(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<File> {
    return await this.prisma.query.file({where: { id: args.id }}, info);
  }

  @Query('filesConnection')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async filesConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.filesConnection({...args}, info);
  }

  @Mutation('uploadFile')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async uploadFile(
    @Args('file') file: any,
    @Context() ctx: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const data: any = await this.fileService.storeFS(file);
    return await this.prisma.mutation.createFile({
      data,
    }, info);
  }

  @Mutation('uploadFiles')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async uploadFiles(
    @Args('files') files: any,
    @Context() ctx: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    return await Promise.all(files.map(async (file) =>  {
      const data: any = await this.fileService.storeFS(file);
      return await this.prisma.mutation.createFile({
        data,
      }, info);
    }));
  }

  @Mutation('changeFile')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async changeFile(
    @Context() ctx: any,
    @Args('file') file: any,
    @Args('where') where: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const fileExist = await this.prisma.exists.File({id: where.id});

    if (!fileExist) {
      throw new ApolloError(`File not found`);
    }

    const oldFile = await this.prisma.query.file({where: {id: where.id}});

    try {
      await this.fileService.removeFS(oldFile.path);
    } catch (error) {
      Logger.warn(error);
    }

    const data: any = await this.fileService.storeFS(file);

    return await this.prisma.mutation.updateFile(
      {
        where: {...where},
        data: { ...data },
      },
      info,
    );
  }

  @Mutation('deleteFile')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteFile(
    @Context() ctx: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const FileExist = await this.prisma.exists.File({id: args.where.id});

    if (!FileExist) {
      throw new ApolloError(`File not found`);
    }

    const file = await this.prisma.query.file({where: {id: args.where.id}});

    try {
      await this.fileService.removeFS(file.path) ;
    } catch (error) {
      Logger.warn(error);
    }

    return await this.prisma.mutation.deleteFile(
      {
        where: {...args.where},
      },
      info,
    );
  }

  @Mutation('deleteManyFiles')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteManyFiles(
    @Context() ctx: any,
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {

    const files = await this.prisma.query.files({where: {...args.where}});
    const datas = await Promise.all(files.map(async (file) => {
      try {
        return await this.fileService.removeFS(file.path);
      } catch (error) {
        Logger.warn(error);
      }
    }));

    return await this.prisma.mutation.deleteManyFiles({
      where: {...args.where},
    },
    info,
    );
  }

}
