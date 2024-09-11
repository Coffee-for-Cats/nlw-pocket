import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const schema = {
  body: z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  }),
}

app.post('/goals', { schema }, async request => {
  const body = request.body
  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
})

app.listen({ port: 3333 }).then(() => {
  console.log('Running')
})
