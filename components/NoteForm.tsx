// Novo componente NoteForm.js
import { NoteFormProps } from 'interfaces/FormNotaProps'; //interface para componente NoteForm
import React from 'react';
import { RiCloseCircleLine, RiSaveLine } from 'react-icons/ri'; //icone do readct-icons


//Passado as propriedades necessarias para realizar o processo de inclusao de uma nova nota
function NoteForm({ showNoteForm, setTitulo, setDescricao, addNota, formOpenOrClose }: NoteFormProps) {

    //Apresentar e ocultar formulario para adicionar uma nova nota
    if (!showNoteForm) return null;

    //componente
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white w-full sm:w-64 h-auto p-4 m-2 rounded-md flex flex-col">
                <h2 className='font-serif mb-6 text-center'>Nova Nota</h2>
                <input onChange={(e) => setTitulo(e.target.value)} placeholder="Título" type="text" className='border border-neutral-500 rounded-lg focus:border-blue-500 focus:outline-none p-1 text-xs text-center'></input>
                <textarea onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" className='border border-neutral-500 rounded-lg focus:border-blue-500 focus:outline-none p-1 text-xs text-center mt-4 mb-4 h-32'></textarea>

                <div className='flex justify-center'>
                    <RiSaveLine data-tooltip-id="my-tooltip" data-tooltip-content="Salvar" onClick={() => addNota()} className='text-gray-600  mr-2 t w-5 h-5 cursor-pointer hover:text-blue-500' />
                    <RiCloseCircleLine data-tooltip-id="my-tooltip" data-tooltip-content="Cancelar" onClick={formOpenOrClose} className='text-gray-600  ml-2  w-5 h-5 cursor-pointer hover:text-red-500'>Fechar</RiCloseCircleLine>
                </div>
            </div>
        </div>
    );
}

export default NoteForm;
