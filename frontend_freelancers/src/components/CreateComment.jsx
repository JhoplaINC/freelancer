import { useEffect, useState } from 'react';
import { useFreelanceContext } from '../context/FreelanceContext';

export const CreateComment = ({post_id}) => {

    const { onGetUserData, onNewComment } = useFreelanceContext();
    
    const [postData, setPostData] = useState({user_id: 0});

    useEffect(() => {
        const getUser = async () => {
            const userData = await onGetUserData();
            setPostData({user_id: userData.user_id});
            return userData;
        }
        
        getUser();
    }, []);
    
    const addComment = () => {
        onNewComment(postData.user_id, post_id, comment.value);
        comment.value = '';
    }

    return (
        <div>
            <textarea name="comment" id="comment" placeholder="Ingresa tu comentario"></textarea>
            
            <button onClick={() => addComment()}>Publicar comentario</button>
        </div>
    )
}
