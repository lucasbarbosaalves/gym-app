// Injeção do dotenv na aplicação
import 'dotenv/config';
import z from 'zod';

const HTTP_PORT = 3333;

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(HTTP_PORT),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env); // Validação do parse

if (_env.success === false) {
  console.error('❌ Invalid environment variables', z.treeifyError(_env.error));

  throw new Error('Invalid enviroment variables.');
}

export const env = _env.data;
