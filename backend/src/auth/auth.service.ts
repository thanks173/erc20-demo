import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersRepository.findOne({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException();
        }

        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(username: string, password: string): Promise<User> {
        const existedUser = await this.usersRepository.findOne({
            where: { username },
        });

        if (existedUser) {
            throw new ConflictException();
        }

        const user = this.usersRepository.create({ username, password });

        const hashedPassword = await bcrypt.hash(
            user.password,
            await bcrypt.genSalt(),
        );

        return await this.usersRepository.save({
            ...user,
            password: hashedPassword,
        });
    }
}
