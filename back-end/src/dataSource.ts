import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Post } from './entities/postEntity'
import { Comment } from './entities/commentEntity'
import { User } from './entities/userEntity'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Post, Comment, User],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: []
})
