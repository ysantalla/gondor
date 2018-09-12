import { Module } from '@nestjs/common';
import { RoleResolver } from './resolvers/role.resolver';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [RoleResolver],
})
export class RoleModule {}
