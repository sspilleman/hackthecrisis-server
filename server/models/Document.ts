import { Klas } from './Klas';
import { Vak } from './Vak';
import { Niveau } from './Niveau';
import { Doelgroep } from './Doelgroep';
import { Thema } from './Thema';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    description: string;
    @Column({ nullable: false })
    link: string;
    @Column({ nullable: false })
    paid: boolean;
    @ManyToMany(type => Klas, { eager: true })
    @JoinTable()
    klassen: Klas[];
    @ManyToMany(type => Doelgroep, { eager: true })
    @JoinTable()
    doelgroeppen: Doelgroep[];
    @ManyToMany(type => Vak, { eager: true })
    @JoinTable()
    vakken: Vak[];
    @ManyToMany(type => Niveau, { eager: true })
    @JoinTable()
    niveaus: Niveau[];
    @ManyToMany(type => Thema, { eager: true })
    @JoinTable()
    themas: Thema[];
}