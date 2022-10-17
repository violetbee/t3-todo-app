import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const todosRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.todos.findMany();
    return {
      todos: data,
    };
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.todos.create({
        data: {
          name: input.name,
        },
      });
    }),
});
