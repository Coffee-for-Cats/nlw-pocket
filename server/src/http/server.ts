import fastify from 'fastify'

// fastify config with zod
const app = fastify()

// routes
import { router } from './routes'
app.register(router)

// start server
app.listen({ port: 3333 }).then(() => {
  console.log('Running')
})
