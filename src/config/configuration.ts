const configuration = {
  database: {
    mysql: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
  rabbitmq: {
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT),
    queue: process.env.RABBITMQ_MODERN_API_QUEUE_NAME,
  },
};

export { configuration };
