import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
    params: Promise<{slug: string[]}>
}

const NoteByTag = async ({params}: Props) =>{
    const slugParams = await params;

    const tag = slugParams.slug?.[0] || null;
    console.log(tag);
    

    
    let response;
    

    if(tag === 'ALl' || tag === undefined){
        response = await fetchNotes({searchText: '', pageQuery: 1});
    }
    else{
        response = await fetchNotes({searchText: '', pageQuery: 1, tagNote: tag})
    }

    return(
        <div>
            
            {response?.notes.length > 0 &&
                <NoteList notes={response.notes}/>
            }
        </div>
    )

}

export default NoteByTag;