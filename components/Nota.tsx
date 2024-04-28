
import { api } from "@components/utils/api"; //api
import type { DeleteRequest } from "interfaces/DeleteRequest"; //interface para delete da nota
import type { NotaProps } from "interfaces/NotaProps"; //interface para o uso do componente Nota
import { RiDeleteBin3Line, RiEditBoxLine } from "react-icons/ri"; //icones do react-icon
import { useState } from "react";
import NoteEditForm from "./NotaEditForm"; //compoente NotaEditForm
import 'react-toastify/dist/ReactToastify.css'; //importando estilo da lib React-Toastify
import { alertInfo } from "./Alerts/alertInfo"; //importando componente de notificacao
import { alertError } from "./Alerts/alertError";//importando componente de notificacao



export default function Nota(props: NotaProps) {

    const [showNoteForm, setShowNoteForm] = useState(false); //status para aparecer ou retirar o formulario para uma nova nota
    const [titulo, setTitulo] = useState(props.titulo) //status para receber os dados do titulo para uma nova nota
    const [conteudo, setConteudo] = useState(props.conteudo) //status para receber os dados do conteudo para uma nova nota

    //ID da nota
    const notaID: DeleteRequest = { id: props.id }

    //Funcao para atualizar as notas
    const notas = api.getNotas.get.useQuery()

    //Função para deletar a nota selecionada
    const DeleteNota = api.deleteNota.delete.useMutation({

        onSuccess: async () => {
            try {
                //lib react-toastify mostrando notificação de nota atualizada
                const refreshNota = await notas.refetch(); // Espera a Promise ser resolvida
                alertInfo("Nota apagada");
                console.log(refreshNota)
            } catch (error) {
                // Trate o erro, se necessário
                console.error("Erro ao atualizar notas:", error);
            }
        },
        onError: (error) => {
            alertError("Ops, algo deu errado.");
            console.error("Erro ao deletar nota:", error);
        }
    });

    //Funcao para deletar a nota
    const deleted = () => {

        DeleteNota.mutate(notaID);

    }


    //Funcao para aparecer ou retirar o formulario para adicionar uma nova nota
    const formOpenOrClose = () => {
        setTitulo(props.titulo)
        setConteudo(props.conteudo)
        setShowNoteForm(!showNoteForm);

    }


    //Componente
    return (
        <div className=' w-full sm:w-80 h-auto p-4 m-2 rounded-md bg-amber-50 flex flex-col justify-between' >
            <div className='flex justify-end w-full mb-4' >
                <RiEditBoxLine data-tooltip-id="my-tooltip" data-tooltip-content="Editar" onClick={formOpenOrClose} className='text-gray-600  mr-2 t w-4 h-4 cursor-pointer hover:text-blue-500' />
                <RiDeleteBin3Line data-tooltip-id="my-tooltip" data-tooltip-content="Deletar" onClick={() => deleted()} className=' text-gray-600  ml-2  w-4 h-4 cursor-pointer hover:text-red-500' />
            </div>
            < h1 className=' font-serif text-lg border-b border-blackborder-b border-black' >{props.titulo}</h1>
            <p className='text-justify font-serif text-sm mt-2 mb-5' > {props.conteudo}</p>
            <p className='text-orange-800 text-xs mt-auto'>ID: {props.id}</p>

            <NoteEditForm
                showNoteForm={showNoteForm}
                setTitulo={setTitulo}
                setConteudo={setConteudo}
                titulo={titulo}
                conteudo={conteudo}
                formOpenOrClose={formOpenOrClose}
                idNota={props.id}
            />

        </div>


    )
}