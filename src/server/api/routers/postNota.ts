import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const Params = z.object({
    titulo: z.string(),
    descricao: z.string(),
});

//Realizar POST de uma nova usando o prisma
export const postNota = createTRPCRouter({
    salvar: publicProcedure
        .input(Params)
        .mutation(async ({ ctx, input }) => {
            try {
                // Salvar a nota no banco de dados usando o Prisma
                const notaSalva = await ctx.db.nota.create({
                    data: {
                        titulo: input.titulo,
                        conteudo: input.descricao
                    },
                });

                // Retorna uma mensagem de confirmação
                return `Nota salva com sucesso: ${notaSalva.titulo}`;
            } catch (error) {
                // Tratamento do erro// Tratamento do erro
                throw new Error('Erro ao salvar nota');
            }
        }),


});
