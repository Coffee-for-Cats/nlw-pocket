import z, { preprocess } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const env = parseEnv()

function parseEnv() {
  try {
    return envSchema.parse(process.env)
  } catch(e) {
    throw new Error("Add a DATABASE_URL to your .env")
  }
}