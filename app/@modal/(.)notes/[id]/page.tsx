import { fetchNoteById } from '@/lib/api';
import Notepreview from '@/app/@modal/(.)notes/[id]/NotePreview';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Notepreview id={id}/>
      
  );
};

export default NotePreview;
