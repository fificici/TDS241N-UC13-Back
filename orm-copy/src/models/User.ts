import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { Post } from './Post';

@Entity('users') // Informa para o ORM que essa classe será uma Entidade do Banco de Dados
export class User {

    @PrimaryGeneratedColumn() // Define que o campo será uma Chave Primária (PK) e Auto Incrementável (AI)
    id!: number;

    @Column({ length: 100, nullable: false }) // Define que o tamanho do campo é de 100 caracteres, e não pode ser nulo.
    nome: string;

    @Column({ length: 100, nullable: false, unique: true }) // Define que o campo é Único (UK)
    email: string;

    @Column({ length: 255, nullable: false })
    password: string

    private originalPassword!: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password && this.password !== this.originalPassword) {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
        }
    }

    @AfterLoad()
    private setPreviousPassword(){
        this.originalPassword = this.password
    }

    @OneToMany(() => Post, post => post.user)
    posts?: Post[];

    constructor(nome: string, email: string, password: string) {

        this.nome = nome
        this.email = email
        this.password = password
    }
}