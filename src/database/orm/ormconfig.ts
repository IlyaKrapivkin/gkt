import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'

export const getOrmConfig = (): ConnectionOptions => {
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
      rejectUnauthorized: false
    },
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber'
    }
  }
  return ormconfig
}
