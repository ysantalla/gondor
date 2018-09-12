import { Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [AuthResolver, UserResolver],
})
export class UserModule {}
