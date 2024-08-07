const { Table } = require('typeorm');

module.exports = class initialSchema1625847615203 {
  name = 'initialSchema1625847615203';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'label',
        columns: [
          {
            name: 'id',
            type: 'uuid', // Changed for PostgreSQL
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
            type: 'varchar', // Assuming you want to use UUIDs for user IDs as well
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
            type: 'uuid', // Changed for PostgreSQL
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
            type: 'varchar', // Assuming you want to use UUIDs for user IDs as well
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
            name: 'purchase_date',
            type: 'bigint', // Assuming this is a timestamp, bigint can be used for UNIX timestamps
          },
          {
            name: 'price',
            type: 'double precision', // No change needed, valid in PostgreSQL
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
            type: 'uuid', // Changed for consistency with other IDs
          },
          {
            name: 'labelId',
            type: 'uuid', // Changed for consistency with other IDs
          },
        ],
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE "label"');
    await queryRunner.query('DROP TABLE "stock"');
    await queryRunner.query('DROP TABLE "stock_labels_label"');
  }
};
