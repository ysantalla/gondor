import { User } from '@app/core/model/user.model';

export interface Token {
    user: User;
    iat?: number;
    exp?: number;
}
