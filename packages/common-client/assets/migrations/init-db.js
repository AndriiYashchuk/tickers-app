const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class initialSchema1625847615203 {
  name = 'initialSchema1625847615203';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'label',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'notice',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isSystem',
            type: 'boolean',
            isNullable: true,
            default: null,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'stock',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'notice',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ticker',
            type: 'varchar',
          },
          {
            name: 'purchase_Date',
            type: 'integer',
          },
          {
            name: 'double precision',
            type: 'money',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'stock_labels_label',
        columns: [
          {
            name: 'stockId',
            type: 'string',
          },
          {
            name: 'labelId',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE ""label""');
    await queryRunner.query('DROP TABLE ""stock""');
    await queryRunner.query('DROP TABLE ""stock_labels_label""');
  }
};
