import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

// Oque eu deveria fazer:
// export const env = envSchema.parse(process.env)

// Tive um problema com .env no arch '-'
// Oque o arch me forçou a fazer:
export const env = envSchema.parse({
  DATABASE_URL: 'postgresql://docker:docker@localhost:5432/inorbit',
})
