import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { importSchema } from 'graphql-import';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { RoleModule } from './modules/role/role.module';
import { FileModule } from './modules/file/file.module';
import * as path from 'path';
import * as GraphQLJSON from 'graphql-type-json';
import { AppController } from './app.controller';

const typeDefs = importSchema(path.resolve('./src/schema.graphql'));

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      typeDefs,
      resolvers: { JSON: GraphQLJSON },
      uploads: true,
      context: async ({ req, res, connection, payload }) => {
        let token: string = null;
        if (payload) {
          token = payload.authorization || '';
          return {
            connection,
            payload,
            token: token.replace('Bearer ', ''),
          };
        }
        token = req.headers.authorization || '';
        return {
          req,
          res,
          token: token.replace('Bearer ', ''),
        };
      },
      cache: new MemcachedCache(['memCS1', 'memCS2', 'memCS3'], {
        retries: 10,
        retry: 10000,
      }),
      debug: true,
      subscriptions: {
        path: process.env.GRAPHQL_SUBSCRIPTION,
      },
      path: process.env.GRAPHQL_PATH,
    }),
    CommonModule,
    UserModule,
    RoleModule,
    FileModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class ApplicationModule {}
