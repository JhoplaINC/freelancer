import { useEffect } from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';

export const NewPost = () => {

    const navigate = useNavigate();

    const { onGetUserData, onNewPost } = useFreelanceContext();

    const [convertedText, setConvertedText] = useState("Ingresa la información necesaria para el post...");
    const [userId, setUserId] = useState({user_id: 0});

    const onCreatePost = async (user_id, postTitle, postInfo) => {
        await onNewPost(user_id, postTitle, postInfo);
        navigate('../posts');
    }

    useEffect(() => {
        const getUser = async () => {
            const userData = await onGetUserData();
            setUserId({user_id: userData.user_id});
            return userData;
        }

        getUser();
    }, []);
    

    return (
        <div>
            <input type="text" id="post_title" placeholder='Ingresa el título de la publicación' required/>
            <ReactQuill
                theme='snow'
                value={convertedText}
                onChange={setConvertedText}
                style={{minHeight: '300px'}}
            />

            <button onClick={() => onCreatePost(userId.user_id, post_title.value, convertedText)}>Crear publicación</button>
        </div>
    )
}
