import Nota from "components/Nota"; //importando o componente Nota
import { RiAddFill } from "react-icons/ri"; //icones usado através do react-icons
import { useEffect, useState } from "react";
import { api } from "../utils/api"; //importando a api
import type { NotaProps } from "interfaces/NotaProps"; //importando interdace do componente Nota
import NoteForm from "components/NoteForm"; //Importando componente NooteForma
import { ToastContainer } from "react-toastify"; //Para o uso da lib React-Toastify (notificações)
import 'react-toastify/dist/ReactToastify.css'; //imporntando estilo do react-toastify
import { alertSucess } from "components/Alerts/alertSucess"; //importando compoenente de alerta
import { Tooltip } from 'react-tooltip' //imporntado lib para Tooltip
import { alertError } from "components/Alerts/alertError";


export default function Home() {


  const [showNoteForm, setShowNoteForm] = useState(false); //statuss para entrar ou sair do fomulario para uma nova nota
  const [allNotas, setAllNotas] = useState<NotaProps[] | undefined>([]) //status para guardar em um array todas as notas do banco
  const [titulo, setTitulo] = useState("") //status para guardar o titulo de uma nova nota
  const [descricao, setDescricao] = useState("") //status para guardar a descricao de uma nova nota

  //funcao para puxar todos as notas do banco
  const notas = api.getNotas.get.useQuery()

  //sempre que ocorre uma atualização em notas.data, ocorre uma atualização no allNotas
  useEffect(() => {
    if (notas.data) {
      setAllNotas(notas.data);
    }
  }, [notas.data]);

  //funcao para realizar o metodo POST para uma nova nota e tratar em caso de sucesso ou erro
  const postNota = api.salvarNota.salvar.useMutation({
    onSuccess: () => {
      setTitulo("") //limpar o status
      setDescricao("") //limpar o status

      const notasRefrash = notas.refetch() //atualizar notas
      alertSucess("Nova nota adicionada")
      notasRefrash.then(data => {
        setShowNoteForm(false);
        console.log(data)

      }).catch(error => {
        console.error("Erro ao buscar notas:", error);
        alertError("Algo deu errado")

      })
    },
    onError: () => {
      alertError("Erro ao buscar notas")
    }
  })

  //funcao para pegar os dados inseridos nos status titulo e descricao e realizar o metodo POST para uma nova nota
  const addNota = () => {
    if (titulo !== "" && descricao !== "") {
      postNota.mutate({ titulo: titulo, descricao: descricao })

    } else {
      alertError("Necessário adicionar título e descrição")
    }

  }

  //funcao para entrar ou sair do formulario para inserir uma nova nota
  const formOpenOrClose = () => {
    setShowNoteForm(!showNoteForm);
  }

  //paigina principal ./
  return (

    <>
      <ToastContainer />{/* componente para o uso da lib React-Toastify*/}
      <h2 className='text-center text-4xl  m-4 font-serif'>Notas</h2>


      <div className='flex justify-end w-full max-w-7xl ml-auto mr-auto'>
        <RiAddFill data-tooltip-id="my-tooltip" data-tooltip-content="Adicionar nota" className='w-10 h-10 cursor-pointer mr-12 hover:text-lime-500' onClick={formOpenOrClose} />
      </div>

      <div className='flex flex-wrap justify-center w-full max-w-7xl ml-auto mr-auto mb-5'>

        {allNotas && allNotas.length > 0 ? (
          allNotas.map((nota: NotaProps) => (
            <Nota key={nota.id} id={nota.id} titulo={nota.titulo} conteudo={nota.conteudo} />
          ))
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <p className='font-serif text-center text-zinc-400'>Nenhuma nota encontrada.</p>
            <p className='font-serif text-center text-zinc-400'>Para adicionar uma nota, clique no botão à direita.</p>

          </div>
        )}
      </div>


      <NoteForm
        showNoteForm={showNoteForm}
        setTitulo={setTitulo}
        setDescricao={setDescricao}
        addNota={addNota}
        formOpenOrClose={formOpenOrClose}
      />

      <Tooltip id="my-tooltip" /> {/* componente para a lib de Tooltip  */}


    </>







  );
}
