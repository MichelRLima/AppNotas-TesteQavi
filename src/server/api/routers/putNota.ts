import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const Params = z.object({
    id: z.string(),
    titulo: z.string(),
    conteudo: z.string(),
});

//Realizar edicao de uma nota com o prisma
export const putNota = createTRPCRouter({
    edit: publicProcedure
        .input(Params)
        .mutation(async ({ ctx, input }) => {
            try {
                // Salvar a nota no banco de dados usando o Prisma
                const notaEdit = await ctx.db.nota.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        titulo: input.titulo,
                        conteudo: input.conteudo
                    },
                });

                // Retorna uma mensagem de confirmação
                return `Nota editada: ${notaEdit.titulo}`;
            } catch (error) {
                // Tratamento do erro// Tratamento do erro
                throw new Error('Erro ao editar nota');
            }
        }),


});
