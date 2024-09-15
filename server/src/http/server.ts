import fastify from 'fastify'
import { getPendingGoalsRoute } from './routes/getPendingGoals'
import { postGoalsRoute } from './routes/postGoals'
import { postCompletionsRoute } from './routes/postCompletions'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getWeekSummaryRoute } from './routes/getWeekSummary'
import fastifyCors from '@fastify/cors'

// fastify config with zod
const app = fastify()

app.register(fastifyCors, {
  origin: '*', // substituir por url do front.
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// routes
app.register(getPendingGoalsRoute)
app.register(postGoalsRoute)
app.register(postCompletionsRoute)
app.register(getWeekSummaryRoute)

// start server
app.listen({ port: 3333 }).then(() => {
  console.log('Running')
})
