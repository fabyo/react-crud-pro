//import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

//console.log('--- DEBUGANDO CREDENCIAIS DO BANCO ---')
//console.log('DB_USER == ', env.get('DB_USER'))


const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

//console.log('DB_PASSWORD lido do .env:', env.get('DB_PASSWORD'))
//console.log('------------------------------------')
// FIM DO DEBUG

export default dbConfig
