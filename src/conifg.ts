import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      port: process.env.PORT,
    },
    mysql: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      name: process.env.DB_NAME,
      password: process.env.BD_PASSWORD,
      user: process.env.DB_USER,
    },
  };
});
