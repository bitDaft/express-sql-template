// import config from './config/index.js';

export const generateKnexConfig = (conf) => {
  return {
    client: conf.client,
    debug: conf.debug || false,
    connection: {
      host: conf.host,
      user: conf.user,
      password: conf.pass,
      database: conf.db,
      timezone: 'Z',
    },
    pool: {
      min: conf.pool_min || 2,
      max: conf.pool_max || 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations',
      stub: './database/migrations/stub',
      loadExtensions: ['.js']
    },
    seeds: {
      directory: './database/seeds',
    },
  };
};

// const keys = Object.keys(config.DB);
// const autoConf = config.DB[keys[0]];


export default async () => {
  let config = await import('./config/index.js');
  return {
    [config.NODE_ENV]: await generateKnexConfig(autoConf),
  };
}
