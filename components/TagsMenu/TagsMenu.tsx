

import { Tags } from '@/types/note';
import css from './TagsMenu.module.css'
import { getNoteTag } from '@/lib/api';

const TagsMenu = async () =>{
    const tags = await getNoteTag();
    

    
    
    return(
            <div className={css.menuContainer}>
                <button  className={css.menuButton}>
                    Notes ▾
                </button>
                
                <ul className={css.menuList}>
                    {tags.notes.map((tag: Tags) =>(
                        <li key={tag.id} className={css.menuItem}>
                            <a href={`/notes/filter/all/${tag.id}`} className={css.menuLink}>
                                {tag.tag}
                            </a>
                        </li>
                    ))}
                    
                </ul>
            </div>

    )
}


export default TagsMenu;