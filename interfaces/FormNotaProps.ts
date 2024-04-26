//Interface para passar as propriedades para o componente NoteForm
export interface NoteFormProps {
    showNoteForm: boolean;
    setTitulo: React.Dispatch<string>;
    setDescricao: React.Dispatch<string>;
    addNota: () => void;
    formOpenOrClose: () => void;
}