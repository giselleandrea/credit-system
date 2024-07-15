import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { CreditUser } from "./CreditUser";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    document: string;
    
    @Column()
    typeDocumet: string;

    @Column()
    typeUser: string

    @OneToMany(() => CreditUser, (creditUser) => creditUser.user)
    creditUsers: CreditUser[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
