import { fetchNoteById } from '@/lib/api';
import Notepreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  
  const queryClient = new QueryClient();

   queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNoteById(id)
   })
   const dehydratedState = dehydrate(queryClient);

  return (
    <Notepreview id={id} dehydratedBoundary={dehydratedState}/>
      
  );
};

export default NotePreview;
