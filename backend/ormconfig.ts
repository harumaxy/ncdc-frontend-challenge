import { DataSource, DataSourceOptions } from 'typeorm';

// TypeORMの共通設定
const databaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'data/dev.sqlite',
  entities: ['dist/src/entities/**/*.entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  logging: true,
};

const dataSource = new DataSource(databaseConfig);

export default dataSource;
