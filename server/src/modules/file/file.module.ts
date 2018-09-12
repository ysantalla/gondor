import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { FileResolver } from './resolvers/file.resolver';

@Module({
  imports: [CommonModule],
  providers: [FileResolver],
})
export class FileModule {}
