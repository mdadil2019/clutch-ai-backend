import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781427626287 implements MigrationInterface {
    name = 'Migration1781427626287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "streams" 
            ("id" SERIAL NOT NULL, 
            "streamURL" character varying NOT NULL, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_streams" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" 
            ("id" SERIAL NOT NULL, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "streamId" integer NOT NULL, 
            "status" character varying NOT NULL, 
            CONSTRAINT "PK_events" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "streams"`);
    }

}
