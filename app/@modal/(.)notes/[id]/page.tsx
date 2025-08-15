import { fetchNoteById } from '@/lib/api';
import Notepreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  
  const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id)
   })
   const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Notepreview dehydratedState={dehydratedState} id={id}/>
    </HydrationBoundary>
      
  );
};

export default NotePreview;
