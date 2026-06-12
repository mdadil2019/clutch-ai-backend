import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clip_moments")
class ClipMoment{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    startTimestamp!: number;

    @Column()
    endTimestamp!: number;

    @Column()
    clipId!: number;
}