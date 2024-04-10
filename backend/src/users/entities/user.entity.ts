import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ type: String })
    password: string;

    @Column({ type: String, nullable: true })
    walletAddress: string;

    // @Column({ type: 'text', nullable: true })
    // description: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;
}
