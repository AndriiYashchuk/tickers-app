const dbConfig = {
  synchronize: false,
};

const devConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  migrationsRun: true,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  }
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
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  default:
    throw new Error('No environment specified');
}

export default dbConfig;
