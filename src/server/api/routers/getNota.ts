import { createTRPCRouter, publicProcedure } from "../trpc";

//realizar o GET de todas as notas no banco com o prisma
export const getNota = createTRPCRouter({
    get: publicProcedure.query(async ({ ctx }) => {
        try {
            const notas = await ctx.db.nota.findMany()
            return notas;

        } catch (error) {
            // Tratamento do erro
            throw new Error('Erro ao buscar notas');
        }
    }),


});
