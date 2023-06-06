import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686013314208 implements MigrationInterface {
    name = 'Migration1686013314208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupons" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

}
