'use client'
import css from './App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import Modal from '@/components/Modal/Modal'
import SearchBox from '@/components/SearchBox/SearchBox'
import  React, { useEffect, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import Pagination from '@/components/Pagination/Pagination'
import NoteForm from '@/components/NoteForm/NoteForm'
import { Note } from '@/types/note'
import { error } from 'console'


interface NotesClientProps {
    initialData: {
        totalPages: number
        notes: Note[]
    }
    initialTag: string | null
    
}
export default function NotesClient({initialData, initialTag}: NotesClientProps){
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentTag, setCurrentTag] = useState<string | null>(initialTag);
    const [debouncedSearch] = useDebounce(
        searchQuery,
        1000,
    )

        
    

     useEffect(() =>{
        setCurrentTag(initialTag)
     }, [initialTag])

     
    
        
    const {data, error} = useQuery({
        queryKey: ['notes', debouncedSearch, currentPage, currentTag],
        queryFn: () => fetchNotes({
            ...(debouncedSearch.trim() ? {searchText: debouncedSearch}: {}),
            pageQuery: currentPage,
            tagNote: currentTag
        }),
        placeholderData: keepPreviousData, initialData
    })


    
    
    

    

   
    

    const totalPages = data?.totalPages ?? 0;
    console.log(totalPages);

    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery}  onChange={(value) =>{
                    setSearchQuery(value);
                    setCurrentPage(1)
                }}/>
                <button type='button' onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>

                
            </header>
            {data?.notes && data?.notes.length > 0 
                ? <NoteList notes={data?.notes}/>
                : <p>{error?.message}</p>
            }
            {totalPages !== undefined && totalPages > 1 &&
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageSelect={setCurrentPage}/>

            }
            
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NoteForm onClose={handleCloseModal}/>

                </Modal>
            )}
            
            
        </div>

    )
}