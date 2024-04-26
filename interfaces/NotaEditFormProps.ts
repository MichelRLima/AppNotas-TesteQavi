//Interface para passar as propriedades para o componente NoteForm
export interface NotaEditFormProps {
    showNoteForm: boolean;
    setTitulo: React.Dispatch<string>;
    titulo: string;
    setConteudo: React.Dispatch<string>;
    conteudo?: string
    formOpenOrClose: () => void;
    idNota: string
}