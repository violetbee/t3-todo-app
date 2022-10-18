import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const todosRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.todos.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
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
  setTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const update = ctx.prisma.todos.update({
        where: {
          id: input.id,
        },
        data: {
          checked: input.checked,
        },
      });
      console.log(update);
    }),
});
