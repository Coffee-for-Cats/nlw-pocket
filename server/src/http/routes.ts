import type { FastifyInstance } from 'fastify'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from 'zod'
import { createGoal } from '../functions/create-goal'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../functions/create-goal-completion'

// zod schemas for validation
const goalsSchema = {
  body: z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  }),
}
const completionSchema = {
  body: z.object({
    goalId: z.string(),
  }),
}

// executes at build, no performance impact
export function router(fi: FastifyInstance, _: () => void, done: () => void) {
  // fastify config with zod
  const app = fi.withTypeProvider<ZodTypeProvider>()
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  // get goals to-do this week
  app.get('/pending-goals', async () => {
    const pendingGoals = await getWeekPendingGoals()
    return { pendingGoals }
  })

  // create new goal
  app.post('/goals', { schema: goalsSchema }, async request => {
    const body = request.body
    await createGoal({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    })
  })

  // mark a goal as done today
  app.post('/completions', { schema: completionSchema }, async request => {
    const { goalId } = request.body

    await createGoalCompletion({
      goalId,
    })
  })

  done()
}
