import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'

export default function getOrmConfig(): ConnectionOptions {
  dotenv.config()
  const ormconfig: ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.DBH_HOST,
    database: process.env.DBH_DB,
    port: +process.env.DBH_PORT,
    username: process.env.DBH_USERNAME,
    password: process.env.DBH_PASSWORD,
    synchronize: false,
    logging: false,
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
  return ormconfig
}
