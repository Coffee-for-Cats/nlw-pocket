import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'

const completionSchema = {
  body: z.object({
    goalId: z.string(),
  }),
}

export const postCompletionsRoute: FastifyPluginAsyncZod = async app => {
  app.post('/completions', { schema: completionSchema }, async request => {
    const { goalId } = request.body

    await createGoalCompletion({
      goalId,
    })
  })
}
