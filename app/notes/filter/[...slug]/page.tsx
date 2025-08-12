import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
    params: Promise<{slug: string[]}>
}

const NoteByTag = async ({params}: Props) =>{
    const {slug} = await params;

    const tag = slug[0] === 'ALL' ? '' : slug[0];
    console.log(tag);
    

    
    let response;
    

    if(tag === ''){
        response = await fetchNotes({searchText: '', pageQuery: 1});
    }
    else{
        response = await fetchNotes({searchText: '', pageQuery: 1, tagNote: tag})
    }

    return(
        <div>
            
            {response?.notes.length > 0 &&
                <NotesClient initialData={response} initialTag={tag}/>
            }
        </div>
    )

}

export default NoteByTag;