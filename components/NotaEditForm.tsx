// Novo componente NoteForm.js
import { api } from '@components/utils/api'; //API
import type { NotaEditFormProps } from 'interfaces/NotaEditFormProps'; //Interface para o uso do componente NotaEditForm
import React from 'react';
import { RiCloseCircleLine, RiSaveLine } from 'react-icons/ri'; //icones do react-icons
import { alertInfo } from './Alerts/alertInfo'; //imporntando componente de notificacao 
import { alertError } from './Alerts/alertError';


//Passado as propriedades necessarias para realizar o processo de inclusao de uma nova nota
function NoteEditForm({ showNoteForm, setTitulo, setConteudo, titulo, conteudo, formOpenOrClose, idNota }: NotaEditFormProps) {

    //Apresentar e ocultar componente para adicionar uma nova nota
    if (!showNoteForm) return null;

    setTitulo(titulo)
    setConteudo(conteudo ?? ''); // Se conteudo for undefined, setConteudo receberá uma string vazia ('')

    const notas = api.getNotas.get.useQuery() //Iniciadno a API para puxar os dados do banco

    const editNota = api.editNota.edit.useMutation({
        onSuccess: () => {
            notas.refetch().then(() => {
                formOpenOrClose(); //fechar o formulário de edição
                alertInfo("Nota atualizada");
            }).catch(error => {
                console.error("Erro ao refetch notas:", error);
                // Lide com o erro, se necessário
            });
        }
    });


    //funcao para editar a nota
    const edit = () => {
        if (titulo !== "" && conteudo !== "") {
            editNota.mutate({ id: idNota, titulo: titulo, conteudo: conteudo ?? '' })
        } else {
            alertError("Necessário adicionar título e descrição")
        }
    }

    //Apresentar e ocultar formulario para adicionar uma nova nota
    if (!showNoteForm) return null;

    //componente
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white w-full sm:w-64 h-auto p-4 m-2 rounded-md flex flex-col">
                <h2 className='font-serif mb-6 text-center'>Edição da Nota</h2>
                <input onChange={(e) => setTitulo(e.target.value)} value={titulo} placeholder="Título" type="text" className='border border-neutral-500 rounded-lg focus:border-blue-500 focus:outline-none p-1 text-xs text-center'></input>
                <textarea onChange={(e) => setConteudo(e.target.value)} value={conteudo} placeholder="Descrição" className='border border-neutral-500 rounded-lg focus:border-blue-500 focus:outline-none p-1 text-xs text-center mt-4 mb-4 h-32'></textarea>

                <div className='flex justify-center'>
                    <RiSaveLine data-tooltip-id="my-tooltip" data-tooltip-content="Salvar" onClick={() => edit()} className='text-gray-600  mr-2 t w-5 h-5 cursor-pointer hover:text-blue-500' />
                    <RiCloseCircleLine data-tooltip-id="my-tooltip" data-tooltip-content="Cancelar" onClick={formOpenOrClose} className='text-gray-600  ml-2  w-5 h-5 cursor-pointer hover:text-red-500'>Fechar</RiCloseCircleLine>
                </div>
            </div>
        </div>
    );
}

export default NoteEditForm;
