import { 
    Entity, 
    ObjectId,
    ObjectIdColumn, 
    Column
} from "typeorm";

@Entity()
export class Plan {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    creditId: number;

    @Column()
    month: number;

    @Column('decimal')
    principal: number;

    @Column('decimal')
    interest: number;

    @Column('decimal')
    remainingBalance: number;
}