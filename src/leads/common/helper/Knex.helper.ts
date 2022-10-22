import Knex, { Knex as KnexType } from 'knex';

import { configuration } from '../../../config/configuration';

export class KnexHelper {
  private static knexInstance: KnexType;

  static getInstance() {
    if (!KnexHelper.knexInstance) {
      KnexHelper.knexInstance = Knex({
        client: 'mysql',
        connection: {
          host: configuration.database.mysql.host,
          port: configuration.database.mysql.port,
          user: configuration.database.mysql.user,
          password: configuration.database.mysql.password,
          database: configuration.database.mysql.database,
        },
        pool: { min: 10, max: 100 },
      });
    }

    return KnexHelper.knexInstance;
  }
}
