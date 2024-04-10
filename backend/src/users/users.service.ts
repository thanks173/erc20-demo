import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create(createUserDto);

        const hashedPassword = await bcrypt.hash(user.password, await bcrypt.genSalt());

        return await this.usersRepository.save({ ...user, password: hashedPassword });
    }

    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }

        Object.assign(user, updateUserDto);

        return await this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.usersRepository.remove(user);
    }
}
