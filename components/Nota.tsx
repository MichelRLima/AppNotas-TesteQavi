
import { api } from "@components/utils/api"; //api
import { DeleteRequest } from "interfaces/DeleteRequest"; //interface para delete da nota
import { NotaProps } from "interfaces/NotaProps"; //interface para o uso do componente Nota
import { RiDeleteBin3Line, RiEditBoxLine } from "react-icons/ri"; //icones do react-icon
import { useState } from "react";
import NoteEditForm from "./NotaEditForm"; //compoente NotaEditForm
import Swal from "sweetalert2"; //importando a lib SweetAlert2 (notificação de confirmação)
import 'react-toastify/dist/ReactToastify.css'; //importando estilo da lib React-Toastify
import { alertInfo } from "./Alerts/alertInfo"; //importando componente de notificacao
import { alertError } from "./Alerts/alertError";//importando componente de notificacao



export default function Nota(props: NotaProps) {

    const [showNoteForm, setShowNoteForm] = useState(false); //status para aparecer ou retirar o formulario para uma nova nota
    const [titulo, setTitulo] = useState(props.titulo) //status para receber os dados do titulo para uma nova nota
    const [conteudo, setConteudo] = useState(props.conteudo) //status para receber os dados do conteudo para uma nova nota

    //Funcao para atualizar as notas
    const notas = api.getNotas.get.useQuery()

    //Função para deletar a nota selecionada
    const DeleteNota = api.deleteNota.delete.useMutation({
        onSuccess: () => {
            //lib react-toastify mostrando notificação de nota atualizada
            alertInfo(" Notas atualizadas")
            notas.refetch()

        },
        onError: () => {
            alertError("Ops, algo deu errado.")
        }
    })

    //ID da nota
    const notaID: DeleteRequest = { id: props.id }

    //Funcao para deletar a nota
    const deleted = () => {

        //usando a lib sweetalert2 para confirmacao da exclusao da nota
        Swal.fire({
            title: "Deseja deletar essa nota?",
            text: `Título da nota: ${props.titulo}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteNota.mutate(notaID)
                Swal.fire({
                    title: "Deletado!",
                    text: "Sua nota foi deletada",
                    icon: "success"
                });
            }
        });

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
            < h1 className=' font-serif text-lg' >{props.titulo} </h1>
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