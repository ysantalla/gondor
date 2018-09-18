import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date.scalar';
import { PrismaProvider } from './providers/prisma.provider';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { NodeResolver } from './resolvers/node.resolver';

@Module({
  providers: [DateScalar, PrismaProvider, AuthService, FileService, NodeResolver],
  exports: [PrismaProvider, AuthService, FileService, NodeResolver],
})
export class CommonModule {}
