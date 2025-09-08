import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1654132039433 implements MigrationInterface {
  name = 'createTables1654132039433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100), "body" varchar(2000), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "content"`);
  }
}
