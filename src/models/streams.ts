import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("streams")
class Stream {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    streamURL!: string;

    @CreateDateColumn()
    createdAt!: Date;

}


export default Stream;