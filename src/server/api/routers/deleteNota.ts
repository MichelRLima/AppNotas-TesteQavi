import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


const Params = z.object({
    id: z.string(),

});

//Realizar delete da nota com prisma
export const deleteNota = createTRPCRouter({
    delete: publicProcedure
        .input(Params)
        .mutation(async ({ ctx, input }) => {
            try {
                // Salvar a nota no banco de dados usando o Prisma
                const deletedNota = await ctx.db.nota.delete({
                    where: {
                        id: input.id,
                    },
                });

                // Retorna uma mensagem de confirmação
                return `${deletedNota.titulo}`;
            } catch (error) {
                // Tratamento do erro
                throw new Error('Erro ao deletar nota');
            }
        }),

});
