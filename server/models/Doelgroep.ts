import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Doelgroep {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ nullable: false })
    doelgroep: string;
}