import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';
import { Markup } from 'interweave';
import { Comments, CreateComment } from '../../components';

export const Post = () => {

    const params = useParams();

    const { onGetPost } = useFreelanceContext();
    const [post, setPost] = useState({
        title: '',
        body: '',
        author: '',
        author_nick: '',
        post_at: '',
        comments: {}
    });
    const [comments, setComments] = useState([])

    useEffect(() => {
        const loadPost = async () => {
            const post = await onGetPost(params.user, params.post_id);
            setPost({
                post_id: post.post[0].post_id,
                title: post.post[0].post_title,
                info: post.post[0].post_info,
                author: post.post[0].user_name,
                author_nick: post.post[0].user_nick,
                post_at: post.post[0].post_at
            });
            const comments = setComments([post.comments])
            return {post, comments};
        }
        loadPost();
    }, []);
 

    return (
        <>
            <div className="post-container">
                <div className="post-header">
                    <div className="post-info">
                        <p>
                            <Link to={`/profile/${post.author_nick}`}>{post.author}</Link>
                        </p>
                        <p>
                            {post.post_at}
                        </p>
                    </div>
                    <p>
                        {post.title}
                    </p>
                </div>
                <div className="post-body">
                    <Markup content={post.info}/>
                </div>
            </div>

            {
                sessionStorage.getItem('token')
                ? 
                    <CreateComment post_id={post.post_id}/>
                : 
                    <>
                        <span>Para poder crear un comentario, debes </span><Link to={'/login'}>Iniciar sesión</Link>
                    </>
            }
            
            <Comments comments={comments} />
        </>
    )
}
