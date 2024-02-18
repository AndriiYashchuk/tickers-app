const dbConfig = {
  synchronize: false,
  migrationsRun: true,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  }
};

const devConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
};

const prodConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: true,
  entities: ['**/*.entity.js'],
  ssl: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      ...devConfig,
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      ...devConfig,
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, prodConfig);
    break;
  default:
    throw new Error('No environment specified');
}

export default dbConfig;
